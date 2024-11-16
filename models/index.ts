import { basename as _basename } from 'path';
import { Sequelize } from 'sequelize';
import { env as _env } from 'process';

export class Database {
  private static _sequelize: Sequelize;
  public static db: { [key: string]: any; sequelize?: Sequelize; Sequelize?: typeof Sequelize } = {};

  public static getSequelize = async () => {
    if (this._sequelize) {
      return this._sequelize;
    }

    this._sequelize = await this.init();

    this.db.sequelize = this._sequelize;
    this.db.Sequelize = Sequelize;

    return this._sequelize;
  }

  private static init = async () => {
    const env = _env.NODE_ENV || 'development';
    const imported = await import('../config/config.js') as any;
    const config = imported['default'][env];

    let sequelize = null;

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

    return sequelize;
  }
}
