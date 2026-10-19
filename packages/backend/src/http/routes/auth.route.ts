import { Router } from 'express';

import {
  loginController,
  logoutController,
  refreshController,
  registerController,
} from '../controllers';

export const authRoute = Router();

authRoute.post('/register', registerController);

authRoute.post('/login', loginController);

authRoute.post('/refresh', refreshController);

authRoute.post('/logout', logoutController);
