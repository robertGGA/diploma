import { Router } from 'express';
import { Router as RouterType } from 'express-serve-static-core';
import { AuthRouter } from '@src/auth/routers/auth-router';

function createRouter(): Router {
    const mainRouter: RouterType = new (Router as any)();
    const authRouter = new AuthRouter().returnRouter();
    mainRouter.use('/auth', authRouter);
    return mainRouter;
}

export const router: Router = createRouter();
