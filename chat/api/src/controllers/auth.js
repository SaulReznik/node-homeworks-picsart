const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const config = require('../config');
const helpers = require('../helpers');

exports.signIn = async ({ request, response }) => {
  try {
    const { username, password } = request.body;
    const users = await helpers.getUsers('./db.json');

    if (
      users[username] &&
      Buffer.from(users[username].password, 'base64').toString() === password
    ) {
      const accessToken = jwt.sign(
        {
          username: username
        },
        config.ACCESS_TOKEN_SECRET
      );

      response.body = {
        accessToken
      };
    } else {
      response.status = 404;
      response.body = {
        msg: 'Username or password incorrect'
      };
      return;
    }
  } catch (err) {
    console.log('Sign in error --->', err);
  }
};

exports.signUp = async ({ request, response }) => {
  try {
    const users = await helpers.getUsers('./db.json');
    if (!request.body.password || request.body.password.length < 8) {
      response.status = 400;
      response.body = 'Please provide valid password';
    }

    if (!request.body.username || request.body.username.length < 3) {
      response.status = 400;
      response.body = 'Please provide valid username';
      return;
    }

    if (request.body.username in users) {
      response.status = 400;
      response.body = 'User with the given username is already exists';
      return;
    }

    const cryptedPass = Buffer.from(request.body.password).toString('base64');

    const user = {
      ...request.body,
      id: crypto.randomBytes(16).toString('hex'),
      password: cryptedPass
    };

    await helpers.addUserToDB('./db.json', user);
    response.status = 200;
    response.body = users;
    return;
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.body = err;
    return;
  }
};
