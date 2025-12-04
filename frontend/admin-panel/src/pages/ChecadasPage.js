import React, { useState, useEffect } from 'react';
import { getChecadas } from '../api/checadaAPI';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/es'; 

const ChecadasPage = () => {
  const [checadas, setChecadas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    moment.locale('es'); 
    fetchChecadas();
  }, []);

  const fetchChecadas = async () => {
    setLoading(true);
    try {
      const response = await getChecadas();
      setChecadas(response.data);
    } catch (error) {
      console.error('Error fetching checadas:', error);
    } finally {
      setLoading(false);
    }
  };

  const getVariant = (incidencia) => {
    if (incidencia) return 'table-danger'; // Fondo rojo para incidencias
    if (incidencia === null) return 'table-success'; // Fondo verde para puntual
    return ''; // Sin estilo si es neutro
  };

  if (loading) {
    return (
      <Container className="my-4">
        <Alert variant="info">Cargando historial de checadas...</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4">⏱️ Historial de Checadas e Incidencias</h2>
      <Button onClick={fetchChecadas} variant="info" className="mb-3">
        Actualizar Lista
      </Button>
      
      {checadas.length === 0 ? (
        <Alert variant="warning">No hay registros de checadas en la base de datos.</Alert>
      ) : (
        <Table striped bordered hover responsive size="sm" className="shadow-sm">
          <thead>
            <tr className="table-dark">
              <th>Empleado</th>
              <th>Puesto</th>
              <th>Tipo</th>
              <th>Fecha y Hora</th>
              <th>Incidencia</th>
            </tr>
          </thead>
          <tbody>
            {checadas.map(ch => (
              <tr key={ch.id} className={getVariant(ch.incidencia)}>
                
                {/* Solución al error 'undefined' con comprobación segura */}
                <td>{ch.Empleado ? ch.Empleado.nombre : 'Empleado no encontrado'}</td>
                <td>{ch.Empleado ? ch.Empleado.puesto : 'N/A'}</td>

                <td>
                  <span className={`badge ${ch.tipo === 'ENTRADA' ? 'bg-primary' : 'bg-secondary'}`}>
                    {ch.tipo}
                  </span>
                </td>
                <td>
                  {moment(ch.horaChecada).format('DD/MM/YYYY hh:mm:ss A')} 
                </td>
                <td>
                  {ch.incidencia || 'Puntual / Normal'}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ChecadasPage;