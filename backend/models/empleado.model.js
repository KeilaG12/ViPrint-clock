module.exports = (sequelize, Sequelize) => {
  const Empleado = sequelize.define('empleado', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    puesto: {
      type: Sequelize.STRING
    },
    fechaIngreso: {
      type: Sequelize.DATEONLY
    },
    // El UID del RFID (único)
    rfidUID: {
      type: Sequelize.STRING,
      unique: true, // ¡Garantiza que no haya duplicados!
      allowNull: false
    }
  });
  return Empleado;
};