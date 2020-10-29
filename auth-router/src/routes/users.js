const express = require('express');

const { getUser, updateUser } = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/user', getUser).put('/user', updateUser);

module.exports = usersRouter;
