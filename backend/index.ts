import * as dotenv from 'dotenv';
import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import { Express, Router } from 'express';
import { router } from './src/routers/router';
import { dataSource } from './src/db/db';
import { DataSource } from 'typeorm';

class Bootstrap {
    app: Express;
    private PORT: string;
    constructor() {
        dotenv.config();
        this.connectDB();
        this.PORT = process.env.PORT || '3000';
        this.app = express();
        this.registerMiddleware([express.json(), cookieParser(), cors()]);
        this.registerRouters([{ path: '/api', router: router }]);
    }

    private registerMiddleware(middlewares?: Array<any>): void {
        if (middlewares?.length) {
            middlewares.forEach(mware => this.app.use(mware));
        }
    }

    private registerRouters(routers: [{ path?: string; router: Router }]) {
        routers.forEach(obj => {
            if (obj.path) {
                this.app.use(obj.path, obj.router);
                return;
            }
            this.app.use(obj.router);
        });
    }

    async start() {
        try {
            this.app.listen(this.PORT, () =>
                console.log(`Server started on port ${this.PORT}`)
            );
        } catch (e) {
            console.log(e);
        }
    }

    async connectDB() {
        dataSource
            .initialize()
            .then(() => {
                console.log('DataSource successfully initiated');
            })
            .catch(err =>
                console.error('DataSource initiated with error: \n', err)
            );
    }
}

(function () {
    new Bootstrap().start();
})();
