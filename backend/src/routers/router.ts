import { Router } from 'express';
import { Router as RouterType } from 'express-serve-static-core';
import { AuthRouter } from '@src/auth/routers/auth-router';
import { GenerateRouter } from '@src/generate/routers/generate.router';

function createRouter(): Router {
    const mainRouter: RouterType = new (Router as any)();
    const authRouter = new AuthRouter().returnRouter();
    const generateRouter = new GenerateRouter().returnRouter();
    mainRouter.use('/auth', authRouter);
    mainRouter.use('/file', generateRouter);
    return mainRouter;
}

export const router: Router = createRouter();
