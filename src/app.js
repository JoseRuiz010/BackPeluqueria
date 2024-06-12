// app.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const Turno = require('./models/turnos');
const User = require('./models/user');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors())
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/peluqueria', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

// Endpoint para registrar un turno
app.get('/api/turnos', async (req, res) => {
  try {
      const turnos = await Turno.find();
      res.status(200).json(turnos);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener los turnos' });
  }
});
app.post('/api/turnos', async (req, res) => {
    const { fecha, hora } = req.body;

    const nuevoTurno = new Turno({
        fecha,
        hora
    });

    try {
        const turnoGuardado = await nuevoTurno.save();
        res.status(201).json(turnoGuardado);
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar el turno' });
    }
});

// Endpoint para reservar un turno
app.put('/api/turnos/reservar', async (req, res) => {
    const { fecha, hora, cliente, medioDePago } = req.body;

    try {
        const turno = await Turno.findOne({ fecha, hora });

        if (!turno) {
            return res.status(404).json({ error: 'Turno no encontrado' });
        }

        if (turno.reservado) {
            return res.status(400).json({ error: 'El turno ya está reservado' });
        }

        turno.cliente = cliente;
        turno.medioDePago = medioDePago;
        turno.reservado = true;

        await turno.save();
        res.status(200).json(turno);
    } catch (error) {
        res.status(500).json({ error: 'Error al reservar el turno' });
    }
});

// Endpoints de usuarios

// Crear un nuevo usuario
app.post('/api/users', async (req, res) => {
  const { nombre, email, password } = req.body;
  const newUser = new User({ nombre, email, password });

  try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
  } catch (error) {
      res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

// Obtener todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
      const users = await User.find();
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Obtener un usuario por ID
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const user = await User.findById(id);
      if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

// Actualizar un usuario por ID
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password } = req.body;

  try {
      const user = await User.findById(id);
      if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      user.nombre = nombre !== undefined ? nombre : user.nombre;
      user.email = email !== undefined ? email : user.email;
      if (password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
      }

      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
  } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

// Eliminar un usuario por ID
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});

//Endpoint de login
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      console.log({user,email})
      if (!user) {
          return res.status(401).json(null);
      } 
      const isMatch =  password== user.password?true:false;
      console.log({isMatch, passwordOld:password, passCifrada:user.password})
      // const isMatch = await user.comparePassword(password);
      
      if (!isMatch) {
          return res.status(401).json(null);
      }

      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ error: 'Error al autenticar el usuario' });
  }
});



app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
