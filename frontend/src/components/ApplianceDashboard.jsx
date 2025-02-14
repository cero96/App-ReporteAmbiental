import React, { useEffect, useState } from "react";
import ApplianceService from "../services/ApplianceService";
import ApplianceForm from "./ApplianceForm";

const ApplianceDashboard = () => {
  const [appliances, setAppliances] = useState([]);

  const fetchAppliances = async () => {
    try {
      const response = await ApplianceService.getAllAppliances();
      setAppliances(response.data);
    } catch (error) {
      console.error("Error al cargar los electrodomésticos:", error);
    }
  };

  useEffect(() => {
    fetchAppliances();
  }, []);

  const handleDelete = async (id) => {
    try {
      await ApplianceService.deleteAppliance(id);
      fetchAppliances(); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar el electrodoméstico:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Dashboard de Electrodomésticos</h1>

      <div className="row">
        {appliances.map((appliance) => (
          <div className="col-md-4 mb-4" key={appliance.appliance_id}>
            <div className="card p-3 shadow-sm">
              <img
                src={appliance.image ? appliance.image : "default-image.jpg"}
                alt={appliance.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{appliance.name}</h5>
                <p className="card-text">Marca: {appliance.brand}</p>
                <p className="card-text">Modelo: {appliance.model}</p>
                <p className="card-text">Tipo: {appliance.type}</p>
                <p className="card-text">Rango Energético: {appliance.energy_rating.join(", ")}</p>
                <button
                  onClick={() => handleDelete(appliance.appliance_id)}
                  className="btn btn-danger w-100"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplianceDashboard;
