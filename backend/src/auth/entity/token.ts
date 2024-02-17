import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@src/user/entity/user';

@Entity()
export class Token {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @OneToMany(() => User, user => user.id)
    userId: string;

    @Column()
    refreshToken: string;
}
