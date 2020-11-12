const fs = require('fs');
const util = require('util');

const readDir = util.promisify(fs.readdir);

module.exports = async migPath => {
  const migrationPaths = await readDir(migPath);
  const sortedPaths = await migrationPaths.sort();
  const lastMigration = await sortedPaths[sortedPaths.length - 1];

  return +lastMigration.match(/\d+/g)[0];
};
