import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row, Spinner, Image } from "react-bootstrap";

const ApplianceDashboard = () => {
  const [appliances, setAppliances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAppliances();
  }, []);

  const fetchAppliances = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token no encontrado. Por favor, inicia sesión.");
        navigate("/");
        return;
      }

      const response = await fetch("http://localhost:5001/api/appliances", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los electrodomésticos.");
      }

      const data = await response.json();
      setAppliances(data);
    } catch (err) {
      console.error(err);
      setError("Hubo un error al obtener los electrodomésticos.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (appliance) => {
    navigate("/Form", { state: appliance });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5001/api/appliances/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el electrodoméstico.");
      }

      fetchAppliances();
    } catch (err) {
      console.error(err);
      setError("Hubo un error al eliminar el electrodoméstico.");
    }
  };

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <div>{error}</div>;

  return (
    <div className="container my-5">
      <h1 className="mb-4">Electrodomésticos</h1>
      <Button
        variant="primary"
        onClick={() => navigate("/create")}
        className="mb-3"
      >
        Crear Electrodoméstico
      </Button>
      <Row>
        {appliances.map((appliance) => (
          <Col md={4} sm={6} key={appliance.appliance_id} className="mb-4">
            <Card>
              {/* Mostrar la imagen si existe */}
              {appliance.image && (
                <Card.Img
                  variant="top"
                  src={`http://localhost:5001/${appliance.image}`} // Asegúrate de que la ruta sea correcta
                  alt={appliance.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <Card.Body>
                <Card.Title>{appliance.name}</Card.Title>
                <Card.Text>
                  <strong>Marca:</strong> {appliance.brand}
                  <br />
                  <strong>Modelo:</strong> {appliance.model}
                  <br />
                  <strong>Tipo:</strong> {appliance.type}
                  <br />
                  <strong>Calificación Energética:</strong>{" "}
                  {appliance.energy_rating}
                </Card.Text>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(appliance)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(appliance.appliance_id)}
                >
                  Eliminar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ApplianceDashboard;
