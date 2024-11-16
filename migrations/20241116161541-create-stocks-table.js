'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('stocks', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    symbol: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });

  await queryInterface.addIndex('stocks', ['symbol'], {
    name: 'symbol_index',
    unique: false,
  });
}
export async function down(queryInterface) {
  await queryInterface.removeIndex('stocks', 'symbol_index');

  await queryInterface.dropTable('stocks');
};
