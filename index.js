const {Client, GatewayIntentBits, InteractionType, Collection, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ActivityType, WebhookClient} = require("discord.js")

const colors = require("colors")

const client = new Client({ 
  intents: [ 
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
       ]
    });


module.exports = client



client.on('interactionCreate', (interaction) => {

  if(interaction.type === InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})

client.on('ready', () => {
  console.clear()
  console.log(`${colors.green("[STATUS]")} ${client.user.username} Acabou de iniciar.`)
  console.log(`${colors.green("[SERVERS]")} Estou em ${client.guilds.cache.size} servidor(s).`)
  console.log(``)
  console.log(`${colors.cyan("[CREDITS]")} @gostbanido`)
  console.log(`${colors.cyan("[HELP LINK]")} https://discord.gg/uaWcBMDWck`)
})


client.slashCommands = new Collection()

require('./handler')(client)
client.on("interactionCreate", require('./events/gerenciar').execute);
client.on("interactionCreate", require('./events/ticket').execute);
client.on("interactionCreate", require('./events/button').execute);

const { token } = require("./config.json")
client.login(token)

const axios = require("axios")
const url = 'https://discord.com/api/v10/applications/@me';


const data = {
  description: "\`🍃\` \`Bot ticket by @zeon7x\`",
};

axios.patch(url, data, {
  headers: {
    Authorization: `Bot ${token}`,
    'Content-Type': 'application/json'
  }
})
.then((response) => {
  console.log('Aplicação atualizada com sucesso!');
})
.catch((error) => {
  console.error(`Erro ao atualizar aplicação: ${error}`);
});


process.on('unhandRejection', (reason, promise) => {
    console.log(`🚫 Erro Detectado:\n\n` + reason, promise)
  });
  process.on('uncaughtException', (error, origin) => {
    console.log(`🚫 Erro Detectado:\n\n` + error, origin)
  });