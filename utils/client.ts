import { Client as DiscordClient, Collection, GatewayIntentBits } from "discord.js"

export default class Client extends DiscordClient {
  public commands: Collection<string, any>;
  public cooldowns: Collection<any, any>;

  constructor(options: any) {
    super(options);

    this.commands = new Collection()
    this.cooldowns = new Collection();
  }

  static init() {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.commands = new Collection();
    client.cooldowns = new Collection();

    return client;
  }
}
