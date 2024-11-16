import Client from "@utils/client.js";
import { BaseEvent } from "base/baseEvent.js";
import { Events } from 'discord.js';

const execute = async (client: Client) => {
  console.log(`Ready! Logged in as ${client.user!.tag}`);
};

class ClientReadyEvent extends BaseEvent {
  constructor() {
    super(Events.ClientReady, true, execute);
  }
}

export const event = new ClientReadyEvent();
