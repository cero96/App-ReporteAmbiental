import { DataTypes, Model } from "sequelize";
import { db } from "../config/db.js";

class UserComparisons extends Model {}

UserComparisons.init(
  {
    user_comparisons_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "Cascade",
    },
    comparison_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "comparisons",
        key: "id_comparison",
      },
      onDelete: "Cascade",
    },
    appliance_ids: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "appliances",
        key: "appliance_id",
      },
      onDelete: "Cascade",
    },
  },
  {
    sequelize: db,
    modelName: "UserComparisons",
    tableName: "users_comparisons",
  }
);

export default UserComparisons;
