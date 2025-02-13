// backend/controllers/UsersController.js

import bcrypt from 'bcryptjs';
import User from '../models/users.js';

export class UsersController {
  static create = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'El correo ya está registrado' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });

      res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear usuario' });
    }
  };
}
