import { UserService } from '@services/user-service.js';
import { BaseCommand } from '@base/baseCommand.js';
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

class StockCommand extends BaseCommand {
  private _userService: UserService;

  constructor() {
    super(data);
    this._userService = new UserService();
  }

  public execute = async (interaction: ChatInputCommandInteraction) => {
    if (interaction.options.getSubcommand() === 'subscribe') {
      this._userService.create(interaction.user, interaction.channel!);

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
}

export const command = new StockCommand();

