import { Channel, User as DiscordUser, TextBasedChannel } from "discord.js";
import User from '@models/user.js';

export class UserService {
  public async create(user: DiscordUser, subscriptionChannel: TextBasedChannel) {
    console.log({
      userId: user.id,
      displayName: user.displayName,
      globalName: user.globalName!,
      subscriptionChannel: subscriptionChannel.id
    });

    User.create({
      userId: user.id,
      displayName: user.displayName,
      globalName: user.globalName!,
      subscriptionChannel: subscriptionChannel.id
    })
  }
}
