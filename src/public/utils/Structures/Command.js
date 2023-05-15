import Emojis from "../Emojis/Emojis.json" assert { type: "json" };

class Command {
  constructor(client, options) {
    this.client = client;
    this.color = "White";
    this.emoji = Emojis;
    this.name = options.name || options.data.name;
    this.description = options.description || options.data.description;
    this.options = options.options || options.data?.options;
    this.onlyDev = options.onlyDevs;
    this.defer = options.defer || false;
    this.name_localizations = options.name_localizations;
    this.description_localizations = options.description_localizations;
  }

  toJSON() {
    const { client, ...data } = this;
    return data;
  }
}

export default Command;
