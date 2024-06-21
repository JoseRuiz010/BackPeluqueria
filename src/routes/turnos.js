const express = require('express');
const { getTurnosHandler, createTurnoHandler, reservarTurnoHandler } = require('../controllers/turnosController');
const router = express.Router();

router.get('/', getTurnosHandler);
router.post('/', createTurnoHandler);
router.put('/reservar', reservarTurnoHandler);

module.exports = router;
