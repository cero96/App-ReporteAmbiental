import React, { useState } from "react";

const CarbonFootprintForm = ({ onSubmit }) => {
  const [electricity, setElectricity] = useState(0); // Inicializa con 0
  const [carDistance, setCarDistance] = useState(0); // Inicializa con 0
  const [flightDistance, setFlightDistance] = useState(0); // Inicializa con 0

  const handleInputChange = (e, setState) => {
    const value = parseFloat(e.target.value);
    setState(isNaN(value) ? 0 : value); // Si no es un número, usa 0
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(electricity, carDistance, flightDistance);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div className="mb-3">
        <label htmlFor="electricity" className="form-label">
          Consumo de Electricidad (kWh)
        </label>
        <input
          type="number"
          className="form-control"
          id="electricity"
          value={electricity}
          onChange={(e) => handleInputChange(e, setElectricity)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="carDistance" className="form-label">
          Kilómetros Recorridos en Automóvil
        </label>
        <input
          type="number"
          className="form-control"
          id="carDistance"
          value={carDistance}
          onChange={(e) => handleInputChange(e, setCarDistance)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="flightDistance" className="form-label">
          Kilómetros Recorridos en Avión
        </label>
        <input
          type="number"
          className="form-control"
          id="flightDistance"
          value={flightDistance}
          onChange={(e) => handleInputChange(e, setFlightDistance)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Calcular Huella de Carbono
      </button>
    </form>
  );
};

export default CarbonFootprintForm;
