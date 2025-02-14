import React, { useState } from "react";
import CarbonFootprintForm from "./CarbonFootprintForm";
import CarbonFootprintResult from "./CarbonFootprintResult";
import { calculateCarbonFootprint } from "../utils/calculateCarbonFootprint";

const CarbonFootprintCalculator = () => {
  const [emissions, setEmissions] = useState(null);

  const handleCalculate = (electricity, carDistance, flightDistance) => {
    const totalEmissions = calculateCarbonFootprint(
      electricity,
      carDistance,
      flightDistance
    );
    setEmissions(totalEmissions);
  };

  return (
    <div className="container mt-5">
      <h2>Calculadora de Huella de Carbono</h2>
      <CarbonFootprintForm onSubmit={handleCalculate} />
      {emissions !== null && <CarbonFootprintResult emissions={emissions} />}
    </div>
  );
};

export default CarbonFootprintCalculator;
