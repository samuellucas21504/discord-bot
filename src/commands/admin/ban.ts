import { BaseCommand } from "base/baseCommand.js";
import {
  ChatInputCommandInteraction,
  SlashCommandStringOption,
  SlashCommandUserOption,
  SlashCommandBuilder,
  PermissionFlagsBits
} from "discord.js";

const data = new SlashCommandBuilder()
  .setName('ban')
  .setDescription('Select a member and ban them')
  .addUserOption((option: SlashCommandUserOption) =>
    option
      .setName('target')
      .setDescription('The member to ban')
      .setRequired(true))
  .addStringOption((option: SlashCommandStringOption) =>
    option
      .setName('reason')
      .setDescription('The reason for banning'))
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

const execute = async (interaction: ChatInputCommandInteraction) => {
  const target = interaction.options.getUser('target');
  const reason = interaction.options.getString('reason') ?? 'No reason provided';

  await interaction.reply(`Banning ${target!.username} for reason: ${reason}`);
  await interaction.guild!.members.ban(target!);
};

class BanCommand extends BaseCommand {
  constructor() {
    super(data, execute);
  }
}

export const command = new BanCommand();
