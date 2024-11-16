import { Model, DataTypes, Sequelize } from 'sequelize';

interface StockAttributes {
  id?: number;
  symbol: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
  class Stock extends Model<StockAttributes> implements StockAttributes {
    public id!: number;
    public symbol!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      Stock.belongsToMany(models.User, {
        through: 'UserStocks',
        foreignKey: 'stockId',
        otherKey: 'userId',
      });
    }
  }

  Stock.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Stock',
      tableName: 'stocks',
      timestamps: true,
    }
  );

  return Stock;
};
