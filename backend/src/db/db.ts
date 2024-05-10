import { Pool } from 'pg';
import { DataSource } from 'typeorm';
import { User } from '@src/user/entity/user';
import { Token } from '@src/auth/entity/token';
export const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: 'localhost',
    port: Number(process.env.DBPORT),
    database: process.env.DBNAME,
});

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.DBPORT),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DBNAME,
    entities: ['./src/auth/entity/*{.js,.ts}', './src/user/entity/*{.js,.ts}'],
    migrations: ['src/migrations/*{.js,.ts}'],
    subscribers: [],
    logging: true,
    synchronize: true,
});
