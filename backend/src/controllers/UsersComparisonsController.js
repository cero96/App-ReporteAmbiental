import UserComparisons from "../models/usersComparisons.js";
import { db } from "../config/db.js";

export class UsersComparionsControllers {
  static getAll = async (req, res) => {
    console.log("Desde /api/userscomparisons");
  };

  static create = async (req, res) => {
    const transaction = await db.transaction();

    try {
      const lastId = await UserComparisons.findOne({
        order: [["user_comparisons_id", "DESC"]],
      });

      const newId = lastId ? lastId.id + 1 : 1;
      const user_comparisons = await UserComparisons.create(
        { ...req.body, id: newId },
        { transaction }
      );

      await transaction.commit();

      const responseData = {
        user_comparisons_id: user_comparisons.user_comparisons_id,
        user_id: user_comparisons.user_id,
        comparison_id: user_comparisons.comparison_id,
        appliance_ids: user.appliance_ids,
      };

      res.status(201).json({
        message: "User comparisons creado correctamente",
        user: responseData,
      });
    } catch (error) {
      await transaction.rollback();

      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static getById = async (req, res) => {
    console.log("Desde Post /api/userscomparisons");
  };

  static updateById = async (req, res) => {
    console.log("Desde Post /api/userscomparisons");
  };

  static deleteById = async (req, res) => {
    console.log("Desde Post /api/userscomparisons");
  };
}
