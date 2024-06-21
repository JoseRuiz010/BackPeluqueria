const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

const turnosRoutes = require('./routes/turnos');
const usersRoutes = require('./routes/users');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/peluqueria', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

app.use('/api/turnos', turnosRoutes);
app.use('/api/users', usersRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
