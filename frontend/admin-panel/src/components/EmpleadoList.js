import React, { useState, useEffect } from 'react';
import { getEmpleados, createEmpleado } from '../api/empleadoAPI';

function EmpleadoList() {
  const [empleados, setEmpleados] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', rfidUID: '', puesto: '' });

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    const response = await getEmpleados();
    setEmpleados(response.data);
  };

  const handleChange = (e) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEmpleado(nuevo);
    setNuevo({ nombre: '', rfidUID: '', puesto: '' });
    fetchEmpleados(); // Recargar la lista
  };

  return (
    <div>
      <h3>Registro de Nuevo Empleado</h3>
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario... */}
      </form>

      <h3>Lista de Empleados</h3>
      <ul>
        {empleados.map(emp => (
          <li key={emp.id}>{emp.nombre} ({emp.rfidUID}) - {emp.puesto}</li>
        ))}
      </ul>
    </div>
  );
}

export default EmpleadoList;