// createUser.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models//user');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/peluqueria', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

const createUser = async (nombre, email, password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            nombre,
            email,
            password
        });

        const savedUser = await newUser.save();
        console.log('Usuario creado:', savedUser);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
    } finally {
        mongoose.disconnect();
    }
};

// Datos del usuario a crear
const nombre = 'admin';
const email = 'admin@admin.com';
const password = '1234';

createUser(nombre, email, password);
