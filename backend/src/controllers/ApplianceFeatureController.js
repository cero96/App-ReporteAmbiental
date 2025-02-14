import ApplianceFeature from "../models/applianceFeatures.js";
import { db } from "../config/db.js";

export class ApplianceFeatureController {
  static getAll = async (req, res) => {
    try {
      const applianceFeature = await ApplianceFeature.findAll({
        order: [["id_appliance_feature", "ASC"]],
        //TODO: Filtrar por el usuario autenticado
      });

      res.json(applianceFeature);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static create = async (req, res) => {
    const transaction = await db.transaction();

    try {
      const lastid = await ApplianceFeature.findOne({
        order: [["id_appliance_feature", "DESC"]],
      });

      const newId = lastid ? lastid.id_appliance_feature + 1 : 1;
      const applianceFeatures = await ApplianceFeature.create(
        { ...req.body, id_appliance_feature: newId },
        { transaction }
      );

      await transaction.commit();

      const responseData = {
        id: applianceFeatures.id_appliance_feature,
        appliance_id: applianceFeatures.appliance_id,
        feature_name: applianceFeatures.feature_name,
        feature_value: applianceFeatures.feature_value,
      };

      res.status(201).json({
        message: "Appliance Feature creado correctamente",
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
      const feature = await ApplianceFeature.findByPk(id);

      if (!feature) {
        return res.status(404).json({ error: "Caracteristica no encontrada" });
      }
      res.json(feature);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static updateById = async (req, res) => {
    try {
      const { id } = req.params;
      const feature = await ApplianceFeature.findByPk(id);

      if (!feature) {
        return res.status(404).json({ error: "Caracteristica no encontrada" });
      }
      await feature.update(req.body);
      res.json("Feature actualizado correctamente");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static deleteById = async (req, res) => {
    try {
      const { id } = req.params;
      const feature = await ApplianceFeature.findByPk(id);

      if (!feature) {
        return res.status(404).json({ error: "Caracteristica no encontrada" });
      }
      await feature.destroy();
      res.json("Feature eliminado correctamente");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };
}
