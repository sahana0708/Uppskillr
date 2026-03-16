import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { progressService } from './progress.service';
import { authMiddleware, AuthRequest } from '../../middleware/authMiddleware';
import { z } from 'zod';

const router = Router();

const progressSchema = z.object({
  last_position_seconds: z.number().min(0),
  is_completed: z.boolean().optional(),
});

// GET /api/progress/videos/:videoId - Get user's progress for a video
router.get(
  '/videos/:videoId',
  authMiddleware,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const videoId = req.params.videoId;

    const progress = await progressService.getVideoProgress(userId, videoId);
    res.json(progress || { lastPositionSec: 0, isCompleted: false });
  })
);

// POST /api/progress/videos/:videoId - Save/update video progress
router.post(
  '/videos/:videoId',
  authMiddleware,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const videoId = req.params.videoId;
    const { last_position_seconds, is_completed } = progressSchema.parse(
      req.body
    );

    const progress = await progressService.updateVideoProgress({
      userId,
      videoId,
      lastPositionSec: last_position_seconds,
      isCompleted: is_completed || false,
    });

    res.json(progress);
  })
);

export default router;
