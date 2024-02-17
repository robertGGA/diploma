import { User } from '@src/user/entity/user';
import { dataSource } from '@src/db/db';

export const UserRepository = dataSource.getRepository(User).extend({
    findByUsername(username: string) {
        return this.createQueryBuilder('User')
            .where('user.username = :username', { username })
            .getOne();
    },

    createUser(user: User) {
        return this.createQueryBuilder('User')
            .insert()
            .into('User')
            .values(user)
            .execute();
    },
});
