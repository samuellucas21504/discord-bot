import { BaseCommand } from 'base/baseCommand.js';
import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  TextChannel
} from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('stocks')
  .setDescription('Change stocks configuration')
  .addSubcommand(subcommand =>
    subcommand
      .setName('register-channel')
      .setDescription('Set this as the default channel to send the stocks.'))


const execute = async (interaction: ChatInputCommandInteraction) => {
  if (interaction.options.getSubcommand() === 'register-channel') {
    console.log(interaction.channelId);


    interaction.reply({
      content: 'Comando recebido.',
      ephemeral: true,
    });

    (interaction.channel as TextChannel).send({
      content: `A partir de agora enviarei as ações nesse canal.`,
    })
  }
};

class StockCommand extends BaseCommand {
  constructor() {
    super(data, execute);
  }
}

export const command = new StockCommand();

