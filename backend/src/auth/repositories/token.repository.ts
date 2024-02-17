import { dataSource } from '@src/db/db';
import { Token } from '@src/auth/entity/token';

export const TokenRepository = dataSource.getRepository(Token).extend({
    findTokenById(id: string) {
        return this.createQueryBuilder('Token')
            .where('token.id = :id', { id })
            .getOne();
    },
    createToken(token: Token) {
        return this.createQueryBuilder('Token')
            .insert()
            .into('Token')
            .values(token)
            .execute();
    }
});
