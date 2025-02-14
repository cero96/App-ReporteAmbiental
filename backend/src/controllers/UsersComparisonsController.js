import UserComparisons from "../models/usersComparisons.js";
import { db } from "../config/db.js";

export class UsersComparisonsController {
  static getAll = async (req, res) => {
    try {
      const usercomparisons = await UserComparisons.findAll({
        order: [["user_comparisons_id", "ASC"]],
        //TODO: Filtrar por el usuario autenticado
      });

      res.json(usercomparisons);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static create = async (req, res) => {
    const transaction = await db.transaction();

    try {
      const lastId = await UserComparisons.findOne({
        order: [["user_comparisons_id", "DESC"]],
      });

      const newId = lastId ? lastId.user_comparisons_id + 1 : 1;
      const user_comparisons = await UserComparisons.create(
        { ...req.body, user_comparisons_id: newId },
        { transaction }
      );

      await transaction.commit();

      const responseData = {
        user_comparisons_id: user_comparisons.user_comparisons_id,
        user_id: user_comparisons.user_id,
        comparison_id: user_comparisons.comparison_id,
        appliance_ids: user_comparisons.appliance_ids,
      };

      res.status(201).json({
        message: "User comparisons creado correctamente",
        user: responseData,
      });
    } catch (error) {
      if (transaction.finished !== "commit") {
        await transaction.rollback();
      }
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static getById = async (req, res) => {
    try {
      const { id } = req.params;
      const usercomparisons = await UserComparisons.findByPk(id);

      if (!usercomparisons) {
        return res.status(404).json({ error: "Comparacion no encontrada" });
      }
      res.json(usercomparisons);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };
  static updateById = async (req, res) => {
    try {
      const { id } = req.params;
      const usercomparisons = await UserComparisons.findByPk(id);

      if (!usercomparisons) {
        return res.status(404).json({ error: "Comparacion no encontrada" });
      }

      await usercomparisons.update(req.body);
      res.json("User comparisons actualizado correctamente");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static deleteById = async (req, res) => {
    try {
      const { id } = req.params;
      const usercomparisons = await UserComparisons.findByPk(id);

      if (!usercomparisons) {
        return res.status(404).json({ error: "Comparacion no encontrada" });
      }

      await usercomparisons.destroy();
      res.json("User comparisons eliminado correctamente");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };
}
