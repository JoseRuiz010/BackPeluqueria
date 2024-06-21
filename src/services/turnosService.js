const Turno = require('../models/turnos');

const getTurnos = async () => {
    try {
        return await Turno.find();
    } catch (error) {
        throw new Error('Error al obtener los turnos');
    }
};

const createTurno = async (data) => {
    const { fecha, hora } = data;
    const nuevoTurno = new Turno({ fecha, hora });

    try {
        return await nuevoTurno.save();
    } catch (error) {
        throw new Error('Error al guardar el turno');
    }
};

const reservarTurno = async (data) => {
    const { fecha, hora, cliente, medioDePago } = data;

    try {
        const turno = await Turno.findOne({ fecha, hora });

        if (!turno) {
            throw new Error('Turno no encontrado');
        }

        if (turno.reservado) {
            throw new Error('El turno ya está reservado');
        }

        turno.cliente = cliente;
        turno.medioDePago = medioDePago;
        turno.reservado = true;

        return await turno.save();
    } catch (error) {
        throw new Error('Error al reservar el turno');
    }
};

module.exports = { getTurnos, createTurno, reservarTurno };
