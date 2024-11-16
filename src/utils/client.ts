import { Client as DiscordClient, Collection, GatewayIntentBits } from "discord.js"

export default class Client extends DiscordClient {
  public commands: Collection<string, any>;
  public cooldowns: Collection<any, any>;
  private static _instance: Client | null = null;

  constructor(options: any) {
    super(options);

    this.commands = new Collection()
    this.cooldowns = new Collection();
  }

  private static init() {
    if (this._instance) {
      return this._instance;
    }

    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.commands = new Collection();
    client.cooldowns = new Collection();

    this._instance = client;

    return client;
  }

  public static get instance() {
    return this._instance ?? this.init();
  }
}
