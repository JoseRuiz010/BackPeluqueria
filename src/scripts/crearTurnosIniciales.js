// scripts/crearTurnosIniciales.js
const mongoose = require('mongoose');
const Turno = require('../models/turnos');

mongoose.connect('mongodb://localhost:27017/peluqueria', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const turnosIniciales = [
            { fecha: '2024-06-12', hora: '10:00' },
            { fecha: '2024-06-13', hora: '11:00' },
            { fecha: '2024-06-14', hora: '12:00' },
            { fecha: '2024-06-15', hora: '13:00' },
            { fecha: '2024-06-16', hora: '14:00' },
            { fecha: '2024-06-17', hora: '15:00' },
            { fecha: '2024-06-18', hora: '16:00' },
            { fecha: '2024-06-19', hora: '17:00' },
            { fecha: '2024-06-20', hora: '18:00' },
        ];

        await Turno.insertMany(turnosIniciales);
        console.log('Turnos iniciales creados');
        mongoose.disconnect();
    })
    .catch(err => {
        console.error('Error:', err);
    });
