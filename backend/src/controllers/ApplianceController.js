import Appliances from "../models/appliances.js";
import { db } from "../config/db.js";

export class AppliancesController {
  static getAll = async (req, res) => {
    try {
      const appliance = await Appliances.findAll({
        order: [["appliance_id", "ASC"]],
        //TODO: Filtrar por el usuario autenticado
      });

      res.json(appliance);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static create = async (req, res) => {
    const transaction = await db.transaction();

    try {
      const lastid = await Appliances.findOne({
        order: [["appliance_id", "DESC"]],
      });

      const newId = lastid ? lastid.appliance_id + 1 : 1;
      const appliance = await Appliances.create(
        { ...req.body, appliance_id: newId },
        { transaction }
      );

      await transaction.commit();

      const responseData = {
        id_appliance: appliance.appliance_id,
        name: appliance.name,
        brand: appliance.brand,
        model: appliance.model,
        type: appliance.type,
        energy_rating: appliance.energy_rating,
      };

      res.status(201).json({
        message: "Appliance creado correctamente",
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
      const appliance = await Appliances.findByPk(id);

      if (!appliance) {
        return res
          .status(404)
          .json({ error: "Electrodomestico no encontrada" });
      }
      res.json(appliance);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static updateById = async (req, res) => {
    console.log("Desde Post /api/appliance");
  };

  static deleteById = async (req, res) => {
    console.log("Desde Post /api/appliance");
  };
}
