const axios = require("axios");

import type { AxiosInstance, AxiosRequestHeaders } from "axios";

export interface ApiServiceOptions {
  baseURL: string;
  token?: string;

  headers?: AxiosRequestHeaders;
}

export abstract class ApiService {
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
