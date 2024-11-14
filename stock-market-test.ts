const axios = require("axios");
const { stocks } = require('./config.json');
const querystring = require('querystring');

import type { AxiosInstance, AxiosRequestHeaders } from "axios";

interface ApiServiceOptions {
  baseURL: string;
  token?: string;

  headers?: AxiosRequestHeaders;
}

abstract class ApiService {
  protected client: AxiosInstance;

  constructor({ baseURL, token, headers }: ApiServiceOptions) {
    this.client = axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        ...headers,
      }
    });
  }
}

interface IApi {
  headers?: AxiosRequestHeaders;
}

class StockService extends ApiService {
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

async function a() {
  const stockService = new StockService();
  const a = await stockService.getStocks();

  console.log(a.data)
}

a();

