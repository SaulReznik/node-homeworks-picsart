const fs = require('fs');
const util = require('util');

const Sequelize = require('sequelize');

const { db, user, password } = require('./config');
const { getLatestVersion, getNewMigrations } = require('./models');

const readFile = util.promisify(fs.readFile);

const connection = new Sequelize(db, user, password, { dialect: 'postgres' });
const migPath = `${__dirname}/mig`;

(async () => {
  try {
    const version = await getLatestVersion(migPath);
    const newMigrations = await getNewMigrations(version, migPath);

    if (newMigrations.length) {
      for (let i = 0; i < newMigrations.length; i++) {
        const sqlText = await readFile(`${migPath}/${newMigrations[i]}`);

        await connection.query(`${sqlText}`);
      }
    } else {
      console.log('DB is up to date');
    }
  } catch (err) {
    console.log('Error in migration', err);
  }
})();
