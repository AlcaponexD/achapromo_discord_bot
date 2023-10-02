const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong")
    .addStringOption((option) =>
      option.setName("input").setDescription("The input to echo back")
    ),
  async execute(interaction) {
    console.log(interaction.options.getString("input"));
    await interaction.reply({ content: "Secret Pong!", ephemeral: true });
  },
};
