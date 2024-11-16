import { Model, DataTypes } from 'sequelize';
import { Database } from '@models/index.js';

const sequelize = await Database.getSequelize();

interface UserAttributes {
  id?: number;
  userId: string;
  displayName?: string;
  tag?: string;
  subscribedOn?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<UserAttributes> { }

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
    tag: {
      type: DataTypes.STRING,
      field: 'tag',
    },
    subscribedOn: {
      type: DataTypes.STRING,
      field: 'subscribed_on',
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
);
