import { Router, Request, Response } from 'express';
import { prisma } from '../../config/db';
import { authMiddleware, AuthRequest } from '../../middleware/authMiddleware';

const router = Router();

// GET /api/users/me - Get current user profile
router.get(
  '/me',
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          videoProgress: {
            select: {
              isCompleted: true,
              video: {
                select: {
                  id: true,
                  title: true,
                  section: {
                    select: {
                      subject: {
                        select: {
                          id: true,
                          title: true,
                          thumbnail: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      // Transform user data for response
      const completedVideos = user.videoProgress.filter(
        (vp) => vp.isCompleted
      );
      const inProgressVideos = user.videoProgress.filter(
        (vp) => !vp.isCompleted
      );

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        stats: {
          completedVideos: completedVideos.length,
          inProgressVideos: inProgressVideos.length,
        },
        inProgress: inProgressVideos.slice(0, 5).map((vp) => ({
          video: vp.video,
          progress: 0,
        })),
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Failed to fetch user profile' });
    }
  }
);

export default router;
