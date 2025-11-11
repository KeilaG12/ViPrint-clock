const db = require('../models');
const Checada = db.Checada;
const Empleado = db.Empleado;
const { Op } = require('sequelize');

// Endpoint que recibirá el UID del lector RFID
exports.registrarChecada = async (req, res) => {
  const { rfidUID } = req.body; // El lector enviará el UID aquí

  if (!rfidUID) {
    return res.status(400).send({ message: 'UID de RFID requerido.' });
  }

  try {
    // 1. Encontrar el empleado
    const empleado = await Empleado.findOne({ where: { rfidUID: rfidUID } });

    if (!empleado) {
      return res.status(404).send({ message: `Empleado no encontrado con RFID UID: ${rfidUID}` });
    }

    // 2. Determinar si es ENTRADA o SALIDA
    const ultimaChecada = await Checada.findOne({
      where: { empleadoId: empleado.id },
      order: [['horaChecada', 'DESC']] // Última checada
    });

    let tipoChecada;
    
    // Si no hay última checada O la última fue una SALIDA, la nueva es ENTRADA
    if (!ultimaChecada || ultimaChecada.tipo === 'SALIDA') {
      tipoChecada = 'ENTRADA';
    } else {
      // Si la última fue una ENTRADA, la nueva es SALIDA
      tipoChecada = 'SALIDA';
    }

    // 3. Registrar la nueva checada
    const nuevaChecada = await Checada.create({
      empleadoId: empleado.id,
      tipo: tipoChecada,
      // horaChecada se establece automáticamente con Sequelize.NOW
    });

    // 4. Respuesta al lector
    res.status(201).send({
      message: `${tipoChecada} registrada con éxito.`,
      empleado: empleado.nombre,
      tipo: tipoChecada,
      hora: nuevaChecada.horaChecada
    });

  } catch (error) {
    res.status(500).send({
      message: 'Error al registrar la checada: ' + error.message,
    });
  }
};

// Controlador para administradores (obtener todas las checadas)
exports.obtenerChecadas = async (req, res) => {
  try {
    const checadas = await Checada.findAll({
      include: [{ model: Empleado, attributes: ['nombre', 'puesto'] }],
      order: [['horaChecada', 'DESC']]
    });
    res.send(checadas);
  } catch (error) {
    res.status(500).send({
      message: 'Error al obtener las checadas: ' + error.message,
    });
  }
};