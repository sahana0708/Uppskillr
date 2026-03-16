import { prisma } from '../../config/db';

export const videosService = {
  async getVideoById(videoId: string, userId: string) {
    const video = await prisma.video.findUnique({
      where: { id: videoId },
      include: {
        section: {
          include: {
            subject: true,
          },
        },
      },
    });

    if (!video) {
      const error = new Error('Video not found');
      (error as any).statusCode = 404;
      throw error;
    }

    // Get all videos in the same section to determine lock status
    const sectionVideos = await prisma.video.findMany({
      where: { sectionId: video.sectionId },
      orderBy: { orderIndex: 'asc' },
    });

    // Find current video index
    const currentIndex = sectionVideos.findIndex((v) => v.id === videoId);

    // Check if video is locked
    let isLocked = false;
    if (currentIndex > 0) {
      const previousVideoId = sectionVideos[currentIndex - 1].id;
      const previousProgress = await prisma.videoProgress.findUnique({
        where: {
          userId_videoId: {
            userId,
            videoId: previousVideoId,
          },
        },
      });

      isLocked = !previousProgress?.isCompleted;
    }

    // Get user's progress for this video
    const progress = await prisma.videoProgress.findUnique({
      where: {
        userId_videoId: {
          userId,
          videoId,
        },
      },
    });

    return {
      ...video,
      locked: isLocked,
      progress: progress || null,
    };
  },

  async getPreviousVideo(videoId: string) {
    const video = await prisma.video.findUnique({
      where: { id: videoId },
    });

    if (!video) return null;

    const previousVideo = await prisma.video.findFirst({
      where: {
        sectionId: video.sectionId,
        orderIndex: video.orderIndex - 1,
      },
    });

    return previousVideo;
  },

  async getNextVideo(videoId: string) {
    const video = await prisma.video.findUnique({
      where: { id: videoId },
    });

    if (!video) return null;

    const nextVideo = await prisma.video.findFirst({
      where: {
        sectionId: video.sectionId,
        orderIndex: video.orderIndex + 1,
      },
    });

    return nextVideo;
  },
};
