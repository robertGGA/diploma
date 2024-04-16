import { Router as RouterType } from 'express-serve-static-core';
import { Router, RouterOptions } from 'express';

export abstract class RouterExtension {
    protected router: RouterType;
    protected constructor(routerConfig?: RouterOptions) {
        this.router = new (Router as any)(routerConfig);
    }

    abstract createRouter(): Router;

    returnRouter(): Router {
        return this.router;
    }
}

export interface RouteConfig {
    path: string;
    controllerMethod: Function;
}
