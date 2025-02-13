import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import { db } from '../config/db.js';

export class UsersController {
  static getAll = async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  };

  static getById = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el usuario' });
    }
  };

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

  static updateById = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      user.name = name || user.name;
      user.email = email || user.email;
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }

      await user.save();
      res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  };

  static deleteById = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      await user.destroy();
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
  };

  static login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'Correo electrónico o contraseña incorrectos' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Correo electrónico o contraseña incorrectos' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

      res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  };
}
