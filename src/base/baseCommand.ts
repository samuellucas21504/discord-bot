import { SharedSlashCommand } from "discord.js";

export abstract class BaseCommand {
  private _data: SharedSlashCommand;
  private _execute: (arg0: any) => any;

  constructor(data: SharedSlashCommand, execute: (arg0: any) => any) {
    this._data = data;
    this._execute = execute;
  }

  public get data() {
    return {
      data: this._data,
      execute: this._execute,
    }
  }
} 
