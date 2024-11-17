import { User as DiscordUser, Guild } from "discord.js";
import User from '@models/user.js';
import { BaseError } from "@base/baseError.js";

export class UserAlreadyExistsError extends BaseError {
  constructor() {
    super('Você já é inscrito!');
    this.name = 'Usuário já existe.';
  }
}

export class UserNotFoundError extends BaseError {
  constructor() {
    super('Você não é inscrito!');
    this.name = 'Usuário não existe';
  }
}

export class UserService {
  public async findAll() {
    return await User.findAll();
  }

  public async find(user: DiscordUser) {
    return await User.findOne({
      where: {
        userId: user.id
      }
    });
  }

  public async create(user: DiscordUser, guild: Guild) {
    const userOnDb = await this.find(user);
    if (userOnDb != null) {
      throw new UserAlreadyExistsError();
    }

    User.create({
      userId: user.id,
      displayName: user.displayName,
      tag: user.tag,
      subscribedOn: guild.id
    })
  }

  public async delete(user: DiscordUser) {
    const userOnDb = await this.find(user);

    if (userOnDb == null) {
      throw new UserNotFoundError();
    }

    User.destroy({
      where: {
        userId: user.id
      }
    });
  }
}
