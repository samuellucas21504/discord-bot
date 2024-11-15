import Client from "@utils/client.js";
import { getCooldown } from "@utils/getCooldown.js";
import { BaseEvent } from "base/baseEvent.js";
import { Events, CommandInteraction } from "discord.js";

const command = async (interaction: CommandInteraction) => {
  if (!interaction.isChatInputCommand()) return;

  const client = interaction.client as Client;

  const command = client.commands.get(interaction.commandName);

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
};

class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super(Events.InteractionCreate, false, command);
  }
}

export const event = new InteractionCreateEvent();
