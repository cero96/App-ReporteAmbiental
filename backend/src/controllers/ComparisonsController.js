import Comparisons from "../models/comparisons.js";
import { db } from "../config/db.js";

export class ComparisonsControllers {
  static getAll = async (req, res) => {
    try {
      const comparisons = await Comparisons.findAll({
        order: [["id_comparison", "ASC"]],
        //TODO: Filtrar por el usuario autenticado
      });

      res.json(comparisons);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static create = async (req, res) => {
    const transaction = await db.transaction();

    try {
      const lastComparisons = await Comparisons.findOne({
        order: [["id_comparison", "DESC"]],
      });

      const newComparissonId = lastComparisons
        ? lastComparisons.id_comparison + 1
        : 1;
      const comparisons = await Comparisons.create(
        { ...req.body, id_comparison: newComparissonId },
        { transaction }
      );

      await transaction.commit();

      const responseData = {
        id_comparisons: comparisons.id_comparison,
        name: comparisons.name,
        description: comparisons.description,
      };

      res.status(201).json({
        message: "Comparisson creado correctamente",
        user: responseData,
      });
    } catch (error) {
      await transaction.rollback();

      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static getById = async (req, res) => {
    try {
      const { id } = req.params;
      const comparisons = await Comparisons.findByPk(id);

      if (!comparisons) {
        return res.status(404).json({ error: "Comparacion no encontrada" });
      }
      res.json(comparisons);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static updateById = async (req, res) => {
    try {
      const { id } = req.params;
      const comparisons = await Comparisons.findByPk(id);

      if (!comparisons) {
        return res.status(404).json({ error: "Comparacion no encontrada" });
      }
      await comparisons.update(req.body);
      res.json("Comparacion actualizada correctamente");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static deleteById = async (req, res) => {
    try {
      const { id } = req.params;
      const comparisons = await Comparisons.findByPk(id);

      if (!comparisons) {
        return res.status(404).json({ error: "Comparacion no encontrada" });
      }
      await comparisons.destroy();
      res.json("Comparacion eliminada correctamente");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };
}
