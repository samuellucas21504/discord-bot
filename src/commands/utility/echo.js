const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Echos the parameter back')
    .addStringOption(option =>
      option.setName('input')
        .setDescription('The input to echo back'),
    ),
  async execute(interaction) {
    const input = interaction.options.getString('input');
    await interaction.reply(input);
  },
};
