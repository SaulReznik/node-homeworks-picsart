const jwt = require('jsonwebtoken');
const { UserModel } = require('chat-mongo-models-picsart');

const config = require('../config');

module.exports = async ({ request, response }) => {
  try {
    const { username, password } = request.body;

    const user = await UserModel.findOne({
      username: username,
      password: Buffer.from(password).toString('base64')
    });

    if (user) {
      const accessToken = jwt.sign(
        {
          username: username
        },
        config.ACCESS_TOKEN_SECRET
      );

      response.body = {
        accessToken,
        user: {
          id: user._id,
          username: user.username
        }
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
