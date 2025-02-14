export const calculateCarbonFootprint = (
  electricity,
  carDistance,
  flightDistance
) => {
  const electricityFactor = 0.5; // kg CO2 por kWh
  const carFactor = 0.2; // kg CO2 por km
  const flightFactor = 0.25; // kg CO2 por km

  const totalEmissions =
    electricity * electricityFactor +
    carDistance * carFactor +
    flightDistance * flightFactor;

  return totalEmissions.toFixed(2); // Redondea a 2 decimales
};
