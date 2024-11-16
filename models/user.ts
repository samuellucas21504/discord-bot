import { Model, DataTypes, Sequelize } from 'sequelize';
import { Database } from '@models/index.js';

const sequelize = await Database.getSequelize();

interface UserAttributes {
  id?: number;
  userId: string;
  displayName?: string;
  globalName?: string;
  subscriptionChannel?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public userId!: string;
  public displayName?: string;
  public globalName?: string;
  public subscriptionChannel?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'user_id',
    },
    displayName: {
      type: DataTypes.STRING,
      field: 'display_name',
    },
    globalName: {
      type: DataTypes.STRING,
      field: 'global_name',
    },
    subscriptionChannel: {
      type: DataTypes.STRING,
      field: 'subscription_channel',
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);
