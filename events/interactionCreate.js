const { Events, Collection } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
    }

    const cooldown = getCooldown(interaction, command);
    if (cooldown !== null) {
      return cooldown;
    }

    try {
      await command.execute(interaction);
    }
    catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      }
      else {
        await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
      }
    }
  },
};

const getCooldown = (interaction, command) => {
  const { cooldowns } = interaction.client;

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
