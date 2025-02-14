import React, { useState } from "react";
import ApplianceService from "../services/ApplianceService";

const ApplianceForm = ({ onApplianceCreated }) => {
  const [appliance, setAppliance] = useState({
    name: "", // Ubicación
    brand: "",
    model: "",
    type: "", // Cambiado a texto
    energy_rating: [],
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "checkbox") {
      setAppliance((prev) => ({
        ...prev,
        [name]: prev[name].includes(value)
          ? prev[name].filter((item) => item !== value)
          : [...prev[name], value],
      }));
    } else {
      setAppliance((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    setAppliance((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(appliance).forEach((key) => {
      formData.append(key, appliance[key]);
    });

    try {
      await ApplianceService.createAppliance(formData);
      onApplianceCreated();
      setAppliance({
        name: "",
        brand: "",
        model: "",
        type: "", // Reset to empty
        energy_rating: [],
        image: null,
      });
    } catch (error) {
      console.error("Error al crear el electrodoméstico:", error);
    }
  };

  return (
    <div className="container p-4">
      <div className="card p-4 shadow-sm mb-4">
        <h3 className="card-title text-center mb-4">Agregar Electrodoméstico</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Ubicación</label>
            <input
              type="text"
              name="name"
              value={appliance.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej. Cocina, Sala, etc."
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Marca</label>
            <input
              type="text"
              name="brand"
              value={appliance.brand}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Modelo</label>
            <input
              type="text"
              name="model"
              value={appliance.model}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tipo de Electrodoméstico</label>
            <input
              type="text"
              name="type"
              value={appliance.type}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej. Refrigeradora, Lavadora, etc."
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rango Energético</label>
            <select
              multiple
              name="energy_rating"
              value={appliance.energy_rating}
              onChange={handleChange}
              className="form-control"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Imagen</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Crear Electrodoméstico
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplianceForm;
