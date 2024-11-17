import fs from 'node:fs';
import path from 'node:path';
import { dirName as __dirname } from '@utils/dirname.js';
import Client from '@utils/client.js';
import { ENV } from '@utils/env.js';
import { Cache } from '@services/cache.js';

ENV.init();
Cache.init();

const client = Client.instance;
const token = process.env.BOT_TOKEN;

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

client.login(token);
