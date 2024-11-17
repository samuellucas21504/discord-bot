import { Client as DiscordClient, Collection, GatewayIntentBits } from "discord.js"
import path from 'node:path';
import fs from 'node:fs';
import { dirName as __dirname } from '@utils/dirname.js';

export default class Client extends DiscordClient {
  public commands: Collection<string, any>;
  public cooldowns: Collection<any, any>;
  private static _instance: Client;

  constructor(options: any) {
    super(options);

    this.commands = new Collection()
    this.cooldowns = new Collection();
  }

  public static get instance() {
    return this._instance;
  }

  public static init() {
    if (this._instance) {
      return this._instance;
    }

    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.commands = new Collection();
    client.cooldowns = new Collection();

    this._instance = client;

    this.initCommands(this._instance);
    this.initEvents(this._instance);
  }

  private static async initCommands(client: Client) {
    const folderPath = path.join(__dirname, 'src/commands');
    const commandFolders = fs.readdirSync(folderPath);

    for (const folder of commandFolders) {
      const commandPath = path.join(folderPath, folder);
      const commandFiles = fs.readdirSync(commandPath).filter(file => (file.endsWith('.ts')));

      for (const file of commandFiles) {
        const filePath = path.join(commandPath, file);
        const imported = await import(filePath);
        const command = imported.command.data;

        if (command.data != null && command.execute != null) {
          client.commands.set(command.data.name, command);
        }
        else {
          console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
      }
    }
  }

  private static async initEvents(client: Client) {
    const eventsPath = path.join(__dirname, 'src/events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => (file.endsWith('.ts')));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const imported = await import(filePath);
      const event = imported.event.data;

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      }
      else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    }
  }
}
