import { NextFunction, Request, Response, Router } from 'express';
import auth from '../../middlewares/auth';
import { upload } from '../../middlewares/uploadImgToCloudinary';
import {
  deleteUserWonAccount,
  getUserProfile,
  updateUserWonProfile,
} from './user.controller';

const router = Router();

router
  .route('/:id')
  .get(auth('admin', 'user'), getUserProfile)
  .put(
    auth('admin', 'user'),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body?.data);
      next();
    },
    updateUserWonProfile,
  )
  .delete(auth('admin', 'user'), deleteUserWonAccount);

export const UserRoutes = router;
