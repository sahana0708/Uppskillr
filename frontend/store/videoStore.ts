import { create } from 'zustand';
import { Video, VideoProgress } from '@/types';

interface VideoState {
  currentVideo: Video | null;
  progress: Map<string, VideoProgress>;
  setCurrentVideo: (video: Video) => void;
  updateProgress: (videoId: string, progress: Partial<VideoProgress>) => void;
  markComplete: (videoId: string) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  currentVideo: null,
  progress: new Map(),

  setCurrentVideo: (video: Video) => {
    set({ currentVideo: video });
  },

  updateProgress: (videoId: string, progressData: Partial<VideoProgress>) => {
    set((state) => {
      const newProgress = new Map(state.progress);
      const existing = newProgress.get(videoId) || {
        id: '',
        userId: '',
        videoId,
        lastPositionSec: 0,
        isCompleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      newProgress.set(videoId, { ...existing, ...progressData });
      return { progress: newProgress };
    });
  },

  markComplete: (videoId: string) => {
    set((state) => {
      const newProgress = new Map(state.progress);
      const existing = newProgress.get(videoId) || {
        id: '',
        userId: '',
        videoId,
        lastPositionSec: 0,
        isCompleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      newProgress.set(videoId, {
        ...existing,
        isCompleted: true,
        completedAt: new Date().toISOString(),
      });

      return { progress: newProgress };
    });
  },
}));
