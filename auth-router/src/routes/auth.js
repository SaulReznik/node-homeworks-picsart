const fs = require('fs');
const crypto = require('crypto');

const express = require('express');

const { signIn, signUp } = require('../controllers/auth');

const authRouter = express.Router();

authRouter.post('/signin', signIn).post('/signup', signUp);

module.exports = authRouter;
