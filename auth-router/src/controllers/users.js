const helpers = require('../helpers');

exports.getUser = async (req, res, next) => {
  try {
    const users = await helpers.getUsers('./db.json');
    console.log(users[req.body.username]);
    return res.status(200).send(users[req.body.username]);
  } catch (err) {
    console.log('Get User Error');
  }
};

exports.updateUser = async (req, res) => {
  try {
    const users = await helpers.getUsers('./db.json');

    if (req.body.username in users) {
      delete users[req.body.username];

      users[req.body.username] = req.body;
      await helpers.addUserToDB('./db.json', user);
      return res.status(200).send(users[req.body.username]);
    }
    return res.status(400).send('User with the given username is not found');
  } catch (err) {
    console.log('Get User Error ---->', err);
  }
};
