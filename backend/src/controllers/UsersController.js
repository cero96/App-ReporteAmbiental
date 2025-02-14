
import User from "../models/users.js";
import { db } from "../config/db.js";

export class UsersControllers {
  static getAll = async (req, res) => {
    try {
      const users = await User.findAll({
        order: [["id", "ASC"]],
        //TODO: Filtrar por el usuario autenticado
      });

      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static create = async (req, res) => {
    const transaction = await db.transaction();

    try {
      const lastUser = await User.findOne({
        order: [["id", "DESC"]],
      });

      const newUserId = lastUser ? lastUser.id + 1 : 1;
      const user = await User.create(
        { ...req.body, id: newUserId },
        { transaction }
      );

      await transaction.commit();

      const responseData = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      };

      res
        .status(201)
        .json({ message: "Usuario creado correctamente", user: responseData });
    } catch (error) {
      await transaction.rollback();

      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static getById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static updateById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      await user.update(req.body);
      res.json("Usuario actualizado correctamente");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static deleteById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      await user.destroy();
      res.json("Usuario eliminado correctamente");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };
}
