const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get info about user or server')
    .addSubcommand(subcommand =>
      subcommand
        .setName('user')
        .setDescription('Info about a user')
        .addUserOption(option => option.setName('target').setDescription('The user')))
    .addSubcommand(subcommand =>
      subcommand
        .setName('server')
        .setDescription('Provides information about the user')),

  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'user') {
      const user = interaction.options.getUser('target');
      console.log(user);

      if (user) {
        await interaction.reply({ content: `Username: ${user.username}\nID: ${user.id}`, ephemeral: true });
      }
      else {
        await interaction.reply(`This command was run by ${interaction.user.globalName}, who joined on ${interaction.member.joinedAt}`);
      }

    }
    else if (interaction.options.getSubcommand() === 'server') {
      await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
    }
  },
};
