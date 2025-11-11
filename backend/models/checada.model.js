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
    horaChecada: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
    // empleadoId será añadido automáticamente por la relación
  });
  return Checada;
};