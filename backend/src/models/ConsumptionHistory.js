import { DataTypes, Model } from "sequelize";
import { db } from "../config/db.js";

class ConsumptionHistory extends Model {}

ConsumptionHistory.init(
  {
    id_consumption: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    consumption_KWH: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    CO2_KG: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "ConsumptionHistory",
    tableName: "consumption_history",
  }
);

export default ConsumptionHistory;
