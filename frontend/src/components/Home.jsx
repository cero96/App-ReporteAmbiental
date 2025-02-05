import React, { useState, useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [data, setData] = useState([12, 19, 3, 5, 2, 3]);
  const [backgroundColor, setBackgroundColor] = useState([
    "rgba(75, 192, 192, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ]);
  const [borderColor, setBorderColor] = useState([
    "rgba(75, 192, 192, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ]);

  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Refs to store the Chart.js instance

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
          datasets: [
            {
              label: "Emisiones de CO2",
              data: data,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          animation: {
            duration: 1500,
            easing: "easeInOutQuad",
            onComplete: () => console.log("Animación completada"),
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Cleanup the chart on unmount
      }
    };
  }, []); // Empty dependency array to initialize once

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.data.datasets[0].data = data;
      chartInstance.current.data.datasets[0].backgroundColor = backgroundColor;
      chartInstance.current.data.datasets[0].borderColor = borderColor;
      chartInstance.current.update({
        duration: 1500,
        easing: "easeOutBounce",
      });
    }
  }, [data, backgroundColor, borderColor]); // Update chart when state changes

  const handleUpdateData = () => {
    const newData = [25, 15, 8, 12, 6, 9];
    const newBackgroundColor = [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)",
    ];
    const newBorderColor = [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
    ];

    setData(newData);
    setBackgroundColor(newBackgroundColor);
    setBorderColor(newBorderColor);
  };

  const handleMouseMove = (e) => {
    const title = document.getElementById("mainTitle");
    const titleRect = title.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distX = Math.abs(mouseX - (titleRect.left + titleRect.width / 2));
    const distY = Math.abs(mouseY - (titleRect.top + titleRect.height / 2));
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < 150) {
      title.style.opacity = 1;
      title.style.transform = "scale(1.2)";
    } else {
      title.style.opacity = 0.3;
      title.style.transform = "scale(1)";
    }
  };

  return (
    <div onMouseMove={handleMouseMove}>
      
      <div className="container text-center mt-5">
        <h1 className="display-3 title" id="mainTitle">
          ¡Hola!
        </h1>
        <p className="lead">Revisa el reporte de tus electrodomesticos.</p>
        <p className="lead">
          "Te ofrecemos una comparación con equipos amigables con el medio
          ambiente"
        </p>

        <div className="mt-4">
          <canvas ref={chartRef} width="400" height="200"></canvas>
        </div>

        <button onClick={handleUpdateData} className="btn btn-success w-100">
          Actualizar Datos
        </button>
      </div>
    </div>
  );
};

export default Home;
