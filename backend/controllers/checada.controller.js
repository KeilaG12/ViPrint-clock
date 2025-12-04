const db = require('../models');
const Checada = db.Checada;
const Empleado = db.Empleado;
const moment = require('moment'); // Necesario para gestionar fechas y horas fácilmente

// --- Horarios de Control ---
const HORA_ENTRADA_LIMITE = 10; // 10:00 AM
const HORA_SALIDA_LUN_VIE = 18; // 6:00 PM (18:00)
const HORA_SALIDA_SABADO = 14; // 2:00 PM (14:00)
// ---

// Endpoint que recibirá el UID del lector RFID para registrar la checada
exports.registrarChecada = async (req, res) => {
  const { rfidUID } = req.body; 

  if (!rfidUID) {
    return res.status(400).send({ message: 'UID de RFID requerido.' });
  }

  try {
    // 1. Encontrar el empleado
    const empleado = await Empleado.findOne({ where: { rfidUID: rfidUID } });

    if (!empleado) {
      return res.status(404).send({ message: `Empleado no encontrado con RFID UID: ${rfidUID}` });
    }

    // 2. Preparar datos de tiempo
    // Usamos moment para el tiempo actual. Los días de la semana van de 0 (Domingo) a 6 (Sábado).
    const now = moment();
    const diaSemana = now.day();
    const horaActual = now.hour();
    const minutosActuales = now.minute();
    const horaFormateada = `${horaActual}:${minutosActuales < 10 ? '0' : ''}${minutosActuales}`;

    // 3. Determinar el tipo de checada (ENTRADA/SALIDA)
    const ultimaChecada = await Checada.findOne({
      where: { empleadoId: empleado.id },
      order: [['horaChecada', 'DESC']] // Obtiene la última acción
    });

    let tipoChecada;
    let incidenciaMensaje = null; // Inicializamos a nulo

    // Si no hay última checada O la última fue una SALIDA, la nueva es ENTRADA
    if (!ultimaChecada || ultimaChecada.tipo === 'SALIDA') {
      tipoChecada = 'ENTRADA';
      
      // *** VALIDACIÓN DE RETARDO (LUNES a SÁBADO) ***
      // Dia >= 1 (Lunes) y Dia <= 6 (Sábado)
      if (diaSemana >= 1 && diaSemana <= 6 && horaActual >= HORA_ENTRADA_LIMITE) {
        incidenciaMensaje = `RETARDO: Entró después de las ${HORA_ENTRADA_LIMITE}:00. Checada a las ${horaFormateada}`;
      }

    } else {
      tipoChecada = 'SALIDA';
      
      // *** VALIDACIÓN DE SALIDA ANTICIPADA (LUNES a VIERNES) ***
      // Día >= 1 (Lunes) y Día <= 5 (Viernes)
      if (diaSemana >= 1 && diaSemana <= 5 && horaActual < HORA_SALIDA_LUN_VIE) {
        incidenciaMensaje = `SALIDA ANTICIPADA: Salió antes de las ${HORA_SALIDA_LUN_VIE}:00. Checada a las ${horaFormateada}`;
      }
      
      // *** VALIDACIÓN DE SALIDA ANTICIPADA (SÁBADO) ***
      // Día = 6 (Sábado)
      else if (diaSemana === 6 && horaActual < HORA_SALIDA_SABADO) {
        incidenciaMensaje = `SALIDA ANTICIPADA SÁBADO: Salió antes de las ${HORA_SALIDA_SABADO}:00. Checada a las ${horaFormateada}`;
      }
    }

    // 4. Registrar la nueva checada, incluyendo la incidencia si existe
    const nuevaChecada = await Checada.create({
      empleadoId: empleado.id,
      tipo: tipoChecada,
      incidencia: incidenciaMensaje, // Guardamos el mensaje en la base de datos
    });

    // 5. Respuesta
    res.status(201).send({
      message: `${tipoChecada} registrada con éxito.`,
      empleado: empleado.nombre,
      tipo: tipoChecada,
      incidencia: incidenciaMensaje || 'Ninguna', // Devolvemos el mensaje o "Ninguna"
      hora: nuevaChecada.horaChecada
    });

  } catch (error) {
    res.status(500).send({
      message: 'Error al registrar la checada: ' + error.message,
    });
  }
};

// En /backend/controllers/checada.controller.js
exports.obtenerChecadas = async (req, res) => {
  try {
    const checadas = await Checada.findAll({
      // ESTA PARTE ES FUNDAMENTAL
      include: [{ 
        model: Empleado, 
        attributes: ['nombre', 'puesto'] 
      }],
      // -----------------------------
      order: [['horaChecada', 'DESC']]
    });
    res.send(checadas);
  } catch (error) {
    res.status(500).send({
      message: 'Error al obtener las checadas: ' + error.message,
    });
  }
};