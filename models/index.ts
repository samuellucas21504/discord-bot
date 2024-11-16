import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { env as _env } from 'process';

const basename = _basename(__filename);
const env = _env.NODE_ENV || 'development';
const config = require('../config/config.ts')[env];
const db: { [key: string]: any; sequelize?: Sequelize; Sequelize?: typeof Sequelize } = {};

let sequelize: Sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(_env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(
    config.database as string,
    config.username as string,
    config.password as string,
    config
  );
}

readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' && // Alterado para carregar arquivos TypeScript
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach((file) => {
    const model = require(join(__dirname, file)).default(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
