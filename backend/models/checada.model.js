module.exports = (sequelize, Sequelize) => {
  const Checada = sequelize.define('checada', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // 'ENTRADA' o 'SALIDA'
    tipo: {
      type: Sequelize.ENUM('ENTRADA', 'SALIDA'),
      allowNull: false
    },
    // Campo para registrar la incidencia (ej: "¡RETARDO!")
    incidencia: {
      type: Sequelize.STRING,
      allowNull: true // Puede ser nulo si no hay incidencia
    },
    horaChecada: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
    // empleadoId será añadido automáticamente por la relación
  });
  return Checada;
};