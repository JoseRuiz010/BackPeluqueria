const mongoose = require('mongoose');

const TurnoSchema = new mongoose.Schema({
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
    medioDePago: { type: String, default: null },
    cliente: { type: String, default: null },
    reservado: { type: Boolean, default: false }
});

module.exports = mongoose.model('Turno', TurnoSchema);
