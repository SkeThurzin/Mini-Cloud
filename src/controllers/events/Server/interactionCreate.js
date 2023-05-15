import Events from "../../../public/utils/Structures/Events.js";
import Guild from "../../../public/utils/DataBase/🍀 Schemas/Guild.js";
import User from "../../../public/utils/DataBase/🍀 Schemas/User.js";
import Emojis from "../../../public/utils/Emojis/Emojis.json" assert { type: "json" };

export default class extends Events {
  constructor(client) {
    super(client, {
      name: "interactionCreate",
    });
  }
  run = async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // Add a null check for interaction.user
    if (!interaction.user) return;

    const commandName = interaction.commandName;
    const command = this.client.commands.find((c) => c.name === commandName);

    const guild = await Guild.findOne({ idS: interaction.guild.id });
    const user = await User.findOne({ idU: interaction.user.id });

    if (!guild) {
      await Guild.create({ idS: interaction.guild.id });
    } else if (!user) {
      await User.create({ idU: interaction.user.id });
    }

    if (command.permissions) {
      if (!interaction.member.permissions.has(command.permissions)) {
        return interaction.reply({ content: "Você não tem perm" });
      } else if (
        !interaction.guild.members.me.permissions.has(command.permissions)
      ) {
        return interaction.reply({ content: "Não tenho perm" });
      }
    }
    console.log(
      `Comando ${command.name} Foi executado por ${interaction.user.tag}`
    );
    command.defer ? await interaction.deferReply({ ephemeral: true }) : false;
    command.execute(interaction);
  };
}
