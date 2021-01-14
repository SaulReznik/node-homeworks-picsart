const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const helpers = require('../helpers');
const accessTokenSecret =process.env.ACCESS_SECRET_TOKEN;

exports.signIn = async (req, res) => {
  try {

    // Getting username and password from request and getting users from db 
    const { username, password } = req.body;
    const users = await helpers.getUsers('./db.json');

    // Checking if the given credentials are matching with any user or not
    if (
      users[username] &&
      Buffer.from(users[username].password, 'base64').toString() === password
    ) {
      // Creating JWT token and sending back to user
      const accessToken = jwt.sign(
        {
          username: username
        },
        accessTokenSecret
      );

      res.json({
        accessToken
      });
    } else {
      return res.send('Username or password incorrect');
    }
  } catch (err) {
    console.log('Sign in error --->', err);
  }
};

exports.signUp = async (req, res) => {
  try {
    // Simple validation
    if (!req.body.password || req.body.password.length < 8) {
      return res.status(400).send('Please provide valid password');
    }

    if (!req.body.username || req.body.username.length < 3) {
      return res.status(400).send('Please provide valid username');
    }

    const users = await helpers.getUsers('./db.json');

    if (req.body.username in users) {
      return res
        .status(400)
        .send('User with the given username is already exists');
    }

    const cryptedPass = Buffer.from(req.body.password).toString('base64');

    const user = {
      ...req.body,
      id: crypto.randomBytes(16).toString('hex'),
      password: cryptedPass
    };

    await helpers.addUserToDB('./db.json', user);
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
};
