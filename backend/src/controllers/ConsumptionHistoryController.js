import ConsumptionHistory from "../models/ConsumptionHistory.js";
import { db } from "../config/db.js";

export class ConsumptionHistoryController {
  static getAll = async (req, res) => {
    console.log("Desde /api/consumptionhistory");
  };

  static create = async (req, res) => {
    const transaction = await db.transaction();

    try {
      const lastid = await ConsumptionHistory.findOne({
        order: [["id_consumption", "DESC"]],
      });

      const newId = lastid ? lastid.id_consumption + 1 : 1;
      const consumptionHistory = await ConsumptionHistory.create(
        { ...req.body, id_consumption: newId },
        { transaction }
      );

      await transaction.commit();

      const responseData = {
        id: consumptionHistory.id_consumption,
        appliance_id: consumptionHistory.appliance_id,
        date: consumptionHistory.date,
        consumption_KWH: consumptionHistory.consumption_KWH,
        CO2_KG: consumptionHistory.CO2_KG,
      };

      res.status(201).json({
        message: "Consumo creado correctamente",
        user: responseData,
      });
    } catch (error) {
      await transaction.rollback();

      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static getById = async (req, res) => {
    console.log("Desde Post /api/consumptionhistory");
  };

  static updateById = async (req, res) => {
    console.log("Desde Post /api/consumptionhistory");
  };

  static deleteById = async (req, res) => {
    console.log("Desde Post /api/consumptionhistory");
  };
}
