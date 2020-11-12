const fs = require('fs');
const util = require('util');

const getLatestVersion = require('./getLatestVersion');

const readdir = util.promisify(fs.readdir);

module.exports = async (currentVersion, migPath) => {
  const migrations = await readdir(migPath);
  const latestVersion = await getLatestVersion(migPath);
  const newMigrations = [];

  for (let i = currentVersion; i < latestVersion; i++) {
    newMigrations.push(migrations[i]);
  }

  return newMigrations;
};
