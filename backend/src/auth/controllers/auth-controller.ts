import { NextFunction, Request, Response } from 'express';
import { AuthService } from '@src/auth/services/auth.service';
import { dataSource } from '@src/db/db';
import { User } from '@src/user/entity/user';

class AuthController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, password } = req.body;
            const userData = await AuthService.registration(name, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {}
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(['hihi', 'yoyo']);
        } catch (e) {
            res.json(['hihi12', 'yoyo']);
        }
    }

    async logout() {
        try {
        } catch (e) {}
    }

    async getUsers() {
        return await dataSource.manager.findOneBy(User, { id: '1' });
    }
}

export const authController = new AuthController();
