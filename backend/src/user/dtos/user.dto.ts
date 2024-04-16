import { User } from '@src/user/entity/user';

export class UserDto {
    id: string;
    name: string;
    password: string;
    constructor(user: User) {
        this.id = user.id!;
        this.name = user.name;
        this.password = user.password;
    }
}
