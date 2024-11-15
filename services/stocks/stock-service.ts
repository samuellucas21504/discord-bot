const { ApiService } = require('./api-service');
const { stocks } = require('./config.json');

import type { AxiosRequestHeaders } from "axios";

export interface IApi {
  headers?: AxiosRequestHeaders;
}

export class StockService extends ApiService {
  constructor({ headers }: IApi = {}) {
    super({
      baseURL: stocks.base_url,
      token: stocks.token,
      headers: headers,
    });
  };

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
