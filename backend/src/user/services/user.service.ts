import {User} from "@src/user/entity/user";

class UserService {
    constructor() {}

    async registration(password: string, username: string): Promise<any> {
        const candidate = await User;
    }
}
