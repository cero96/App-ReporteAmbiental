import User from '../models/users.js';
import { db } from '../config/db.js';

export class UsersControllers {
    static getAll = async (req, res) => {
        console.log('Desde /api/users');
    }

    static create = async (req, res) => {
        const transaction = await db.transaction();

        try {
            const lastUser = await User.findOne({
                order: [['id', 'DESC']]
            });

            const newUserId = lastUser ? lastUser.id + 1 : 1;
            const user = await User.create({ ...req.body, id: newUserId }, { transaction });

            await transaction.commit();

            const responseData = {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }

            res.status(201).json({ message: 'Usuario creado correctamente', user: responseData });
        } catch (error) {
            await transaction.rollback();
            
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    static getById = async (req, res) => {
        console.log('Desde Post /api/users');
    }

    static updateById = async (req, res) => {
        console.log('Desde Post /api/users');
    }

    static deleteById = async (req, res) => {
        console.log('Desde Post /api/users');
    }
}
