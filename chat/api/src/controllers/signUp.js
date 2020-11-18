const crypto = require('crypto');
const { UserModel } = require('@saulreznik/chat-mongo-models');

const { getUsers, addUserToDB } = require('../helpers');

module.exports = async ({ request, response }) => {
  try {
    //const users = await getUsers('./db.json');
    if (!request.body.password || request.body.password.length < 8) {
      response.status = 400;
      response.body = 'Please provide valid password';
    }

    if (!request.body.username || request.body.username.length < 3) {
      response.status = 400;
      response.body = 'Please provide valid username';
      return;
    }

    // if (request.body.username in users) {
    //   response.status = 400;
    //   response.body = 'User with the given username is already exists';
    //   return;
    // }

    const cryptedPass = Buffer.from(request.body.password).toString('base64');

    const User = new UserModel({
      ...request.body,
      id: crypto.randomBytes(16).toString('hex'),
      password: cryptedPass
    });

    const savedUser = await User.save();
    //await addUserToDB('./db.json', user);
    response.status = 200;
    response.body = savedUser;
    return;
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.body = err;
    return;
  }
};
