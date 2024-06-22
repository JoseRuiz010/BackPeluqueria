const User = require('../models/user');
const bcrypt = require('bcrypt');

const createUser = async (data) => {
    const { nombre, email, password } = data;
    const newUser = new User({ nombre, email, password });

    try {
        return await newUser.save();
    } catch (error) {
        throw new Error('Error al crear el usuario');
    }
};

const getUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw new Error('Error al obtener los usuarios');
    }
};

const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    } catch (error) {
        throw new Error('Error al obtener el usuario');
    }
};

const updateUser = async (id, data) => {
    const { nombre, email, password } = data;

    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        user.nombre = nombre !== undefined ? nombre : user.nombre;
        user.email = email !== undefined ? email : user.email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        return await user.save();
    } catch (error) {
        throw new Error('Error al actualizar el usuario');
    }
};

const deleteUser = async (id) => {
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    } catch (error) {
        throw new Error('Error al eliminar el usuario');
    }
};

const loginUser = async (data) => {
    const { email, password } = data;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const isMatch = password === user.password;
        if (!isMatch) {
            throw new Error('Credenciales inválidas');
        }

        return user;
    } catch (error) {
        throw new Error('Error al autenticar el usuario');
    }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser };
