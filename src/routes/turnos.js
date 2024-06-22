const express = require('express');
const { getTurnosHandler, createTurnoHandler, reservarTurnoHandler,cancelarTurnoHandler } = require('../controllers/turnosController');
const router = express.Router();

router.get('/', getTurnosHandler);
router.post('/', createTurnoHandler);
router.put('/reservar', reservarTurnoHandler);
router.post('/cancelar', cancelarTurnoHandler);

module.exports = router;
