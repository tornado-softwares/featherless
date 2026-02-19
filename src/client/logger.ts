import { Client } from "@/client";

export class Logger {
  private readonly prefix = "[ Featherless AI ]";

  constructor(private client: Client) {}

  public info(message: string, ...args: any[]) {
    if (!!this.client.debug) {
      console.info(`${this.prefix} ${message}`, ...args);
    }
  }

  public warn(message: string, ...args: any[]) {
    if (!!this.client.debug) {
      console.warn(`${this.prefix} ${message}`, ...args);
    }
  }

  public error(message: string, ...args: any[]) {
    if (!!this.client.debug) {
      console.error(`${this.prefix} ${message}`, ...args);
    }
  }
}