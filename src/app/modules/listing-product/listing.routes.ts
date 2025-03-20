import { NextFunction, Request, Response, Router } from 'express';
import auth from '../../middlewares/auth';
import { upload } from '../../middlewares/uploadImgToCloudinary';
import {
  createProductListing,
  deleteSingleListing,
  getAllListings,
  getSingleListing,
} from './listing.controller';

const router = Router();

router
  .route('/')
  .get(getAllListings)
  .post(
    auth('user'),
    upload.fields([{ name: 'fiels' }]),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body?.data);
      next();
    },
    createProductListing,
  );

router
  .route('/:id')
  .get(getSingleListing)
  .put()
  .delete(auth('user', 'admin'), deleteSingleListing);

export const ListingRoutes = router;
