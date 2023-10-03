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
        .setName("input")
        .setDescription("Digite o nome do usuário a ter o cargo de moderador")
    ),
  async execute(interaction) {
    const input = interaction.options.getString("input");
    const guild = client.guilds.cache.get(guildId);
    const role = guild.roles.cache.get(roleId);

    const member = guild.members.cache.find(
      (member) => member.nickname === input || member.user.username === input
    );
    if (!member) {
      return message.channel.send("Usuário não encontrado.");
    }
    member.roles
      .add(role)
      .then(() =>
        console.log(`Cargo atribuído com sucesso ao membro ${member.user.tag}.`)
      )
      .catch((error) => console.error("Erro ao atribuir o cargo:", error));
  },
};
