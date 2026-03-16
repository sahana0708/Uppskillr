import { prisma } from '../../config/db';

export const subjectsService = {
  async getAllSubjects() {
    return prisma.subject.findMany({
      where: { isPublished: true },
      include: {
        _count: {
          select: {
            sections: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  async getSubjectById(id: string) {
    const subject = await prisma.subject.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            sections: true,
          },
        },
      },
    });

    if (!subject) {
      const error = new Error('Subject not found');
      (error as any).statusCode = 404;
      throw error;
    }

    return subject;
  },

  async getSubjectTree(subjectId: string, userId: string) {
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
      include: {
        sections: {
          include: {
            videos: {
              orderBy: { orderIndex: 'asc' },
            },
          },
          orderBy: { orderIndex: 'asc' },
        },
      },
    });

    if (!subject) {
      const error = new Error('Subject not found');
      (error as any).statusCode = 404;
      throw error;
    }

    // Get user's completed videos for this subject
    const userProgress = await prisma.videoProgress.findMany({
      where: {
        userId,
        video: {
          section: {
            subjectId,
          },
        },
      },
      select: {
        videoId: true,
        isCompleted: true,
      },
    });

    const completedVideoIds = new Set(
      userProgress.filter((p) => p.isCompleted).map((p) => p.videoId)
    );

    // Process sections to add lock status
    const sectionsWithLockStatus = subject.sections.map((section) => {
      const videos = section.videos.map((video, index) => {
        const isFirstVideo = index === 0;
        const previousVideoId =
          index > 0 ? section.videos[index - 1].id : null;
        const isLocked =
          !isFirstVideo &&
          previousVideoId &&
          !completedVideoIds.has(previousVideoId);

        return {
          ...video,
          locked: isLocked,
          completed: completedVideoIds.has(video.id),
        };
      });

      return {
        ...section,
        videos,
      };
    });

    return {
      ...subject,
      sections: sectionsWithLockStatus,
    };
  },
};
