import UserComparisons from "../models/usersComparisons.js";
import { db } from "../config/db.js";

export class UsersComparisonsController {
  static getAll = async (req, res) => {
    console.log("Desde /api/userscomparisons");
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
    console.log("Desde Post /api/userscomparisons");
  };

  static updateById = async (req, res) => {
    console.log("Desde Post /api/userscomparisons");
  };

  static deleteById = async (req, res) => {
    console.log("Desde Post /api/userscomparisons");
  };
}
