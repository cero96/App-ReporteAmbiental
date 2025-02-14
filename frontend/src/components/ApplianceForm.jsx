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
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const editingAppliance = location.state;

  useEffect(() => {
    if (editingAppliance) {
      setForm(editingAppliance);
      setSuccessMessage(""); // Limpiar el mensaje de éxito al editar
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

    // Asegúrate de que los nombres de los campos coincidan con los esperados en el backend
    data.append("name", form.name);
    data.append("brand", form.brand);
    data.append("model", form.model);
    data.append("type", form.type);
    data.append("energy_rating", form.energy_rating);
    if (image) data.append("image", image);

    const method = editingAppliance ? "PUT" : "POST";
    const url = editingAppliance
      ? `http://localhost:5001/api/appliances/${form.appliance_id}`
      : "http://localhost:5001/api/appliances";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          setErrors(errorData.errors);
        } else {
          throw new Error(errorData.message || "Error desconocido");
        }
        return;
      }

      // Establecer el mensaje de éxito
      setSuccessMessage(
        editingAppliance
          ? "Electrodoméstico actualizado correctamente"
          : "Electrodoméstico creado correctamente"
      );

      // Reiniciar el formulario y limpiar los errores
      setForm({
        name: "",
        brand: "",
        model: "",
        type: "",
        energy_rating: "",
      });
      setImage(null);
      setErrors({});

      // Limpiar el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error(err);
      alert(`Hubo un error al guardar el electrodoméstico: ${err.message}`);
    }
  };

  return (
    <Container>
      <h1 className="my-4">
        {editingAppliance ? "Actualizar" : "Crear"} Electrodoméstico
      </h1>
      {successMessage && ( // Mostrar mensaje de éxito si existe
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
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
              {errors.name && <div className="text-danger">{errors.name}</div>}
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
              {errors.brand && (
                <div className="text-danger">{errors.brand}</div>
              )}
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
              {errors.model && (
                <div className="text-danger">{errors.model}</div>
              )}
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
              {errors.type && <div className="text-danger">{errors.type}</div>}
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Calificación Energética</Form.Label>
              <Form.Control
                type="number"
                name="energy_rating"
                value={form.energy_rating}
                onChange={handleInputChange}
                required
              />
              {errors.energy_rating && (
                <div className="text-danger">{errors.energy_rating}</div>
              )}
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
