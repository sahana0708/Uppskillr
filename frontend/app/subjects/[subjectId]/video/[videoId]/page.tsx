'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import YouTube from 'react-youtube';
import { useAuthStore } from '@/store/authStore';
import { useVideoStore } from '@/store/videoStore';
import { apiClient } from '@/lib/apiClient';
import { Video, Subject } from '@/types';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Lock, ChevronLeft, ChevronRight } from 'lucide-react';

export default function VideoPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { setCurrentVideo, updateProgress } = useVideoStore();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState<any>(null);
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchVideo();
    }
  }, [isAuthenticated, params.videoId]);

  useEffect(() => {
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [progressInterval]);

  const fetchVideo = async () => {
    try {
      const response = await apiClient.get(`/videos/${params.videoId}`);
      const videoData = response.data;
      setVideo(videoData);
      setCurrentVideo(videoData);
      
      if (videoData.progress?.lastPositionSec) {
        updateProgress(videoData.id, { lastPositionSec: videoData.progress.lastPositionSec });
      }
    } catch (error) {
      console.error('Failed to fetch video:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (position: number, completed = false) => {
    if (!video) return;
    
    try {
      await apiClient.post(`/progress/videos/${video.id}`, {
        last_position_seconds: position,
        is_completed: completed,
      });
      updateProgress(video.id, { lastPositionSec: position, isCompleted: completed });
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const handleReady = (event: any) => {
    setPlayer(event.target);
    
    // Seek to last position if exists
    if (video?.progress?.lastPositionSec) {
      event.target.seekTo(video.progress.lastPositionSec);
    }

    // Save progress every 10 seconds
    const interval = setInterval(() => {
      const currentTime = event.target.getCurrentTime();
      saveProgress(Math.floor(currentTime));
    }, 10000);
    
    setProgressInterval(interval);
  };

  const handleStateChange = async (event: any) => {
    // Video ended
    if (event.data === 0) {
      await saveProgress(video!.durationSeconds || 0, true);
      
      // Auto-play next video
      const nextResponse = await apiClient.get(`/videos/${video!.id}`);
      // Navigate to next video logic would go here
    }
  };

  const navigateToPrevious = async () => {
    const response = await apiClient.get(`/videos/${video!.id}`);
    // Previous video navigation logic
  };

  const navigateToNext = async () => {
    const response = await apiClient.get(`/videos/${video!.id}`);
    // Next video navigation logic
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!video || video.locked) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Video Locked</h1>
        <p className="text-gray-600">Please complete the previous video first.</p>
        <Button
          variant="primary"
          className="mt-6"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </div>
    );
  }

  const youtubeId = video.youtubeUrl.split('v=')[1]?.split('&')[0] || '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Video Section */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-lg overflow-hidden">
            <YouTube
              videoId={youtubeId}
              opts={{
                width: '100%',
                height: '500',
                playerVars: { autoplay: 0 },
              }}
              onReady={handleReady}
              onStateChange={handleStateChange}
            />
          </div>

          <div className="mt-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{video.title}</h1>
            {video.description && (
              <p className="text-gray-600 mb-4">{video.description}</p>
            )}
            
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Course</span>
              </Button>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Duration:</span>
                <span className="font-medium">
                  {video.durationSeconds ? `${Math.floor(video.durationSeconds / 60)}:${(video.durationSeconds % 60).toString().padStart(2, '0')}` : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Course Content */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Course Content</h2>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {/* This would show the current section's videos */}
              <div className="text-sm text-gray-600">
                Video navigation would appear here
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
