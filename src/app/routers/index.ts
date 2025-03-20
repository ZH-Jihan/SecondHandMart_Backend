import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { ListingRoutes } from '../modules/listing-product/listing.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = Router();

const allRoutersModel = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/listings',
    route: ListingRoutes,
  },
];

allRoutersModel.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
