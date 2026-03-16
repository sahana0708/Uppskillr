import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { subjectsService } from './subjects.service';
import { authMiddleware, AuthRequest } from '../../middleware/authMiddleware';

const router = Router();

// GET /api/subjects - Get all published subjects
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const subjects = await subjectsService.getAllSubjects();
    res.json(subjects);
  })
);

// GET /api/subjects/:id - Get subject by ID
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const subject = await subjectsService.getSubjectById(req.params.id);
    res.json(subject);
  })
);

// GET /api/subjects/:id/tree - Get subject with sections and videos (with lock status)
router.get(
  '/:id/tree',
  authMiddleware,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const subjectId = req.params.id;

    const subjectTree = await subjectsService.getSubjectTree(
      subjectId,
      userId
    );
    res.json(subjectTree);
  })
);

export default router;
