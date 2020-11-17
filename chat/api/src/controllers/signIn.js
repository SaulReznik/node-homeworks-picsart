const jwt = require('jsonwebtoken');

const config = require('../config');
const { getUsers } = require('../helpers');

module.exports = async ({ request, response }) => {
  try {
    const { username, password } = request.body;
    const users = await getUsers('./db.json');

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
