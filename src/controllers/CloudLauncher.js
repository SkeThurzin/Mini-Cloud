import { readdirSync } from "fs";
import { join } from "path";
import { Client } from "discord.js";
import { connect } from "mongoose";
import Models from "../public/utils/DataBase/Models.js";
import c from "chalk";
import URL from "node:url";

export default class Launcher extends Client {
  constructor(options) {
    super(options);

    this.commands = [];
    this.#loadCommands();
    this.#loadEvents();
    this.#connectDatabase();
  }

  registerCommands() {
    this.application.commands.set(this.commands);
  }

  async #loadCommands(path = "src/controllers/commands") {
    const categories = readdirSync(path);
    for (const category of categories) {
      const commands = readdirSync(`${path}/${category}`);

      for (const command of commands) {
        const commandFile = join(
          process.cwd(),
          `${path}/${category}/${command}`
        );
        const { default: CommandClass } = await import(
          URL.pathToFileURL(commandFile).toString()
        );
        const cmd = new CommandClass(this);

        this.commands.push(cmd);
      }
    }
  }

  async #loadEvents(path = "src/controllers/events") {
    const eventsFolders = readdirSync(path);
    for (const folders of eventsFolders) {
      const eventsFiles = readdirSync(`${path}/${folders}`);

      for (const files of eventsFiles) {
        const eventFile = join(process.cwd(), `${path}/${folders}/${files}`);
        const { default: eventClass } = await import(
          URL.pathToFileURL(eventFile).toString()
        );
        const evnt = new eventClass(this);

        if (!evnt.once) {
          this.on(evnt.name, evnt.run);
        } else {
          this.once(evnt.name, evnt.run);
        }
      }
    }
  }
  async #connectDatabase() {
    try {
      const connection = await connect(process.env.MongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(
        c.gray(`${new Date().toLocaleString()}`),
        `${c
          .hex("#3aff00")
          .bold("〔 DataBase 〕›")} Database successfully connected to me!`
      );
      this.db = { connection, ...Models };
    } catch (e) {
      console.log(`〔 Failed 〕› It was not connected for the reason:`, e);
    }
  }
}
