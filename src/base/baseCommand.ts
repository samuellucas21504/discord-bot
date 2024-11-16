import { SharedSlashCommand } from "discord.js";

export abstract class BaseCommand {
  private _data: SharedSlashCommand;

  constructor(data: SharedSlashCommand) {
    this._data = data;
  }

  public get data() {
    return {
      data: this._data,
      execute: this.execute,
    }
  }

  abstract get execute(): (arg0: any) => any;
} 
