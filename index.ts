import fs from 'node:fs';
import path from 'node:path';
import { Collection, GatewayIntentBits } from 'discord.js';
import Client from '@utils/client.js';
import { token } from './config.json';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.cooldowns = new Collection();

const folderPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(folderPath);

for (const folder of commandFolders) {
  const commandPath = path.join(folderPath, folder);
  const commandFiles = fs.readdirSync(commandPath).filter(file => (file.endsWith('.ts')));

  for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = await import(filePath);

    if (command.data != null && command.execute != null) {
      client.commands.set(command.data.name, command);
    }
    else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

const eventsPath = path.join(__dirname, 'events');
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

client.login(token);
