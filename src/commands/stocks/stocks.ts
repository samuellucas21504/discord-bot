import { UserService } from '@services/user-service.js';
import { BaseCommand } from '@base/baseCommand.js';
import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { BaseError } from '@base/baseError.js';
import { StockService } from '@services/stock-service.js';
import StockMarketData from '@models/stockMarketData.js';

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
  .addSubcommand(subcommand =>
    subcommand
      .setName('get')
      .setDescription('Buscar novamente suas ações do dia'))
  .addSubcommand(subcommand =>
    subcommand
      .setName('add')
      .setDescription('Adiciona uma ação na sua lista de notificações.')
      .addStringOption(option => option.setName('ticker').setDescription('O ticker da ação. Exemplo: AAPL34, TSLA34, INTB3.')))
  .addSubcommand(subcommand =>
    subcommand
      .setName('remove')
      .setDescription('Remove uma ação da sua lista de notificações')
      .addStringOption(option => option.setName('ticker').setDescription('O ticker da ação. Exemplo: AAPL34, TSLA34, INTB3.')))


class StockCommand extends BaseCommand {
  private _userService: UserService;
  private _stockService: StockService;

  constructor() {
    super(data);
    this._userService = new UserService();
    this._stockService = new StockService();
  }

  public execute = async (interaction: ChatInputCommandInteraction) => {
    try {
      if (interaction.options.getSubcommand() === 'subscribe') {
        await this._userService.create(interaction.user, interaction.guild!);

        interaction.reply({
          content: 'A partir de agora te enviarei ações na sua DM. Voce pode adicionar novas ações usando `/stocks add indicador_da_acao`',
          ephemeral: true,
        });

        return;
      }

      if (interaction.options.getSubcommand() === 'unsubscribe') {
        this._userService.delete(interaction.user);

        interaction.reply({
          content: 'Irei parar de te enviar notificações na sua DM.',
          ephemeral: true,
        });

        return;
      }

      if (interaction.options.getSubcommand() === 'get') {
        interaction.deferReply({ ephemeral: true });
        const stocks = await this._stockService.getStocks(interaction.user);

        if (stocks.length === 0) {
          return;
        }
        const formatStockMessage = (info: StockMarketData) => {
          const formattedTime = info.regularMarketTime!.toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            dateStyle: 'short',
            timeStyle: 'short',
          });

          return new EmbedBuilder()
            .setTitle(`${info.longName} (${info.symbol})`)
            .addFields(
              { name: 'Preço de hoje', value: `R$ ${info.regularMarketPrice.toFixed(2)}` },
              { name: 'Horário da busca', value: formattedTime }
            )
            .setColor('#00AAFF');
        }

        for (const stock of stocks) {
          await interaction.user.send({
            embeds: [formatStockMessage(stock!)]
          });
        }

        interaction.deleteReply();

        return;
      }


      if (interaction.options.getSubcommand() === 'add') {
        const ticker = interaction.options.getString('ticker');
        if (ticker == null) {
          interaction.reply({
            content: 'Por favor digite o ticker.',
            ephemeral: true,
          });

          return;
        }

        await this._stockService.addToUser(interaction.user, ticker);

        interaction.reply({
          content: `Você receberá notificações diárias de ${ticker}.`,
          ephemeral: true,
        });

        return;
      }

      if (interaction.options.getSubcommand() === 'remove') {
        const ticker = interaction.options.getString('ticker');
        if (ticker == null) {
          interaction.reply({
            content: 'Por favor digite o ticker.',
            ephemeral: true,
          });

          return;
        }

        await this._stockService.removeOfUser(interaction.user, ticker);

        interaction.reply({
          content: `Você deixará de receber notificações diárias de ${ticker}.`,
          ephemeral: true,
        });
      }

    } catch (exception) {
      if (exception instanceof BaseError) {
        console.log(exception);
        interaction.reply({
          content: `${exception.message} `,
          ephemeral: true,
        });

        return;
      }

      console.log(exception);

      interaction.reply({
        content: 'Ocorreu um erro durante a execução desse comando! Por favor tente mais tarde!',
        ephemeral: true,
      });

      return;
    }
  }
}

export const command = new StockCommand();
