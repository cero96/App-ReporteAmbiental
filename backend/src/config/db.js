import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();


export const db = new Sequelize(
    process.env.PG_DATABASE,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        dialect: 'postgres',
        logging: false,
        define: {
            timestamps: false
        }

    }
);
