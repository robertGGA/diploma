import { Router, RouterOptions } from 'express';
import { RouterExtension } from '@routers/router-types';
import { authController } from '@src/auth/controllers/auth-controller';

export class AuthRouter extends RouterExtension {
    constructor(routerConfig?: RouterOptions) {
        super(routerConfig);

        this.createRouter();
    }

    createRouter() {
        this.router.post('/registration', authController.registration);
        this.router.post('/login', authController.login as any);
        this.router.post('/logout', authController.logout);
        this.router.get('/users', authController.getUsers);
        return this.router;
    }

    returnRouter(): Router {
        return super.returnRouter();
    }
}
