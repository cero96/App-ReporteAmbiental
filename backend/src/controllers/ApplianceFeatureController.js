import ApplianceFeature from "../models/applianceFeatures.js";
import { db } from "../config/db.js";

export class ApplianceFeatureController {
  static getAll = async (req, res) => {
    console.log("Desde /api/ApplianceFeature");
  };

  static create = async (req, res) => {
    const transaction = await db.transaction();

    try {
      const lastid = await ApplianceFeature.findOne({
        order: [["id_appliance_feature", "DESC"]],
      });

      const newId = lastid ? lastid.id + 1 : 1;
      const applianceFeatures = await ApplianceFeature.create(
        { ...req.body, id: newId },
        { transaction }
      );

      await transaction.commit();

      const responseData = {
        id: applianceFeatures.id_appliance_feature,
        appliance_id: applianceFeatures.appliance_id,
        name: applianceFeatures.feature_name,
        brand: applianceFeatures.feature_value,
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
