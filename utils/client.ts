import { Client, Collection } from "discord.js"

export default class MyClient extends Client {
  public commands: Collection<string, any>;
  public cooldowns: Collection<any, any>;

  constructor(options: any) {
    super(options);

    this.commands = new Collection()
    this.cooldowns = new Collection();
  }
}
