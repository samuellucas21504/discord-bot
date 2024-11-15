import { SlashCommandOptionsOnlyBuilder } from "discord.js";

export abstract class BaseCommand {
  private _data: SlashCommandOptionsOnlyBuilder;
  private _execute: (arg0: any) => any;

  constructor(data: SlashCommandOptionsOnlyBuilder, execute: (arg0: any) => any) {
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
