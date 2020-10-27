const fs = require('fs');
const util = require('util');

//Promisifying necessary async functions
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

exports.getUsers = async path => {
  try {
    return JSON.parse(await readFile(path, 'utf8'));
  } catch (err) {
    console.log('Get Users Error --->', err);
  }
};

exports.addUserToDB = async (dbPath, user) => {
  try {
    const users = await exports.getUsers(dbPath);
    users[user.username] = user;
    const jsoned = JSON.stringify(users);

    await writeFile(dbPath, jsoned);
  } catch (err) {
    console.log('Add User To DB Error --->', err);
  }
};
