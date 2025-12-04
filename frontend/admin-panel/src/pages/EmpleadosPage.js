// /frontend/admin-panel/src/pages/EmpleadosPage.js
import React, { useState, useEffect } from 'react';
import { getEmpleados, createEmpleado, deleteEmpleado } from '../api/empleadoAPI';

const EmpleadosPage = () => {
  const [empleados, setEmpleados] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', puesto: '', rfidUID: '', fechaIngreso: '' });
  const [message, setMessage] = useState('');

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
    setMessage('');
    try {
      await createEmpleado(formData);
      setFormData({ nombre: '', puesto: '', rfidUID: '', fechaIngreso: '' });
      fetchEmpleados();
      setMessage('✅ Empleado registrado con éxito.');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error de conexión o UID duplicado.';
      setMessage(`❌ Error al registrar: ${errorMsg}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este empleado?')) {
      try {
        await deleteEmpleado(id);
        fetchEmpleados();
        setMessage('🗑️ Empleado eliminado.');
      } catch (error) {
        setMessage('❌ Error al eliminar el empleado.');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>👥 Gestión de Empleados</h2>
      <hr />
      {message && <p style={{ color: message.startsWith('❌') ? 'red' : 'green' }}>{message}</p>}

      {/* Formulario de Creación */}
      <h3>➕ Registrar Nuevo Empleado</h3>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxWidth: '600px', marginBottom: '30px' }}>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input type="text" name="puesto" value={formData.puesto} onChange={handleChange} placeholder="Puesto" />
        <input type="text" name="rfidUID" value={formData.rfidUID} onChange={handleChange} placeholder="RFID UID" required />
        <input type="date" name="fechaIngreso" value={formData.fechaIngreso} onChange={handleChange} placeholder="Fecha de Ingreso" />
        <button type="submit" style={{ gridColumn: 'span 2', padding: '10px' }}>Registrar</button>
      </form>

      {/* Lista de Empleados */}
      <h3>Lista ({empleados.length})</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nombre</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Puesto</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>RFID UID</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map(emp => (
            <tr key={emp.id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{emp.nombre}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{emp.puesto}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{emp.rfidUID}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                <button onClick={() => handleDelete(emp.id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px' }}>Eliminar</button>
                {/* Aquí puedes agregar un botón para "Editar" */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmpleadosPage;