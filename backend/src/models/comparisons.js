import { DataTypes, Model } from "sequelize";
import { db } from "../config/db.js";

class Comparisons extends Model {}

Comparisons.init(
  {
    id_comparison: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "UsersComparisons",
    tableName: "comparisons",
  }
);

export default Comparisons;
