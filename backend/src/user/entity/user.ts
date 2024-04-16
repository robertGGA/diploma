import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    @Index({ unique: true })
    name: string;

    @Column()
    password: string;

    @Column({ type: 'bool' })
    isActive?: boolean;
}
