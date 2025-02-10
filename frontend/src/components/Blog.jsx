import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de que Bootstrap está importado correctamente

// Datos de ejemplo (puedes reemplazarlos por datos reales o API)
const historiasUsuarios = [
  {
    id: 1,
    titulo: 'Mi experiencia con la agroecología',
    contenido:
      'La agroecología me ha permitido cultivar mis propios alimentos de manera sostenible, cuidando el medio ambiente y mejorando mi calidad de vida.',
    autor: 'Juan Pérez',
  },
  {
    id: 2,
    titulo: 'Transformación en la finca',
    contenido:
      'Implementar prácticas agroecológicas en mi finca ha sido un cambio positivo, tanto en el rendimiento de los cultivos como en la salud de mi familia.',
    autor: 'María Gómez',
  },
];

const perfilesProductores = [
  {
    id: 1,
    nombre: 'Carlos Méndez',
    especialidad: 'Cultivo de hortalizas orgánicas',
    descripcion:
      'Carlos produce hortalizas orgánicas con prácticas agroecológicas, respetando los ciclos naturales de los cultivos.',
  },
  {
    id: 2,
    nombre: 'Ana Rodríguez',
    especialidad: 'Frutales y hierbas aromáticas',
    descripcion:
      'Ana es una productora agroecológica que cultiva frutas y hierbas aromáticas sin el uso de pesticidas, garantizando productos saludables y sostenibles.',
  },
];

const Blog = () => {
  return (
    <Container>
      <h1 className="text-center my-4">Blog sobre Agroecología</h1>

      {/* Sección 1: Historias de Usuarios */}
      <section className="my-5">
        <h2 className="text-center mb-4">Historias de Usuarios</h2>
        <Row>
          {historiasUsuarios.map((historia) => (
            <Col key={historia.id} md={6} lg={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{historia.titulo}</Card.Title>
                  <Card.Text>{historia.contenido}</Card.Text>
                  <footer className="blockquote-footer">{historia.autor}</footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Sección 2: Cómo funciona la Agroecología */}
      <section className="my-5">
        <h2 className="text-center mb-4">¿Cómo funciona la Agroecología?</h2>
        <Row>
          <Col md={12}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Text>
                  La agroecología es un enfoque sostenible de la agricultura que se basa en la integración de principios ecológicos en la producción de alimentos. Se enfoca en la preservación de la biodiversidad, el uso responsable de los recursos naturales y el fortalecimiento de las comunidades locales. Al aplicar prácticas agroecológicas, los productores pueden mejorar el rendimiento de sus cultivos, reducir el uso de productos químicos y contribuir a la conservación del medio ambiente.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Sección 3: Perfiles de Productores */}
      <section className="my-5">
        <h2 className="text-center mb-4">Perfiles de Productores</h2>
        <Row>
          {perfilesProductores.map((productor) => (
            <Col key={productor.id} md={6} lg={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{productor.nombre}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{productor.especialidad}</Card.Subtitle>
                  <Card.Text>{productor.descripcion}</Card.Text>
                  <Button variant="primary">Ver más</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default Blog;
