const crypto = require('crypto');
const { UserModel } = require('chat-mongo-models-picsart');

module.exports = async ({ request, response }) => {
  try {
    if (!request.body.password || request.body.password.length < 8) {
      response.status = 400;
      response.body = 'Please provide valid password';
    }

    if (!request.body.username || request.body.username.length < 3) {
      response.status = 400;
      response.body = 'Please provide valid username';
      return;
    }

    const cryptedPass = Buffer.from(request.body.password).toString('base64');

    const User = new UserModel({
      ...request.body,
      id: crypto.randomBytes(16).toString('hex'),
      password: cryptedPass
    });

    const savedUser = await User.save();

    response.status = 200;
    response.body = savedUser;
    return;
  } catch (err) {
    response.status = 500;
    response.body = err;
    return;
  }
};
