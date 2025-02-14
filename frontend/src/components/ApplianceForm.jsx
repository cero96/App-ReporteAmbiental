import React, { useState } from "react";
import axios from "axios";

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
      const response = await axios.post("/api/appliances", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Enviar token de autenticación
        },
      });

      onApplianceCreated(); // Actualizar el dashboard
      setAppliance({
        name: "",
        brand: "",
        model: "",
        type: "",
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
          {/* Resto del formulario */}
        </form>
      </div>
    </div>
  );
};

export default ApplianceForm;
