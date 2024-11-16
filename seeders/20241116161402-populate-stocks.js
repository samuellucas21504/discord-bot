import { get } from 'axios';

export async function up(queryInterface) {
  try {
    const baseUrl = process.env.STOCKS_BASE_URL;
    const response = await get(`${baseUrl}/available`);
    const tickers = response.data.stocks;

    const stocks = tickers.map(ticker => ({
      symbol: ticker,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('stocks', stocks);
  }
  catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw error;
  }
}
export async function down(queryInterface) {
  // Remove todos os registros inseridos (rollback do seeder)
  await queryInterface.bulkDelete('stocks', null, {});
}
