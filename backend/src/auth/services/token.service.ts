import jwt, { SignOptions } from 'jsonwebtoken';
import { TokenRepository } from '@src/auth/repositories/token.repository';
import { Token } from '@src/auth/entity/token';

class TokenService {
    generateTokens(payload: string | Buffer | object) {
        const accessTokenOptions: SignOptions = {
            expiresIn: '30m',
        };
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET as any,
            accessTokenOptions
        );
        const refreshTokenOptions: SignOptions = {
            expiresIn: '30d',
        };
        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET as any,
            refreshTokenOptions
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = (await TokenRepository.findTokenById(
            userId
        )) as Token;

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return await TokenRepository.save(tokenData);
        }

        return await TokenRepository.createToken({
            userId: userId,
            refreshToken: refreshToken,
        });
    }
}

export const TokenServiceInstance = new TokenService();
