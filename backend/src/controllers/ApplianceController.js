import Appliances from "../models/appliances.js";
import { db } from "../config/db.js";

export class AppliancesController {
  static getAll = async (req, res) => {
    try {
      const appliance = await Appliances.findAll({
        order: [["appliance_id", "ASC"]],
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
      const applianceData = {
        ...req.body,
        image: req.file ? req.file.path : null, // Guarda la ruta de la imagen
      };

      const appliance = await Appliances.create(applianceData, { transaction });

      await transaction.commit();

      const responseData = {
        id_appliance: appliance.appliance_id,
        name: appliance.name,
        brand: appliance.brand,
        model: appliance.model,
        type: appliance.type,
        energy_rating: appliance.energy_rating,
        image: appliance.image,
      };

      res.status(201).json({
        message: "Appliance creado correctamente",
        appliance: responseData,
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
          .json({ error: "Electrodoméstico no encontrado" });
      }
      res.json(appliance);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static updateById = async (req, res) => {
    const transaction = await db.transaction();

    try {
      const { id } = req.params;
      const appliance = await Appliances.findByPk(id, { transaction });

      if (!appliance) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ error: "Electrodoméstico no encontrado" });
      }

      const updateData = {
        ...req.body,
        image: req.file ? req.file.path : appliance.image, // Actualiza la imagen si se proporciona una nueva
      };

      await appliance.update(updateData, { transaction });
      await transaction.commit();

      res.json("Electrodoméstico actualizado correctamente");
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static deleteById = async (req, res) => {
    const transaction = await db.transaction();

    try {
      const { id } = req.params;
      const appliance = await Appliances.findByPk(id, { transaction });

      if (!appliance) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ error: "Electrodoméstico no encontrado" });
      }

      await appliance.destroy({ transaction });
      await transaction.commit();

      res.json("Electrodoméstico eliminado correctamente");
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };
}
