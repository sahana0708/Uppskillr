import { prisma } from '../../config/db';


interface ProgressInput {
  userId: string;
  videoId: string;
  lastPositionSec: number;
  isCompleted?: boolean;
}

export const progressService = {
  async getVideoProgress(userId: string, videoId: string) {
    const progress = await prisma.videoProgress.findUnique({
      where: {
        userId_videoId: {
          userId,
          videoId,
        },
      },
    });

    return progress || null;
  },

  async updateVideoProgress({
    userId,
    videoId,
    lastPositionSec,
    isCompleted = false,
  }: ProgressInput) {
    // Get video to check duration
    const video = await prisma.video.findUnique({
      where: { id: videoId },
    });

    if (!video) {
      const err = new Error( 'Video not found');
    }

    // If marking as completed, verify the position is reasonable
    if (isCompleted && video.durationSeconds) {
      // Allow completion if watched at least 90% of the video
      const minRequiredPosition = Math.floor(
        video.durationSeconds * 0.9
      );
      if (lastPositionSec < minRequiredPosition) {
        isCompleted = false;
      }
    }

    // Update or create progress
    const progress = await prisma.videoProgress.upsert({
      where: {
        userId_videoId: {
          userId,
          videoId,
        },
      },
      update: {
        lastPositionSec,
        isCompleted,
        completedAt: isCompleted ? new Date() : undefined,
      },
      create: {
        userId,
        videoId,
        lastPositionSec,
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
      },
    });

    // If video is completed, unlock next video automatically
    if (isCompleted) {
      await this.unlockNextVideo(video);
    }

    return progress;
  },

  async unlockNextVideo(currentVideo: any) {
    // Find next video in the same section
    const nextVideo = await prisma.video.findFirst({
      where: {
        sectionId: currentVideo.sectionId,
        orderIndex: currentVideo.orderIndex + 1,
      },
    });

    // Note: The unlock happens automatically via the lock status calculation
    // No explicit action needed here as locks are calculated dynamically
  },

  async getUserProgressSummary(userId: string) {
    const completedVideos = await prisma.videoProgress.count({
      where: {
        userId,
        isCompleted: true,
      },
    });

    const totalWatchTime = await prisma.videoProgress.aggregate({
      where: { userId },
      _sum: {
        lastPositionSec: true,
      },
    });

    return {
      completedVideos,
      totalWatchTimeSeconds: totalWatchTime._sum.lastPositionSec || 0,
    };
  },
};

