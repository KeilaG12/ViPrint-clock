const express = require('express');
const router = express.Router();
const empleados = require('../controllers/empleado.controller');

// Todas las rutas inician con /api, ya que así se definió en server.js

// 1. Crear un nuevo Empleado (POST)
// Usado por el administrador para registrar un nuevo usuario y su RFID
router.post('/empleados', empleados.create);

// 2. Obtener todos los Empleados (GET)
// Usado por el administrador para ver la lista completa
router.get('/empleados', empleados.findAll);

// 3. Obtener un Empleado por ID (GET)
// Usado para ver detalles de un empleado
router.get('/empleados/:id', empleados.findOne);

// 4. Actualizar un Empleado por ID (PUT)
// Usado para modificar datos (puesto, nombre, o reasignar un RFID)
router.put('/empleados/:id', empleados.update);

// 5. Eliminar un Empleado por ID (DELETE)
// Usado para dar de baja a un empleado
router.delete('/empleados/:id', empleados.delete);

module.exports = router;