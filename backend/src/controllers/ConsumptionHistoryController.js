import ConsumptionHistory from "../models/ConsumptionHistory.js";
import { db } from "../config/db.js";

export class ConsumptionHistoryController {
  static getAll = async (req, res) => {
    try {
      const consumption = await ConsumptionHistory.findAll({
        order: [["id_consumption", "ASC"]],
        //TODO: Filtrar por el usuario autenticado
      });

      res.json(consumption);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
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
    try {
      const { id } = req.params;
      const consumption = await ConsumptionHistory.findByPk(id);

      if (!consumption) {
        return res.status(404).json({ error: "Consumo no encontrada" });
      }
      res.json(consumption);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };
  static updateById = async (req, res) => {
    try {
      const { id } = req.params;
      const consumption = await ConsumptionHistory.findByPk(id);

      if (!consumption) {
        return res.status(404).json({ error: "Consumo no encontrada" });
      }
      await consumption.update(req.body);
      res.json("Consumo actualizado correctamente");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static deleteById = async (req, res) => {
    try {
      const { id } = req.params;
      const consumption = await ConsumptionHistory.findByPk(id);

      if (!consumption) {
        return res.status(404).json({ error: "Consumo no encontrada" });
      }
      await consumption.destroy();
      res.json("Consumo eliminado correctamente");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };
}
