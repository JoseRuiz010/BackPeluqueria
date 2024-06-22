const { getTurnos, createTurno, reservarTurno,cancelarReserva } = require('../services/turnosService');

const getTurnosHandler = async (req, res) => {
    try {
        const turnos = await getTurnos();
        res.status(200).json(turnos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTurnoHandler = async (req, res) => {
    try {
        const turnoGuardado = await createTurno(req.body);
        res.status(201).json(turnoGuardado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const reservarTurnoHandler = async (req, res) => {
    try {
        const turnoReservado = await reservarTurno(req.body);
        res.status(200).json(turnoReservado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const cancelarTurnoHandler = async (req, res) => {
    try {
        const cancelarRe  = await cancelarReserva(req.body);
        res.status(200).json(cancelarRe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getTurnosHandler, createTurnoHandler, reservarTurnoHandler,cancelarTurnoHandler };
