const express = require('express');
const { createUserHandler, getUsersHandler, getUserByIdHandler, updateUserHandler, deleteUserHandler, loginUserHandler } = require('../controllers/usersController');
const router = express.Router();

router.post('/', createUserHandler);
router.get('/', getUsersHandler);
router.get('/:id', getUserByIdHandler);
router.put('/:id', updateUserHandler);
router.delete('/:id', deleteUserHandler);
router.post('/login', loginUserHandler);

module.exports = router;
