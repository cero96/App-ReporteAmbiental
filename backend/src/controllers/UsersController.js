import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/users.js";
import { db } from "../config/db.js";

const secretKey = "your_secret_key"; // Usa una clave secreta más segura.

export class UsersController {
  static login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });

      if (!user)
        return res.status(404).json({ error: "Usuario no encontrado" });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(401).json({ error: "Contraseña incorrecta" });

      const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
        expiresIn: "1h",
      });

      res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static create = async (req, res) => {
    const { name, email, password } = req.body;
    const transaction = await db.transaction();
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create(
        { name, email, password: hashedPassword },
        { transaction }
      );
      await transaction.commit();

      res.status(201).json({
        message: "Usuario registrado correctamente",
        user: { id: newUser.id, name, email },
      });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ error: error.message });
    }
  };

  static getAll = async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static getById = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user)
        return res.status(404).json({ error: "Usuario no encontrado" });

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static updateById = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.findByPk(req.params.id);
      if (!user)
        return res.status(404).json({ error: "Usuario no encontrado" });

      const hashedPassword = password
        ? await bcrypt.hash(password, 10)
        : user.password;

      await user.update({ name, email, password: hashedPassword });
      res.json({ message: "Usuario actualizado correctamente", user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static deleteById = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user)
        return res.status(404).json({ error: "Usuario no encontrado" });

      await user.destroy();
      res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
