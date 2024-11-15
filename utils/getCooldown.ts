import { Collection, CommandInteraction } from "discord.js";
import Client from "./client.js";

export const getCooldown = (interaction: CommandInteraction, command: any) => {
  const { cooldowns } = interaction.client as Client;

  if (!cooldowns.has(command.data.name)) {
    cooldowns.set(command.data.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.data.name);
  const defaultCooldownDuration = 3;
  const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1_000;

  if (timestamps.has(interaction.user.id)) {
    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

    if (now < expirationTime) {
      const expiredTimeStamp = Math.round(expirationTime / 1_000);
      return interaction
        .reply({
          content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use this command again in <t:${expiredTimeStamp}:R>`, ephemeral: true,
        });
    }
  }

  timestamps.set(interaction.user.id, now);
  setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

  return null;
};
