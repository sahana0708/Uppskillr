import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { videosService } from './videos.service';
import { authMiddleware, AuthRequest } from '../../middleware/authMiddleware';

const router = Router();

// GET /api/videos/:id - Get video by ID with lock status and progress
router.get(
  '/:id',
  authMiddleware,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const videoId = req.params.id;

    const video = await videosService.getVideoById(videoId, userId);
    res.json(video);
  })
);

export default router;
