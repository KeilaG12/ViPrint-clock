const express = require('express');
const router = express.Router();
const checadaController = require('../controllers/checada.controller');

// [POST] /api/checadas -> Usado por el lector RFID para registrar una entrada/salida
router.post('/checadas', checadaController.registrarChecada);

// [GET] /api/checadas -> Usado por el panel de administración
router.get('/checadas', checadaController.obtenerChecadas);

module.exports = router;