import { RouterExtension } from '@routers/router-types';
import { Router, RouterOptions } from 'express';
import { generateController } from '@src/generate/controllers/generate.controller';
import FileMiddleware from '@src/middleware/file';

export class GenerateRouter extends RouterExtension {
    constructor(routerConfig?: RouterOptions) {
        super(routerConfig);

        this.createRouter();
    }

    createRouter(): Router {
        this.router.post(
            '/upload',
            FileMiddleware.single('file'),
            generateController.upload
        );

        return this.router;
    }

    returnRouter(): Router {
        return super.returnRouter();
    }
}
