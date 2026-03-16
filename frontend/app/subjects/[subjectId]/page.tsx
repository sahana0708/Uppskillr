'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { apiClient } from '@/lib/apiClient';
import { Subject, Section } from '@/types';
import { Spinner } from '@/components/ui/Spinner';
import { Lock, CheckCircle, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function SubjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [subject, setSubject] = React.useState<Subject & { sections: (Section & { videos: any[] })[] } | null>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
    };
    verifyAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubjectTree();
    }
  }, [isAuthenticated, params.subjectId]);

  const fetchSubjectTree = async () => {
    try {
      const response = await apiClient.get(`/subjects/${params.subjectId}/tree`);
      setSubject(response.data);
    } catch (error) {
      console.error('Failed to fetch subject:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Subject not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{subject.title}</h1>
        {subject.description && (
          <p className="text-lg text-gray-600">{subject.description}</p>
        )}
      </div>

      <div className="space-y-6">
        {subject.sections.map((section) => (
          <div key={section.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {section.title}
            </h2>
            <div className="space-y-3">
              {section.videos.map((video, index) => (
                <div
                  key={video.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    video.locked
                      ? 'bg-gray-50 border-gray-200'
                      : 'bg-white border-gray-300 hover:border-primary-500 cursor-pointer transition-colors'
                  }`}
                  onClick={() => !video.locked && router.push(`/subjects/${subject.id}/video/${video.id}`)}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="flex-shrink-0">
                      {video.completed ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : video.locked ? (
                        <Lock className="h-6 w-6 text-gray-400" />
                      ) : (
                        <PlayCircle className="h-6 w-6 text-primary-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${video.locked ? 'text-gray-500' : 'text-gray-900'}`}>
                        {index + 1}. {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {video.durationSeconds && (
                    <span className="text-sm text-gray-500">
                      {Math.floor(video.durationSeconds / 60)}:{(video.durationSeconds % 60).toString().padStart(2, '0')}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
