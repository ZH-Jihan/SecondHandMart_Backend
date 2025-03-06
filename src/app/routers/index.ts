import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
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
];

allRoutersModel.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
