import Client from '@utils/client.js';
import { BaseCommand } from 'base/baseCommand.js';
import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('stocks')
  .setDescription('Change stocks configuration')
  .addSubcommand(subcommand =>
    subcommand
      .setName('subscribe')
      .setDescription('Inscrever-se para receber notificações sobe suas ações.'))
  .addSubcommand(subcommand =>
    subcommand
      .setName('unsubscribe')
      .setDescription('Sair do canal de notificações.'))


const execute = async (interaction: ChatInputCommandInteraction) => {
  if (interaction.options.getSubcommand() === 'subscribe') {
    interaction.reply({
      content: 'A partir de agora te enviarei ações na sua DM. Voce pode adicionar novas ações usando `/stocks add indicador_da_acao`',
      ephemeral: true,
    });
  }

  if (interaction.options.getSubcommand() === 'unsubscribe') {
    interaction.reply({
      content: 'Irei parar de te enviar notificações na sua DM.',
      ephemeral: true,
    });
  }
};

class StockCommand extends BaseCommand {
  constructor() {
    super(data, execute);
  }
}

export const command = new StockCommand();

