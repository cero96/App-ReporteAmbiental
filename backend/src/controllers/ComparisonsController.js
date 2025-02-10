import Comparisons from "../models/comparisons.js";
import { db } from "../config/db.js";

export class ComparisonsControllers {
  static getAll = async (req, res) => {
    console.log("Desde /api/comparisons");
  };

  static create = async (req, res) => {
    const transaction = await db.transaction();

    try {
      const lastUser = await Comparisons.findOne({
        order: [["id_comparison", "DESC"]],
      });

      const newUserId = lastUser ? lastUser.id + 1 : 1;
      const comparisons = await Comparisons.create(
        { ...req.body, id: newUserId },
        { transaction }
      );

      await transaction.commit();

      const responseData = {
        id_comparisons: comparisons.id_comparison,
        name: comparisons.name,
        description: comparisons.description,
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
    console.log("Desde Post /api/comparisons");
  };

  static updateById = async (req, res) => {
    console.log("Desde Post /api/comparisons");
  };

  static deleteById = async (req, res) => {
    console.log("Desde Post /api/comparisons");
  };
}
