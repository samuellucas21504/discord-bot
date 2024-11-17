import { ApiService } from '@services/api-service.js';
import { User as DiscordUser } from 'discord.js';
import { AxiosRequestHeaders } from "axios";
import { UserNotFoundError, UserService } from './user-service.js';
import { BaseError } from '@base/baseError.js';
import stock from '@models/stock.js';
import StockMarketData from '@models/stockMarketData.js';
import Stock from '@models/stock.js';
import { Op } from 'sequelize';

export class StockNotFoundError extends BaseError {
  constructor(ticker: string) {
    super(`Ação ${ticker} não encontrada!`);
    this.name = 'Ação não existe';
  }
}

export interface IApi {
  headers?: AxiosRequestHeaders;
}

export class StockService extends ApiService {
  private _userService: UserService;

  constructor({ headers }: IApi = {}) {
    super({
      baseURL: process.env.STOCKS_BASE_URL!,
      token: process.env.STOCKS_TOKEN,
      headers: headers,
    });

    this._userService = new UserService();
  };

  public async find(ticker: string) {
    return await stock.findOne({
      where: {
        symbol: ticker
      }
    });
  }

  public async addToUser(user: DiscordUser, ticker: string) {
    const userOnDb = await this._userService.find(user);
    if (userOnDb == null) {
      throw new UserNotFoundError();
    }

    const stock = await this.find(ticker);
    if (stock == null) {
      throw new StockNotFoundError(ticker);
    }

    await userOnDb.addStock(stock);
  }

  public async removeOfUser(user: DiscordUser, ticker: string) {
    const userOnDb = await this._userService.find(user);
    if (userOnDb == null) {
      throw new UserNotFoundError();
    }

    const stock = await this.find(ticker);
    if (stock == null) {
      throw new StockNotFoundError(ticker);
    }

    await userOnDb.removeStock(stock);
  }

  public async getStocks(user: DiscordUser): Promise<(StockMarketData | null)[]> {
    if (this.todayIsWeekend()) {
      return [];
    }

    const userOnDb = await this._userService.find(user);
    if (userOnDb == null) {
      throw new UserNotFoundError();
    }

    const params = {
      range: '1d',
      interval: '1d',
    };

    const stocks = await userOnDb.getStocks();

    const stockPrices = await Promise.all(
      stocks.map(async (stock) => {
        const stockMarketData = await this.findCachedStockMarketData(stock);
        if (stockMarketData) {
          return stockMarketData;
        }

        return null;

        // const result = await this.client.get(`quote/${stock.symbol}`, {
        //   params: params,
        // });
        //
        // const data = result.data.results[0];
        // await this.associateStockMarketData(stock, data);
        //
        // return data;
      })
    );

    return stockPrices;
  }

  public async findCachedStockMarketData(stock: Stock) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const marketData = await StockMarketData.findOne({
      where: {
        symbol: stock.symbol,
        regularMarketTime: {
          [Op.between]: [startOfDay, endOfDay],
        }
      },
    });

    return marketData;
  }

  private isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  private todayIsWeekend() {
    return false; // TODO - HABILITAR
    return this.isWeekend(new Date());
  }

  private async associateStockMarketData(stock: Stock, marketData: MarketData) {
    console.log(marketData);
    await StockMarketData.create({
      stockId: stock.id,
      symbol: stock.symbol,
      longName: marketData['longName'],
      regularMarketPrice: marketData['regularMarketPrice'],
      regularMarketTime: new Date(marketData['regularMarketTime']),
    });
  }
}

interface MarketData {
  longName: string;
  regularMarketPrice: number;
  regularMarketTime: string;
}
