import { ApiService } from '@services/api-service.js';
import { User as DiscordUser } from 'discord.js';
import { AxiosRequestHeaders } from "axios";
import { UserNotFoundError, UserService } from './user-service.js';
import { BaseError } from '@base/baseError.js';
import stock from '@models/stock.js';

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

  public async addStockToUser(user: DiscordUser, ticker: string) {
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

  public async getStocks() {
    const tickers = 'AAPL34';
    const params = {
      range: '1d',
      interval: '1d',
    };

    console.log(this.client.getUri())

    return await this.client.get(`quote/${tickers}`, {
      params: params,
    });
  }
}
