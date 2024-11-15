import { CommandInteraction } from "discord.js";

export abstract class BaseEvent {
  private _name: string;
  private _once: boolean;
  private _execute: (arg0: any) => any;

  public constructor(name: string, once: boolean, execute: (interaction: any) => any) {
    this._name = name;
    this._once = once;
    this._execute = execute;
  }

  public get data() {
    return {
      name: this._name,
      once: this._once,
      execute: this._execute
    }
  }
}
