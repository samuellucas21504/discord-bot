'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('stock_market_data', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    stock_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'stocks',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    long_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    symbol: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    regular_market_price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    regular_market_time: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  });

  await queryInterface.addIndex('stock_market_data', ['symbol']);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('stock_market_data');
}
