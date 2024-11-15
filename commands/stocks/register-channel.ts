import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stocks')
    .setDescription('Change stocks configuration')
    .addSubcommand(subcommand =>
      subcommand
        .setName('registerChannel')
        .setDescription('Set this as the default channel to send the stocks.'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('server')
        .setDescription('Provides information about the user')),

  async execute(interaction: ChatInputCommandInteraction) {
    if (interaction.options.getSubcommand() === 'registerChannel') {
      console.log(interaction.channelId);
    }
  },
};
