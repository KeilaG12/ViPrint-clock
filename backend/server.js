require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./models');
const app = express();

const PORT = process.env.PORT || 4000;

// Middleware de Seguridad y Logging
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json()); // Permite a Express leer JSON en el body

// Sincronizar la base de datos (crea las tablas si no existen)
// En producción, es mejor usar migraciones
db.sequelize.sync({ force: false }).then(() => {
  console.log('✅ Base de datos sincronizada.');
}).catch(err => {
  console.error('❌ Error al sincronizar la DB:', err.message);
});

// Rutas de la API
app.use('/api', require('./routes/empleado.routes'));
app.use('/api', require('./routes/checada.routes'));
// Agrega aquí otras rutas (Vacaciones, etc.)

// Ruta simple para probar
app.get('/', (req, res) => {
  res.send('API del Checador ViPrint funcionando.');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});