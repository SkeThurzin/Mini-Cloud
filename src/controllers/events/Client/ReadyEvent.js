import Events from "../../../public/utils/Structures/Events.js";
import c from "chalk";

export default class extends Events {
  constructor(client) {
    super(client, {
      name: "ready",
      once: true,
    });
  }
  run = async (interaction) => {
    await this.client.registerCommands();

    let status = [`😉 - ୧︰Olá, eu sou o Cloud › Utilize /help.`];

    let i = 0;
    this.client.user.setPresence({
      activities: [{ name: `${status[i++ % status.length]}`, type: 0 }],
      status: "idle",
    });
    setInterval(() => {
      this.client.user.setPresence({
        activities: [{ name: `${status[i++ % status.length]}`, type: 0 }],
        status: "idle",
      });
    }, 1000 * 30);

    this.client.user.setStatus("idle");
    //console.clear();
    console.log(
      c.gray(`${new Date().toLocaleString()}`),
      `${c
        .hex("#0066ff")
        .bold(
          "〔 SlashCommands 〕›"
        )} SlashCommands successfully connected to me!`
    );
    setTimeout(function () {
      console.log(
        c.gray(`${new Date().toLocaleString()}`),
        `${c
          .hex("#fdff00")
          .bold("〔 Events 〕›")} Events successfully connected to me!`
      );
    }, 3000);
  };
}
