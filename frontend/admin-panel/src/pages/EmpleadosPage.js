import React, { useState, useEffect } from 'react';
import { getEmpleados, createEmpleado, deleteEmpleado } from '../api/empleadoAPI';
import { Container, Form, Button, Table, Alert, Card, Row, Col } from 'react-bootstrap';

const EmpleadosPage = () => {
  const [empleados, setEmpleados] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', puesto: '', rfidUID: '', fechaIngreso: '' });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await getEmpleados();
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error fetching empleados:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      await createEmpleado(formData);
      setFormData({ nombre: '', puesto: '', rfidUID: '', fechaIngreso: '' });
      fetchEmpleados();
      setMessage({ type: 'success', text: '✅ Empleado registrado con éxito.' });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error de conexión o UID duplicado.';
      setMessage({ type: 'danger', text: `❌ Error al registrar: ${errorMsg}` });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este empleado? Esta acción no se puede deshacer.')) {
      try {
        await deleteEmpleado(id);
        fetchEmpleados();
        setMessage({ type: 'warning', text: '🗑️ Empleado eliminado.' });
      } catch (error) {
        setMessage({ type: 'danger', text: '❌ Error al eliminar el empleado.' });
      }
    }
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4">👥 Gestión de Empleados</h2>
      <hr />

      {message && <Alert variant={message.type}>{message.text}</Alert>}

      {/* Formulario de Creación */}
      <Card className="mb-4 shadow-sm">
        <Card.Header as="h5">➕ Registrar Nuevo Empleado</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Puesto</Form.Label>
                <Form.Control type="text" name="puesto" value={formData.puesto} onChange={handleChange} />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>RFID UID</Form.Label>
                <Form.Control type="text" name="rfidUID" value={formData.rfidUID} onChange={handleChange} required />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Fecha de Ingreso</Form.Label>
                <Form.Control type="date" name="fechaIngreso" value={formData.fechaIngreso} onChange={handleChange} />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit" className="w-100">
              Registrar Empleado
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Lista de Empleados */}
      <Card className="shadow-sm">
        <Card.Header as="h5">Lista de Empleados ({empleados.length})</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Puesto</th>
                <th>Fecha Ingreso</th>
                <th>RFID UID</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.nombre}</td>
                  <td>{emp.puesto}</td>
                  <td>{emp.fechaIngreso}</td>
                  <td>{emp.rfidUID}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(emp.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmpleadosPage;