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
    console.log("Desde Post /api/appliancefeature");
  };

  static updateById = async (req, res) => {
    console.log("Desde Post /api/appliancefeature");
  };

  static deleteById = async (req, res) => {
    console.log("Desde Post /api/appliancefeature");
  };
}
