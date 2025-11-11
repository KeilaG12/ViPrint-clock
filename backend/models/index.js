const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

// Conexión a la base de datos
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  pool: dbConfig.pool
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar y definir los modelos
db.Empleado = require('./empleado.model.js')(sequelize, Sequelize);
db.Checada = require('./checada.model.js')(sequelize, Sequelize);

// Definir relaciones
// Un Empleado tiene muchas Checadas
db.Empleado.hasMany(db.Checada, { foreignKey: 'empleadoId' });
db.Checada.belongsTo(db.Empleado, { foreignKey: 'empleadoId' });

module.exports = db;