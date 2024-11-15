import { BaseCommand } from 'base/baseCommand.js';
import {
  ChatInputCommandInteraction,
  SlashCommandBuilder
} from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('stocks')
  .setDescription('Change stocks configuration')
  .addSubcommand(subcommand =>
    subcommand
      .setName('register-channel')
      .setDescription('Set this as the default channel to send the stocks.'))
  .addSubcommand(subcommand =>
    subcommand
      .setName('server')
      .setDescription('Provides information about the user'));


const execute = async (interaction: ChatInputCommandInteraction) => {
  if (interaction.options.getSubcommand() === 'registerChannel') {
    console.log(interaction.channelId);
  }
};

class StockCommand extends BaseCommand {
  constructor() {
    super(data, execute);
  }
}

export const command = new StockCommand();

