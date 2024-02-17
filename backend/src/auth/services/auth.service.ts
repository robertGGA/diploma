import { UserRepository } from '@src/user/repositories/user.repository';
import bcrypt from 'bcrypt';
import { TokenServiceInstance } from '@src/auth/services/token.service';
import { UserDto } from '@src/user/dtos/user.dto';
import { User } from '@src/user/entity/user';

export class AuthorizationService {
    constructor() {}

    async registration(username: string, password: string) {
        try {
            const candidate = await UserRepository.findByUsername(username);
            if (candidate) {
                throw new Error('Пользователь уже существует');
            }
            const hashedPassword = await bcrypt.hash(password, 3);
            const user = (await UserRepository.createUser({
                id: "",
                name: username,
                password: hashedPassword
            })) as unknown as UserDto;
            const userDto = new UserDto(user);
            const tokens = TokenServiceInstance.generateTokens(user);
            await TokenServiceInstance.saveToken(
                userDto.id,
                tokens.refreshToken
            );

            return {
                ...tokens,
                user: UserDto,
            };
        } catch (e) {
            throw new Error('Пользователь уже существует');
        }
    }
}

export const AuthService = new AuthorizationService();
