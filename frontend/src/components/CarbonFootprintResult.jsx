import React from "react";

const CarbonFootprintResult = ({ emissions }) => {
  const globalAverage = 4800; // 4.8 toneladas en kg

  return (
    <div className="mt-4 p-4 border rounded">
      <h3>Resultado de Huella de Carbono</h3>
      <p>
        Tu huella de carbono es de <strong>{emissions} kg de CO2</strong>.
      </p>
      <p>
        El promedio mundial es de <strong>{globalAverage} kg de CO2</strong> al
        año.
      </p>
      {emissions > globalAverage ? (
        <p className="text-danger">
          Tu huella de carbono es mayor que el promedio mundial.
        </p>
      ) : (
        <p className="text-success">
          ¡Felicidades! Tu huella de carbono es menor que el promedio mundial.
        </p>
      )}
    </div>
  );
};

export default CarbonFootprintResult;
