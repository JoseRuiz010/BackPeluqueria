const { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser } = require('../services/usersService');

const createUserHandler = async (req, res) => {
    try {
        const savedUser = await createUser(req.body);
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUsersHandler = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserByIdHandler = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserHandler = async (req, res) => {
    try {
        const updatedUser = await updateUser(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUserHandler = async (req, res) => {
    try {
        const user = await deleteUser(req.params.id);
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUserHandler = async (req, res) => {
    try {
        const user = await loginUser(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { createUserHandler, getUsersHandler, getUserByIdHandler, updateUserHandler, deleteUserHandler, loginUserHandler };
