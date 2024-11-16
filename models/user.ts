import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserAttributes {
  id?: number;
  userId: string;
  displayName?: string;
  globalName?: string;
  subscribedAt?: Date;
  subscriptionChannel?: string;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public userId!: string;
    public displayName!: string;
    public globalName!: string;
    public subscribedAt!: Date;
    public subscriptionChannel!: string;
    public deletedAt!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      User.belongsToMany(models.Stock, {
        through: 'UserStocks',
        foreignKey: 'userId',
        otherKey: 'stockId',
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.STRING,
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
      subscribedAt: {
        type: DataTypes.DATE,
        field: 'subscribed_at',
      },
      subscriptionChannel: {
        type: DataTypes.STRING,
        field: 'subscription_channel',
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  return User;
};
