import { createClient, RedisClientType } from "redis";

export class Cache {
  private static _client: RedisClientType;

  public static async init() {
    this._client = createClient({
      url: process.env.REDIS_URL,
      legacyMode: false,
    });

    this.client.on('error', (err) => console.log('Redis Client Error', err));
    await this.client.connect();
  }

  public static get client() {
    return this._client;
  }

  public static async get(key: string) {
    return await this._client.get(key);
  }
  public static async set(key: string, value: string) {
    return await this._client.set(key, value);
  }
}
