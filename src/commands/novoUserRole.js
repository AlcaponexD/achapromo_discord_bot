require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Events,
  SlashCommandBuilder,
} = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Receber informações sobre servidores
    GatewayIntentBits.GuildMessages, // Receber informações sobre mensagens
  ],
});

const token = process.env.DISCORD_TOKEN;
client.login(token);

const guildId = "846813010357780521";
const roleId = "1158723989867335710";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("novo")
    .setDescription("Adicionar cargo de moderador")
    .addStringOption((option) =>
      option
        .setName("nome")
        .setDescription("Digite o nome do usuário a ter o cargo de moderador")
    ),
  async execute(interaction) {
    const nome = interaction.options.getString("nome");
    const guild = client.guilds.cache.get(guildId);
    const role = guild.roles.cache.get(roleId);

    const member = guild.members.cache.find(
      (member) => member.nickname === nome || member.user.username === nome
    );
    if (!member) {
      return interaction.reply("Usuário não encontrado.");
    }
    member.roles
      .add(role)
      .then(() =>
        interaction.reply(
          `Cargo atribuído com sucesso ao membro ${member.user.tag}.`
        )
      )
      .catch((error) => interaction.reply("Erro ao atribuir o cargo:", error));
  },
};
