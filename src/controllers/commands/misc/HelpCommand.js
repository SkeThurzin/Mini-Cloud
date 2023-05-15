import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
import Command from "../../../public/Utils/Structures/Command.js";

export default class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ajuda",
      name_localizations: { "en-US": "help", "pt-BR": "ajuda" },
      description: "❝ - Information / Guia e Tutorial - ❞",
      description_localizations: {
        "en-US": "❝ - Information / Guide e Tutorial - ❞",
        "pt-BR": "❝ - Informação / Guia e Tutorial - ❞",
      },
      defer: false,
      onlyDev: false,
    });
  }
  async execute(interaction) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: `Olá, Meu nome é Mini Cloud, porém me chame de Cloud`,
            iconURL: `${this.client.user.displayAvatarURL({
              extension: "png",
              size: 128,
            })}`,
          })
          .setDescription(
            `- Sou um bot criado com intuito de alegrar e divertir pessoas que são fãs de Animes com conteudo de RPG.\n- Use os meus comando e divirta-se!`
          )
          .setColor(this.color),
      ],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("Veja minha linda lista de comandos!")
            .setEmoji(this.emoji.lista)
            .setURL("https://www.google.com/")
            .setStyle(ButtonStyle.Link),
          new ButtonBuilder()
            .setLabel("Me Adicione")
            .setEmoji(this.emoji.novas)
            .setURL("https://www.google.com/")
            .setStyle(ButtonStyle.Link),
          new ButtonBuilder()
            .setLabel("Suporte")
            .setURL("https://www.google.com/")
            .setStyle(ButtonStyle.Link)
        ),
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("Move to/ USA")
            .setCustomId("mudar")
            .setEmoji(this.emoji.eua)
            .setStyle(ButtonStyle.Danger)
        ),
      ],
    });

    const filter = (i) => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 60000,
    });

    collector.on("collect", async (interaction) => {
      if (interaction.customId === "mudar") {
        await interaction.deferUpdate();

        interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setAuthor({
                name: `Hello, My name is Mini Cloud, but call me Cloud`,
                iconURL: `${this.client.user.displayAvatarURL({
                  extension: "png",
                  size: 128,
                })}`,
              })
              .setDescription(
                `- I'm a bot created with the intention of cheering and amusing people who are fans of Anime with RPG content.\n- Use my commands and have fun!`
              )
              .setColor(this.color),
          ],
          components: [
            new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setLabel("See my beautiful list of commands!")
                .setEmoji(this.emoji.lista)
                .setURL("https://www.google.com/")
                .setStyle(ButtonStyle.Link),
              new ButtonBuilder()
                .setLabel("Add me")
                .setEmoji(this.emoji.novas)
                .setURL("https://www.google.com/")
                .setStyle(ButtonStyle.Link),
              new ButtonBuilder()
                .setLabel("Support")
                .setURL("https://www.google.com/")
                .setStyle(ButtonStyle.Link)
            ),
          ],
        });
      }
      collector.stop();
    });
  }
}
