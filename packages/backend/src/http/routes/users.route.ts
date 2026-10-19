import { Router } from 'express';

import { getProfileController, updateProfileController } from '../controllers';
import { requireAuth } from '../middlewares';

export const usersRoute = Router();

usersRoute.get('/me', requireAuth, getProfileController);

usersRoute.put('/me', requireAuth, updateProfileController);
