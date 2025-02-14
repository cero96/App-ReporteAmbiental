import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";


const ApplianceForm = () => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    model: "",
    type: "",
    energy_rating: "",
  });
  const [image, setImage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const editingAppliance = location.state;

  useEffect(() => {
    if (editingAppliance) {
      setForm(editingAppliance);
    }
  }, [editingAppliance]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = new FormData();

    data.append("name", form.name);
    data.append("brand", form.brand);
    data.append("model", form.model);
    data.append("type", form.type);
    data.append("energy_rating", form.energy_rating);
    if (image) data.append("image", image);

    const method = editingAppliance ? "PUT" : "POST";
    const url = editingAppliance
      ? `http://localhost:5000/api/appliances/${form.appliance_id}`
      : "http://localhost:5000/api/appliances";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      // Si la respuesta no es OK, lanza un error con el mensaje de la respuesta
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error desconocido");
      }

      navigate("/"); // Redirigir a la página principal después de guardar
    } catch (err) {
      console.error(err);
      alert(`Hubo un error al guardar el electrodoméstico: ${err.message}`);
    }
  };

  return (
    <Container>
      <h1 className="my-4">{editingAppliance ? "Actualizar" : "Crear"} Electrodoméstico</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={form.model}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={form.type}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Calificación Energética</Form.Label>
              <Form.Control
                type="text"
                name="energy_rating"
                value={form.energy_rating}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="mt-3">
          {editingAppliance ? "Actualizar" : "Crear"}
        </Button>
      </Form>
    </Container>
  );
};

export default ApplianceForm;
