import { ApiService } from '@services/api/api-service.js';

import { AxiosRequestHeaders } from "axios";

export interface IApi {
  headers?: AxiosRequestHeaders;
}

export class StockService extends ApiService {
  constructor({ headers }: IApi = {}) {
    super({
      baseURL: process.env.STOCKS_BASE_URL!,
      token: process.env.STOCKS_TOKEN,
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
