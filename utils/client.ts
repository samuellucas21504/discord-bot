import { Client as DiscordClient, Collection } from "discord.js"

export default class Client extends DiscordClient {
  public commands: Collection<string, any>;
  public cooldowns: Collection<any, any>;

  constructor(options: any) {
    super(options);

    this.commands = new Collection()
    this.cooldowns = new Collection();
  }
}
