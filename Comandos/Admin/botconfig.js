const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ApplicationCommandType } = require("discord.js");
const { JsonDatabase} = require("wio.db");
const db = new JsonDatabase({ databasePath:"./json/geral.json"});
const { owner } = require("../../config.json")

module.exports = {
    name:"botconfig",
    description:"Execute para gerenciar o seu bot",
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {
        const user1 = interaction.guild.members.cache.get(interaction.user.id);
        const roleIdToCheck = db.get(`roles`);
      
        const hasRequiredRole = roleIdToCheck.some(roleID => user1.roles.cache.has(roleID));
      
        if (interaction.user.id !== owner) {
            interaction.reply({ content: `⚠️ | Você não é owner para realizar está atividade.`, ephemeral: true });
            return;
        }
        
        interaction.reply({
            embeds:[
                new EmbedBuilder()
                .setTitle(`Painel`)
                .setDescription(`**⚙️ | Configurando Painel do Bot**\n`)
                .setFields(
                    {
                        name: `Sistema`, value: `${db.get("sistema") != false ? "\`🟢 Ativado\`" : "\`🔴 Desativado\`"}`
                    }
                )
                .addFields(
                    {
                        name: `Use o MENU suspenso abaixo para modificar seu bot:`, value: ` `
                    }
                )
                .setFooter({ text: `${interaction.guild.name} - Todos os direitos reservados.` })
            ],
            components:[
                new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                    .addOptions(
                        {
                            label:`${db.get("sistema") != false ? "Desativar Sistema" : "Ativar Sistema"}`,
                            value:"ticketonoff",
                            emoji:`${db.get("sistema") != false ? "1203416568021782568" : "1203424989173514321"}`,
                            description:"Deixe o sistema Ativado ou Desativado"
                        },
                        {
                            label:"Configurar Canais",
                            value:"config_canais",
                            emoji:"1203415970803220550",
                            description:"Configure os canais"
                        },
                        {
                            label:"Configurar Cargos",
                            value:"config_roles",
                            emoji:"1203415832936448023",
                            description:"Configure os cargos"
                        },
                        {
                            label:"Configurar Pagamentos",
                            value:"config_payments",
                            emoji:"1212460533186302044",
                            description:"Configure o sistema de pagamentos"
                        },
                        {
                            label:"Configurar Bot",
                            value:"config_bot",
                            emoji:"1207876800462585887",
                            description:"Configure o bot (Status, Foto, Nome, Embeds)"
                        },
                        {
                            label:"Gerenciar Ticket",
                            value:"gerenciar_ticket",
                            emoji:"1207877256861589514",
                            description:"Adicione ou remova categorias do ticket"
                        },
                        {
                            label:"Configurar Categorias",
                            value:"config_categorias",
                            emoji:"1203416928278945843",
                            description:"Configure as categorias"
                        }
                    )
                    .setCustomId("gerenciarselect")
                    .setPlaceholder("Clique aqui para selecionar uma opção")
                    .setMaxValues(1)
                ),
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setURL(`https://discord.gg/fBjS4FdQbR`)
                    .setLabel(`Suporte/Ajuda`)
                    .setEmoji(`1215081046727467118`)
                    .setStyle(5),
                    new ButtonBuilder()
                    .setURL(`https://discord.com/oauth2/authorize?client_id=${interaction.client.application.id}&scope=bot%20applications.commands&permissions=8`)
                    .setLabel(`Adicionar Bot`)
                    .setEmoji(`1215080945896398868`)
                    .setStyle(5),
                )
            ], ephemeral: true
        })
    }
}