const db = require('../models');
const Empleado = db.Empleado;
const { Op } = require('sequelize');

// Crear y guardar un nuevo Empleado
exports.create = async (req, res) => {
  // Validar la petición
  if (!req.body.nombre || !req.body.rfidUID) {
    return res.status(400).send({
      message: 'El nombre y el UID de RFID son campos obligatorios.'
    });
  }

  // Crear un objeto Empleado
  const empleado = {
    nombre: req.body.nombre,
    puesto: req.body.puesto,
    fechaIngreso: req.body.fechaIngreso,
    rfidUID: req.body.rfidUID.toUpperCase() // Se recomienda guardar el UID en mayúsculas
  };

  try {
    // Guardar Empleado en la base de datos
    const data = await Empleado.create(empleado);
    res.status(201).send(data);
  } catch (error) {
    // Manejar errores, especialmente si el rfidUID ya existe (violación de 'unique: true')
    let statusCode = 500;
    let message = 'Error al crear el Empleado.';
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      statusCode = 409; // Conflicto
      message = 'Error: El UID de RFID proporcionado ya está asignado a otro empleado.';
    }

    res.status(statusCode).send({
      message: message + (process.env.NODE_ENV !== 'production' ? ` - Detalle: ${error.message}` : '')
    });
  }
};

// Obtener todos los Empleados (Lista para el Administrador)
exports.findAll = async (req, res) => {
  try {
    const data = await Empleado.findAll({ 
        order: [['nombre', 'ASC']] // Ordenar por nombre alfabéticamente
    });
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: 'Error al recuperar los empleados: ' + error.message
    });
  }
};

// Obtener un solo Empleado por ID
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Empleado.findByPk(id);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `No se encontró Empleado con id=${id}.`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Error al recuperar Empleado con id=' + id
    });
  }
};

// Actualizar un Empleado por ID
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const [num] = await Empleado.update(req.body, {
      where: { id: id }
    });

    if (num === 1) {
      res.send({
        message: 'Empleado actualizado correctamente.'
      });
    } else {
      res.status(404).send({
        message: `No se puede actualizar el Empleado con id=${id}. Es posible que no se haya encontrado.`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Error al actualizar Empleado con id=' + id + ': ' + error.message
    });
  }
};

// Eliminar un Empleado por ID
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Empleado.destroy({
      where: { id: id }
    });

    if (num === 1) {
      res.send({
        message: 'Empleado eliminado correctamente.'
      });
    } else {
      res.status(404).send({
        message: `No se puede eliminar el Empleado con id=${id}. Es posible que no se haya encontrado.`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'No se pudo eliminar el Empleado con id=' + id + ': ' + error.message
    });
  }
};