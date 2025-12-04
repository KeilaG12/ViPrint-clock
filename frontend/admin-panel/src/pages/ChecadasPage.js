// /frontend/admin-panel/src/pages/ChecadasPage.js
import React, { useState, useEffect } from 'react';
import { getChecadas } from '../api/checadaAPI';
import moment from 'moment';
import 'moment/locale/es'; // Para asegurar el idioma español en fechas

const ChecadasPage = () => {
  const [checadas, setChecadas] = useState([]);

  useEffect(() => {
    moment.locale('es'); // Establecer idioma español
    fetchChecadas();
  }, []);

  const fetchChecadas = async () => {
    try {
      const response = await getChecadas();
      setChecadas(response.data);
    } catch (error) {
      console.error('Error fetching checadas:', error);
    }
  };

  const getStyle = (incidencia) => {
    if (incidencia) {
      return { background: '#ffdddd', color: 'red', fontWeight: 'bold' };
    }
    if (incidencia === null) {
      return { background: '#ddffdd', color: 'green' };
    }
    return {};
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>⏱️ Historial de Checadas e Incidencias</h2>
      <button onClick={fetchChecadas} style={{ marginBottom: '15px' }}>
        Actualizar Lista
      </button>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Empleado</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Puesto</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Tipo</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Fecha y Hora</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Incidencia</th>
          </tr>
        </thead>
        <tbody>

        {checadas.map(ch => (
          <tr key={ch.id} style={getStyle(ch.incidencia)}>
            
            {/* 1. Usar comprobación condicional para 'nombre' */}
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              {ch.Empleado ? ch.Empleado.nombre : 'Empleado no encontrado'} 
            </td>
            
            {/* 2. Usar comprobación condicional para 'puesto' */}
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              {ch.Empleado ? ch.Empleado.puesto : 'N/A'}
            </td>
            
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{ch.tipo}</td>
            {/* ... resto de las columnas ... */}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChecadasPage;