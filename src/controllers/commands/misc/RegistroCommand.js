import User from "../../../public/utils/DataBase/🍀 Schemas/User.js";
import Guild from "../../../public/utils/DataBase/🍀 Schemas/Guild.js";
import Command from "../../../public/utils/Structures/Command.js";
import { EmbedBuilder } from "discord.js";

export default class Registro extends Command {
  constructor(client) {
    super(client, {
      name: "registrar",
      name_localizations: {
        "pt-BR": "registrar",
        "en-US": "register",
      },
      description:
        "❝ - Diversos / Registre-se para começar uma grande aventura! - ❞",
      description_localizations: {
        "pt-BR":
          "❝ - Diversos / Registre-se para começar uma grande aventura! - ❞",
        "en-US": "❝ - Miscellaneous / Register to start a great adventure! - ❞",
      },
      defer: true,
      onlyDev: false,
    });
  }
  async execute(interaction) {
    const Data = {
      user: await User.findOne({ idU: interaction.user.id }),
      guild: await Guild.findOne({ idS: interaction.guild.id }),
    };

    // Start Variaveis:

    let atualCoins = Data.guild.coins;

    // End Variaveis.

    if (Data.guild.registro) {
      interaction.followUp({
        content: `${this.emoji.no} ${this.emoji.seta} Ops! Parece que você ja esta **Verificado**!, peço para não tentar novamente e sim começar a sua aventura com **- /rpg start -**.`,
      });
    } else {
      await Guild.findOneAndUpdate(
        { idS: interaction.guild.id },
        { $set: { registro: true, coins: atualCoins + 150 } }
      );
      interaction.followUp({
        content: `${this.emoji.yes} ${this.emoji.seta} Obá! Você teve um registo bem-sucedido em meu sistema. Para começar essa grande aventura, utilize o comando \`- /how to play -\` !`,
      });
    }
  }
}
