import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const db = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: "postgres",
    logging: false,
    define: {
      timestamps: true,
    },
  }
);

// Sincronizar los modelos con la base de datos
const syncDatabase = async () => {
  try {
    // Sincronizar los modelos con la base de datos
    await db.sync({ force: false }); // `force: false` evita eliminar las tablas, pero puedes usar `true` para recrearlas
    console.log("Modelos sincronizados con la base de datos.");
  } catch (error) {
    console.error("Error al sincronizar los modelos:", error);
  }
};

syncDatabase(); // Llama a la función para sincronizar la base de datos
