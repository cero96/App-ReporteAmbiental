import { DataTypes, Model } from "sequelize";
import { db } from "../config/db.js";

class ApplianceFeature extends Model {}

ApplianceFeature.init(
  {
    id_appliance_feature: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    appliance_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "appliances",
        key: "appliance_id",
      },
      onDelete: "Cascade",
    },
    feature_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feature_value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "ApplianceFeature",
    tableName: "appliance_features",
  }
);

export default ApplianceFeature;
