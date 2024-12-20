import { REST, Routes } from 'discord.js';
import { dirName as __dirname } from '@utils/dirname.js';
import { APIApplicationCommand } from 'discord-api-types/v10';
import fs from 'node:fs';
import path from 'node:path';

export class Deploy {
  public static async init() {
    this.deployCommands();
  }

  private static async deployCommands() {
    const clientId = process.env.CLIENT_ID!;
    const guildId = process.env.GUILD_ID!;
    const token = process.env.BOT_TOKEN!;

    const commands = [];
    const foldersPath = path.join(__dirname, '/src/commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs.readdirSync(commandsPath)
        .filter((file: string) => (file.endsWith('.ts')));

      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const imported = await import(filePath);
        const command = imported.command.data;

        if (command.data && command.execute) {
          commands.push(command.data.toJSON());
        }
        else {
          console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
      }
    }

    const rest = new REST().setToken(token);

    (async () => {
      try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
          Routes.applicationGuildCommands(clientId, guildId),
          { body: commands },
        ) as APIApplicationCommand[];

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
      }
      catch (error) {
        console.error(error);
      }
    })();
  }

}
