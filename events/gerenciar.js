const { EmbedBuilder, ChannelSelectMenuBuilder, ButtonBuilder, ActivityType, ActionRowBuilder, StringSelectMenuBuilder, RoleSelectMenuBuilder, ModalBuilder, TextInputBuilder, ChannelType, TextInputStyle } = require("discord.js");
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./json/geral.json" })


module.exports = {
    name: "ticket",
    async execute(interaction, client, message) {


        if (interaction.isStringSelectMenu() && interaction.customId === "gerenciarselect") {
            const options = interaction.values[0];
            if (options === "config_categorias") {
                const ticket = db.get(`ticket`)
                if (ticket.length <= 0) {

                    await interaction.update({
                        content: "",
                        embeds: [
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
                        components: [
                            new ActionRowBuilder()
                                .addComponents(
                                    new StringSelectMenuBuilder()
                                        .addOptions(
                                            {
                                                label: `${db.get("sistema") != false ? "Desativar Sistema" : "Ativar Sistema"}`,
                                                value: "ticketonoff",
                                                emoji: `${db.get("sistema") != false ? "1203416568021782568" : "1203424989173514321"}`,
                                                description: "Deixe o sistema Ativado ou Desativado"
                                            },
                                            {
                                                label: "Configurar Canais",
                                                value: "config_canais",
                                                emoji: "1203415970803220550",
                                                description: "Configure os canais"
                                            },
                                            {
                                                label: "Configurar Cargos",
                                                value: "config_roles",
                                                emoji: "1203415832936448023",
                                                description: "Configure os cargos"
                                            },
                                            {
                                                label: "Configurar Pagamentos",
                                                value: "config_payments",
                                                emoji: "1212460533186302044",
                                                description: "Configure o sistema de pagamentos"
                                            },
                                            {
                                                label: "Configurar Bot",
                                                value: "config_bot",
                                                emoji: "1207876800462585887",
                                                description: "Configure o bot (Status, Foto, Nome, Embeds)"
                                            },
                                            {
                                                label: "Gerenciar Ticket",
                                                value: "gerenciar_ticket",
                                                emoji: "1207877256861589514",
                                                description: "Adicione ou remova categorias do ticket"
                                            },
                                            {
                                                label: "Configurar Categorias",
                                                value: "config_categorias",
                                                emoji: "1203416928278945843",
                                                description: "Configure as categorias"
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
                        ]
                    })

                    interaction.followUp({ content: `❌ | Você não consegue alterar a categoria por que não criou ticket nenhum! Abra o **Gerenciar Ticket** e crie um ticket você mesmo antes de tentar novamente!`, ephemeral: true })
                } else {
                    const select = new StringSelectMenuBuilder().setCustomId("config_cat_select").setPlaceholder("Selecione uma categoria")
                    ticket.map((rs) => {
                        select.addOptions(
                            {
                                label: `${rs.type}`,
                                description: `${rs.description}`,
                                value: `${rs.type}`
                            }
                        )
                    })
                    interaction.update({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle(`${interaction.guild.name} | Configurando Categoria's`)
                                .setDescription(`- ${interaction.user} use o menu abaixo e selecione a categoria que você deseja configurar:`)
                        ],
                        components: [
                            new ActionRowBuilder()
                                .addComponents(select),
                            new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId("voltar_categoria")
                                        .setLabel("Voltar")
                                        .setStyle(2)
                                        .setEmoji("1217286326064255056")
                                )
                        ]
                    })
                }
            }
            if (options === "ticketonoff") {
                if (db.get(`sistema`) == true) {
                    db.set(`sistema`, false);
                } else if (db.get(`sistema`) == false) {
                    db.set(`sistema`, true);
                }

                interaction.update({
                    content: "",
                    embeds: [
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
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new StringSelectMenuBuilder()
                                    .addOptions(
                                        {
                                            label: `${db.get("sistema") != false ? "Desativar Sistema" : "Ativar Sistema"}`,
                                            value: "ticketonoff",
                                            emoji: `${db.get("sistema") != false ? "1203416568021782568" : "1203424989173514321"}`,
                                            description: "Deixe o sistema Ativado ou Desativado"
                                        },
                                        {
                                            label: "Configurar Canais",
                                            value: "config_canais",
                                            emoji: "1203415970803220550",
                                            description: "Configure os canais"
                                        },
                                        {
                                            label: "Configurar Cargos",
                                            value: "config_roles",
                                            emoji: "1203415832936448023",
                                            description: "Configure os cargos"
                                        },
                                        {
                                            label: "Configurar Pagamentos",
                                            value: "config_payments",
                                            emoji: "1212460533186302044",
                                            description: "Configure o sistema de pagamentos"
                                        },
                                        {
                                            label: "Configurar Bot",
                                            value: "config_bot",
                                            emoji: "1207876800462585887",
                                            description: "Configure o bot (Status, Foto, Nome, Embeds)"
                                        },
                                        {
                                            label: "Gerenciar Ticket",
                                            value: "gerenciar_ticket",
                                            emoji: "1207877256861589514",
                                            description: "Adicione ou remova categorias do ticket"
                                        },
                                        {
                                            label: "Configurar Categorias",
                                            value: "config_categorias",
                                            emoji: "1203416928278945843",
                                            description: "Configure as categorias"
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
                    ],
                })
            }
            if (options === "config_canais") {
                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`Canais e Logs`)
                            .setDescription(`> Olá ${interaction.user}, aqui você pode gerenciar os **CANAIS & LOGS** do seu bot.`)
                            .setFields(
                                {
                                    name: `Logs Privadas`, value: `${interaction.guild.channels.cache.get(db.get(`channel_logs`)) ?? "`Não Definido`"}`, inline: true
                                },
                                {
                                    name: `   `, value: `   `, inline: true
                                },
                                {
                                    name: `Logs Avaliações`, value: `${interaction.guild.channels.cache.get(db.get(`channel_feedbacks`)) ?? "`Não Definido`"}`, inline: true
                                }
                            )
                            .setColor(`#00FFFF`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("channel_logs_button")
                                    .setLabel("Logs Privadas")
                                    .setStyle(1)
                                    .setEmoji("1203415970803220550"),
                                new ButtonBuilder()
                                    .setCustomId("channel_feedbacks_button")
                                    .setLabel("Logs Avaliações")
                                    .setStyle(1)
                                    .setEmoji("1203415970803220550"),
                                new ButtonBuilder()
                                    .setCustomId("voltar_logs")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056")
                                    .setLabel("Voltar")
                            )
                    ]
                })
            }
            if (options === "config_roles") {
                let a = ""
                db.get(`roles`).map((rs) => {

                    a += `\n- <@&${rs}>`
                })
                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${interaction.guild.name} | Cargos Perm`)
                            .setDescription(`> Olá ${interaction.user}, aqui você pode gerenciar os **CARGOS** com permissão\n${a}`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(

                                new RoleSelectMenuBuilder()
                                    .setCustomId("role_select")
                                    .setPlaceholder("Clique aqui para selecionar os cargos")
                                    .setMaxValues(10),
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("voltar_role")
                                    .setLabel("Voltar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056")
                            )
                    ]
                })
            }

            if (options === "config_payments") {
                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${interaction.guild.name} | Pagamentos`)
                            .setDescription(`- Olá ${interaction.user}, aqui você pode gerenciar os botão de **PAGAMENTO** do seu ticket`)
                            .addFields(
                                {
                                    name: `Sistema`, value: `${db.get("payments.sistema") !== false ? "\`🟢 Ativado\`" : "\`🔴 Desativado\`"}`, inline: true
                                },
                                {
                                    name: `Chave Pix`, value: `${db.get("payments.pix") !== null ? `\`${db.get("payments.pix")}\`` : "\`Não definido.\`"}`, inline: true
                                },
                                {
                                    name: `Qr Code`, value: `${db.get("payments.qrcode") !== null ? `**[Clique Aqui](${db.get("payments.qrcode")})**` : "\`Não definido.\`"}`, inline: true
                                }
                            )
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`paymentsOnOff`)
                                    .setLabel(`${db.get("payments.sistema") !== false ? "Desativar Sistema" : "Ativar Sistema"}`)
                                    .setEmoji(`${db.get("payments.sistema") !== false ? "1203416568021782568" : "1203424989173514321"}`)
                                    .setStyle(`${db.get("payments.sistema") !== false ? 4 : 3}`),
                                new ButtonBuilder()
                                    .setCustomId("configChavePix")
                                    .setLabel("Chave Pix")
                                    .setStyle(1)
                                    .setEmoji("1203416831730131036"),
                                new ButtonBuilder()
                                    .setCustomId("configQrCode")
                                    .setLabel("Qr Code")
                                    .setStyle(1)
                                    .setEmoji("1203416264836648970"),
                                new ButtonBuilder()
                                    .setCustomId("resetConfigsPayment")
                                    .setLabel("Resetar Configs")
                                    .setStyle(4)
                                    .setEmoji("1203416068966850653")
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("voltar_payments")
                                    .setLabel("Voltar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056")
                            )
                    ]
                })
            }

            if (options === "config_bot") {
                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${interaction.guild.name} | Configuração Bot`)
                            .setDescription(`- Olá senhor(a) ${interaction.user}, no select menu abaixo você pode configurar seu bot quando em **Foto, Nome, Status & Embeds** do seu Ticket!`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new StringSelectMenuBuilder()
                                    .addOptions(
                                        {
                                            label: "Foto do BOT",
                                            description: "Caso queira mudar a foto do bot clique aqui",
                                            emoji: `1203415908605886564`,
                                            value: "foto_bot",
                                        },
                                        {
                                            label: "Nome do BOT",
                                            description: "Caso queira mudar o nome do bot clique aqui",
                                            emoji: `1203415908605886564`,
                                            value: "nome_bot",
                                        },
                                        {
                                            label: "Status do BOT",
                                            description: "Caso queira mudar o STATUS do bot clique aqui",
                                            emoji: `1203415908605886564`,
                                            value: "status_bot"
                                        },
                                        {
                                            label: "Configurar Embeds",
                                            description: "Caso queira configurar a embed do bot clique aqui",
                                            emoji: `1203416954422173736`,
                                            value: "config_embed"
                                        }
                                    )
                                    .setCustomId("bot_select")
                                    .setPlaceholder("Selecione uma opção")
                                    .setMaxValues(1)
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("voltar_bot")
                                    .setLabel("Voltar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056")
                            )
                    ]
                })
            }
            if (options === "gerenciar_ticket") {
                const ticket = db.get(`ticket`)

                if (ticket.length <= 0) {
                    let a = "";
                    const ts = db.get(`ticket_default`)
                    ts.map((rs) => {
                        a += `\`type\` - ${rs.type} \n \`description\` - ${rs.description}\n\n`
                    })
                    interaction.update({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle(`${interaction.guild.name} | TICKET GESTÃO`)
                                .setDescription(`Segue abaixo a lista de Categorias De Tickets atual! \n\n ${a}`)
                        ],
                        components: [
                            new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId("addcategory")
                                        .setLabel("Adicionar Nova Categoria")
                                        .setStyle(3)
                                        .setEmoji("1203415950414585977"),
                                    new ButtonBuilder()
                                        .setCustomId("removecategory")
                                        .setLabel("Remover Uma Categoria")
                                        .setStyle(4)
                                        .setEmoji("1203416040638521424"),
                                    new ButtonBuilder()
                                        .setCustomId("resetcategoria")
                                        .setLabel("Voltar as defalts")
                                        .setStyle(2)
                                        .setEmoji("1203416068966850653"),
                                ),
                            new ActionRowBuilder()
                                .addComponents(
                                    new StringSelectMenuBuilder()
                                        .setPlaceholder("Selecione o dia da semana")
                                        .addOptions(
                                            {
                                                label: "Domingo",
                                                description: `Aberto ás ${db.get(`horario.domingo.aberto`)} & Fechado ás: ${db.get(`horario.domingo.fechado`)}`,
                                                value: "domingo"
                                            },
                                            {
                                                label: "Segunda-Feira",
                                                description: `Aberto ás ${db.get(`horario.segunda.aberto`)} & Fechado ás: ${db.get(`horario.segunda.fechado`)}`,
                                                value: "segunda"
                                            },
                                            {
                                                label: "Terça-Feira",
                                                description: `Aberto ás ${db.get(`horario.terca.aberto`)} & Fechado ás: ${db.get(`horario.terca.fechado`)}`,
                                                value: "terca"
                                            },
                                            {
                                                label: "Quarta-Feira",
                                                description: `Aberto ás ${db.get(`horario.quarta.aberto`)} & Fechado ás: ${db.get(`horario.quarta.fechado`)}`,
                                                value: "quarta"
                                            },
                                            {
                                                label: "Quinta-Feita",
                                                description: `Aberto ás ${db.get(`horario.quinta.aberto`)} & Fechado ás: ${db.get(`horario.quinta.fechado`)}`,
                                                value: "quinta"
                                            },
                                            {
                                                label: "Sexta-Feita",
                                                description: `Aberto ás ${db.get(`horario.sexta.aberto`)} & Fechado ás: ${db.get(`horario.sexta.fechado`)}`,
                                                value: "sexta"
                                            },
                                            {
                                                label: "Sabado",
                                                description: `Aberto ás ${db.get(`horario.sabado.aberto`)} & Fechado ás: ${db.get(`horario.sabado.fechado`)}`,
                                                value: "sabado"
                                            },
                                        )
                                        .setCustomId("horario_select")
                                ),
                            new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId("24hrs")
                                        .setLabel(db.get("24hrs") ? "24H Ativado" : "24H Desativado")
                                        .setEmoji("⏱️")
                                        .setStyle(db.get("24hrs") ? 3 : 4),
                                    new ButtonBuilder()
                                        .setCustomId("voltar_horario")
                                        .setLabel("Voltar")
                                        .setStyle(2)
                                        .setEmoji("1217286326064255056")
                                ),
                        ]
                    })
                } else {
                    let a = "";
                    ticket.map((rs) => {
                        a += `\`type\` - ${rs.type} \n \`description\` - ${rs.description}\n\n`
                    })
                    interaction.update({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle(`${interaction.guild.name} | TICKET GESTÃO`)
                                .setDescription(`Segue abaixo a lista de Categorias De Tickets atual! \n\n ${a}`)
                        ],
                        components: [
                            new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId("addcategory")
                                        .setLabel("Adicionar Nova Categoria")
                                        .setStyle(3)
                                        .setEmoji("1203415950414585977"),
                                    new ButtonBuilder()
                                        .setCustomId("removecategory")
                                        .setLabel("Remover Uma Categoria")
                                        .setStyle(4)
                                        .setEmoji("1203416040638521424"),
                                    new ButtonBuilder()
                                        .setCustomId("resetcategoria")
                                        .setLabel("Voltar as defalts")
                                        .setStyle(2)
                                        .setEmoji("1203416068966850653"),
                                ),
                            new ActionRowBuilder()
                                .addComponents(
                                    new StringSelectMenuBuilder()
                                        .setPlaceholder("Selecione o dia da semana")
                                        .addOptions(
                                            {
                                                label: "Domingo",
                                                description: `Aberto ás ${db.get(`horario.domingo.aberto`)} & Fechado ás: ${db.get(`horario.domingo.fechado`)}`,
                                                value: "domingo"
                                            },
                                            {
                                                label: "Segunda-Feira",
                                                description: `Aberto ás ${db.get(`horario.segunda.aberto`)} & Fechado ás: ${db.get(`horario.segunda.fechado`)}`,
                                                value: "segunda"
                                            },
                                            {
                                                label: "Terça-Feira",
                                                description: `Aberto ás ${db.get(`horario.terca.aberto`)} & Fechado ás: ${db.get(`horario.terca.fechado`)}`,
                                                value: "terca"
                                            },
                                            {
                                                label: "Quarta-Feira",
                                                description: `Aberto ás ${db.get(`horario.quarta.aberto`)} & Fechado ás: ${db.get(`horario.quarta.fechado`)}`,
                                                value: "quarta"
                                            },
                                            {
                                                label: "Quinta-Feita",
                                                description: `Aberto ás ${db.get(`horario.quinta.aberto`)} & Fechado ás: ${db.get(`horario.quinta.fechado`)}`,
                                                value: "quinta"
                                            },
                                            {
                                                label: "Sexta-Feita",
                                                description: `Aberto ás ${db.get(`horario.sexta.aberto`)} & Fechado ás: ${db.get(`horario.sexta.fechado`)}`,
                                                value: "sexta"
                                            },
                                            {
                                                label: "Sabado",
                                                description: `Aberto ás ${db.get(`horario.sabado.aberto`)} & Fechado ás: ${db.get(`horario.sabado.fechado`)}`,
                                                value: "sabado"
                                            },
                                        )
                                        .setCustomId("horario_select")
                                ),
                            new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId("24hrs")
                                        .setLabel(db.get("24hrs") ? "24H Ativado" : "24H Desativado")
                                        .setEmoji("⏱️")
                                        .setStyle(db.get("24hrs") ? 3 : 4),
                                    new ButtonBuilder()
                                        .setCustomId("voltar_horario")
                                        .setLabel("Voltar")
                                        .setStyle(2)
                                        .setEmoji("1217286326064255056")
                                ),
                        ]
                    })
                }
            }
        }


        if (interaction.isButton() && interaction.customId === "resetcategoria") {
            await db.set(`ticket`, [])
            await db.set(`horario`, {
                "sabado": {
                    "aberto": "00:00",
                    "fechado": "23:59"
                },
                "segunda": {
                    "aberto": "00:00",
                    "fechado": "23:59"
                },
                "terca": {
                    "aberto": "00:00",
                    "fechado": "23:59"
                },
                "quarta": {
                    "aberto": "00:00",
                    "fechado": "23:59"
                },
                "quinta": {
                    "aberto": "00:00",
                    "fechado": "23:59"
                },
                "sexta": {
                    "aberto": "00:00",
                    "fechado": "23:59"
                },
                "domingo": {
                    "aberto": "00:00",
                    "fechado": "23:59"
                }
            })
            const ticket = db.get(`ticket`) || []

            if (ticket.length <= 0) {
                let a = "";
                const ts = db.get(`ticket_default`)
                ts.map((rs) => {
                    a += `\`type\` - ${rs.type} \n \`description\` - ${rs.description}\n\n`
                })
                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${interaction.guild.name} | TICKET GESTÃO`)
                            .setDescription(`Segue abaixo a lista de Categorias De Tickets atual! \n\n ${a}`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("addcategory")
                                    .setLabel("Adicionar Nova Categoria")
                                    .setStyle(3)
                                    .setEmoji("1203415950414585977"),
                                new ButtonBuilder()
                                    .setCustomId("removecategory")
                                    .setLabel("Remover Uma Categoria")
                                    .setStyle(4)
                                    .setEmoji("1203416040638521424"),
                                new ButtonBuilder()
                                    .setCustomId("resetcategoria")
                                    .setLabel("Voltar as defalts")
                                    .setStyle(2)
                                    .setEmoji("1203416068966850653"),
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new StringSelectMenuBuilder()
                                    .setPlaceholder("Selecione o dia da semana")
                                    .addOptions(
                                        {
                                            label: "Domingo",
                                            description: `Aberto ás ${db.get(`horario.domingo.aberto`)} & Fechado ás: ${db.get(`horario.domingo.fechado`)}`,
                                            value: "domingo"
                                        },
                                        {
                                            label: "Segunda-Feira",
                                            description: `Aberto ás ${db.get(`horario.segunda.aberto`)} & Fechado ás: ${db.get(`horario.segunda.fechado`)}`,
                                            value: "segunda"
                                        },
                                        {
                                            label: "Terça-Feira",
                                            description: `Aberto ás ${db.get(`horario.terca.aberto`)} & Fechado ás: ${db.get(`horario.terca.fechado`)}`,
                                            value: "terca"
                                        },
                                        {
                                            label: "Quarta-Feira",
                                            description: `Aberto ás ${db.get(`horario.quarta.aberto`)} & Fechado ás: ${db.get(`horario.quarta.fechado`)}`,
                                            value: "quarta"
                                        },
                                        {
                                            label: "Quinta-Feita",
                                            description: `Aberto ás ${db.get(`horario.quinta.aberto`)} & Fechado ás: ${db.get(`horario.quinta.fechado`)}`,
                                            value: "quinta"
                                        },
                                        {
                                            label: "Sexta-Feita",
                                            description: `Aberto ás ${db.get(`horario.sexta.aberto`)} & Fechado ás: ${db.get(`horario.sexta.fechado`)}`,
                                            value: "sexta"
                                        },
                                        {
                                            label: "Sabado",
                                            description: `Aberto ás ${db.get(`horario.sabado.aberto`)} & Fechado ás: ${db.get(`horario.sabado.fechado`)}`,
                                            value: "sabado"
                                        },
                                    )
                                    .setCustomId("horario_select")
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("24hrs")
                                    .setLabel(db.get("24hrs") ? "24H Ativado" : "24H Desativado")
                                    .setEmoji("⏱️")
                                    .setStyle(db.get("24hrs") ? 3 : 4),
                                new ButtonBuilder()
                                    .setCustomId("voltar_horario")
                                    .setLabel("Voltar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056")
                            ),
                    ]
                })
            } else {
                let a = "";
                ticket.map((rs) => {
                    a += `\`type\` - ${rs.type} \n \`description\` - ${rs.description}\n\n`
                })
                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${interaction.guild.name} | TICKET GESTÃO`)
                            .setDescription(`Segue abaixo a lista de Categorias De Tickets atual! \n\n ${a}`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("addcategory")
                                    .setLabel("Adicionar Nova Categoria")
                                    .setStyle(3)
                                    .setEmoji("1203415950414585977"),
                                new ButtonBuilder()
                                    .setCustomId("removecategory")
                                    .setLabel("Remover Uma Categoria")
                                    .setStyle(4)
                                    .setEmoji("1203416040638521424"),
                                new ButtonBuilder()
                                    .setCustomId("resetcategoria")
                                    .setLabel("Voltar as defalts")
                                    .setStyle(2)
                                    .setEmoji("1203416068966850653"),
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new StringSelectMenuBuilder()
                                    .setPlaceholder("Selecione o dia da semana")
                                    .addOptions(
                                        {
                                            label: "Domingo",
                                            description: `Aberto ás ${db.get(`horario.domingo.aberto`)} & Fechado ás: ${db.get(`horario.domingo.fechado`)}`,
                                            value: "domingo"
                                        },
                                        {
                                            label: "Segunda-Feira",
                                            description: `Aberto ás ${db.get(`horario.segunda.aberto`)} & Fechado ás: ${db.get(`horario.segunda.fechado`)}`,
                                            value: "segunda"
                                        },
                                        {
                                            label: "Terça-Feira",
                                            description: `Aberto ás ${db.get(`horario.terca.aberto`)} & Fechado ás: ${db.get(`horario.terca.fechado`)}`,
                                            value: "terca"
                                        },
                                        {
                                            label: "Quarta-Feira",
                                            description: `Aberto ás ${db.get(`horario.quarta.aberto`)} & Fechado ás: ${db.get(`horario.quarta.fechado`)}`,
                                            value: "quarta"
                                        },
                                        {
                                            label: "Quinta-Feita",
                                            description: `Aberto ás ${db.get(`horario.quinta.aberto`)} & Fechado ás: ${db.get(`horario.quinta.fechado`)}`,
                                            value: "quinta"
                                        },
                                        {
                                            label: "Sexta-Feita",
                                            description: `Aberto ás ${db.get(`horario.sexta.aberto`)} & Fechado ás: ${db.get(`horario.sexta.fechado`)}`,
                                            value: "sexta"
                                        },
                                        {
                                            label: "Sabado",
                                            description: `Aberto ás ${db.get(`horario.sabado.aberto`)} & Fechado ás: ${db.get(`horario.sabado.fechado`)}`,
                                            value: "sabado"
                                        },
                                    )
                                    .setCustomId("horario_select")
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("24hrs")
                                    .setLabel(db.get("24hrs") ? "24H Ativado" : "24H Desativado")
                                    .setEmoji("⏱️")
                                    .setStyle(db.get("24hrs") ? 3 : 4),
                                new ButtonBuilder()
                                    .setCustomId("voltar_horario")
                                    .setLabel("Voltar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056")
                            ),
                    ]
                })
            }

        }


        if (interaction.isStringSelectMenu() && interaction.customId === "horario_select") {
            const options = interaction.values[0]


            if (options === "domingo") {
                const modal = new ModalBuilder()
                    .setCustomId("domingo_modal")
                    .setTitle("💢 - Alterar Horario Atendimento!");

                const text = new TextInputBuilder()
                    .setCustomId("abertura")
                    .setLabel("NOVO HORÁRIO DE ABERTURA?")
                    .setStyle(1)
                    .setMinLength(5)
                    .setMaxLength(5)
                    .setRequired(true);

                const text1 = new TextInputBuilder()
                    .setCustomId("fechamento")
                    .setLabel("NOVO HORÁRIO DE FECHAMENTO?")
                    .setStyle(1)
                    .setMinLength(5)
                    .setMaxLength(5)
                    .setRequired(true);


                modal.addComponents(new ActionRowBuilder().addComponents(text));
                modal.addComponents(new ActionRowBuilder().addComponents(text1));

                return interaction.showModal(modal)

            }

            if (options === "segunda") {
                const modal = new ModalBuilder()
                    .setCustomId("segunda_modal")
                    .setTitle("💢 - Alterar Horario Atendimento!");

                const text = new TextInputBuilder()
                    .setCustomId("abertura")
                    .setLabel("NOVO HORÁRIO DE ABERTURA?")
                    .setStyle(1)
                    .setMinLength(5)
                    .setMaxLength(5)
                    .setRequired(true);

                const text1 = new TextInputBuilder()
                    .setCustomId("fechamento")
                    .setLabel("NOVO HORÁRIO DE FECHAMENTO?")
                    .setStyle(1)
                    .setMinLength(5)
                    .setMaxLength(5)
                    .setRequired(true);


                modal.addComponents(new ActionRowBuilder().addComponents(text));
                modal.addComponents(new ActionRowBuilder().addComponents(text1));

                return interaction.showModal(modal)
            }
            if (options === "terca") {
                const modal = new ModalBuilder()
                    .setCustomId("terca_modal")
                    .setTitle("💢 - Alterar Horario Atendimento!");

                const text = new TextInputBuilder()
                    .setCustomId("abertura")
                    .setLabel("NOVO HORÁRIO DE  ABERTURA?")
                    .setStyle(1)
                    .setMinLength(5)
                    .setMaxLength(5)
                    .setRequired(true);

                const text1 = new TextInputBuilder()
                    .setCustomId("fechamento")
                    .setLabel("NOVO HORÁRIO DE FECHAMENTO?")
                    .setStyle(1)
                    .setMinLength(5)
                    .setMaxLength(5)
                    .setRequired(true);


                modal.addComponents(new ActionRowBuilder().addComponents(text));
                modal.addComponents(new ActionRowBuilder().addComponents(text1));

                return interaction.showModal(modal)
            }
            if (options === "quarta") {
                const modal = new ModalBuilder()
                    .setCustomId("quarta_modal")
                    .setTitle("💢 - Alterar Horario Atendimento!");

                const text = new TextInputBuilder()
                    .setCustomId("abertura")
                    .setLabel("NOVO HORÁRIO DE  ABERTURA?")
                    .setStyle(1)
                    .setMinLength(5)
                    .setMaxLength(5)
                    .setRequired(true);

                const text1 = new TextInputBuilder()
                    .setCustomId("fechamento")
                    .setLabel("NOVO HORÁRIO DE FECHAMENTO?")
                    .setStyle(1)
                    .setMinLength(5)
                    .setMaxLength(5)
                    .setRequired(true);


                modal.addComponents(new ActionRowBuilder().addComponents(text));
                modal.addComponents(new ActionRowBuilder().addComponents(text1));

                return interaction.showModal(modal)
            }
            if (options === "quinta") {
                const modal = new ModalBuilder()
                    .setCustomId("quinta_modal")
                    .setTitle("💢 - Alterar Horario Atendimento!");

                const text = new TextInputBuilder()
                    .setCustomId("abertura")
                    .setLabel("NOVO HORÁRIO DE  ABERTURA?")
                    .setStyle(1)
                    .setMinLength(5)
                    .setMaxLength(5)
                    .setRequired(true);

                const text1 = new TextInputBuilder()
                    .setCustomId("fechamento")
                    .setLabel("NOVO HORÁRIO DE FECHAMENTO?")
                    .setStyle(1)
                    .setMinLength(5)
                    .setMaxLength(5)
                    .setRequired(true);


                modal.addComponents(new ActionRowBuilder().addComponents(text));
                modal.addComponents(new ActionRowBuilder().addComponents(text1));

                return interaction.showModal(modal)
            }
            if (options === "sexta") {
                const modal = new ModalBuilder()
                    .setCustomId("sexta_modal")
                    .setTitle("💢 - Alterar Horario Atendimento!");

                const text = new TextInputBuilder()
                    .setCustomId("abertura")
                    .setLabel("NOVO HORÁRIO DE  ABERTURA?")
                    .setStyle(1)
                    .setMinLength(5)
                    .setMaxLength(5)
                    .setRequired(true);

                const text1 = new TextInputBuilder()
                    .setCustomId("fechamento")
                    .setLabel("NOVO HORÁRIO DE FECHAMENTO?")
                    .setStyle(1)
                    .setMinLength(5)
                    .setMaxLength(5)
                    .setRequired(true);


                modal.addComponents(new ActionRowBuilder().addComponents(text));
                modal.addComponents(new ActionRowBuilder().addComponents(text1));

                return interaction.showModal(modal)
            }
            if (options === "sabado") {
                const modal = new ModalBuilder()
                    .setCustomId("sabado_modal")
                    .setTitle("💢 - Alterar Horario Atendimento!");

                const text = new TextInputBuilder()
                    .setCustomId("abertura")
                    .setLabel("NOVO HORÁRIO DE  ABERTURA?")
                    .setStyle(1)
                    .setMinLength(5)
                    .setMaxLength(5)
                    .setRequired(true);

                const text1 = new TextInputBuilder()
                    .setCustomId("fechamento")
                    .setLabel("NOVO HORÁRIO DE FECHAMENTO?")
                    .setStyle(1)
                    .setMinLength(5)
                    .setMaxLength(5)
                    .setRequired(true);


                modal.addComponents(new ActionRowBuilder().addComponents(text));
                modal.addComponents(new ActionRowBuilder().addComponents(text1));

                return interaction.showModal(modal)
            }

        }
        if (interaction.isModalSubmit() && interaction.customId === "domingo_modal") {
            const abertura = interaction.fields.getTextInputValue("abertura")
            const fechamento = interaction.fields.getTextInputValue("fechamento")

            function validaHorario(abertura, fechamento) {

                if (!validaFormatoHora(abertura) || !validaFormatoHora(fechamento)) {
                    return false;
                }


                const aberturaDate = new Date(`2024-01-01T${abertura}`);
                const fechamentoDate = new Date(`2024-01-01T${fechamento}`);


                if (fechamentoDate <= aberturaDate) {
                    return false;
                }

                const limiteMaximo = new Date(`2024-01-01T23:59`);
                if (aberturaDate > limiteMaximo || fechamentoDate > limiteMaximo) {
                    return false;
                }

                return true;
            }

            if (!validaHorario(abertura, fechamento)) {
                interaction.reply({ content: "Horários inválidos, verifique as regras.", ephemeral: true });
                return;
            }


            await db.set("horario.domingo.aberto", abertura);
            await db.set("horario.domingo.fechado", fechamento);
            config_bot();


        }


        if (interaction.isModalSubmit() && interaction.customId === "segunda_modal") {
            const abertura = interaction.fields.getTextInputValue("abertura")
            const fechamento = interaction.fields.getTextInputValue("fechamento")

            function validaHorario(abertura, fechamento) {

                if (!validaFormatoHora(abertura) || !validaFormatoHora(fechamento)) {
                    return false;
                }


                const aberturaDate = new Date(`2024-01-01T${abertura}`);
                const fechamentoDate = new Date(`2024-01-01T${fechamento}`);


                if (fechamentoDate <= aberturaDate) {
                    return false;
                }

                const limiteMaximo = new Date(`2024-01-01T23:59`);
                if (aberturaDate > limiteMaximo || fechamentoDate > limiteMaximo) {
                    return false;
                }

                return true;
            }

            if (!validaHorario(abertura, fechamento)) {
                interaction.reply({ content: "Horários inválidos, verifique as regras.", ephemeral: true });
                return;
            }

            await db.set("horario.segunda.aberto", abertura)
            await db.set("horario.segunda.fechado", fechamento)
            config_bot()
        }


        if (interaction.isModalSubmit() && interaction.customId === "terca_modal") {
            const abertura = interaction.fields.getTextInputValue("abertura")
            const fechamento = interaction.fields.getTextInputValue("fechamento")

            function validaHorario(abertura, fechamento) {

                if (!validaFormatoHora(abertura) || !validaFormatoHora(fechamento)) {
                    return false;
                }


                const aberturaDate = new Date(`2024-01-01T${abertura}`);
                const fechamentoDate = new Date(`2024-01-01T${fechamento}`);


                if (fechamentoDate <= aberturaDate) {
                    return false;
                }

                const limiteMaximo = new Date(`2024-01-01T23:59`);
                if (aberturaDate > limiteMaximo || fechamentoDate > limiteMaximo) {
                    return false;
                }

                return true;
            }

            if (!validaHorario(abertura, fechamento)) {
                interaction.reply({ content: "Horários inválidos, verifique as regras.", ephemeral: true });
                return;
            }
            await db.set("horario.terca.aberto", abertura)
            await db.set("horario.terca.fechado", fechamento)

            config_bot()
        }


        if (interaction.isModalSubmit() && interaction.customId === "quarta_modal") {
            const abertura = interaction.fields.getTextInputValue("abertura")
            const fechamento = interaction.fields.getTextInputValue("fechamento")

            function validaHorario(abertura, fechamento) {

                if (!validaFormatoHora(abertura) || !validaFormatoHora(fechamento)) {
                    return false;
                }


                const aberturaDate = new Date(`2024-01-01T${abertura}`);
                const fechamentoDate = new Date(`2024-01-01T${fechamento}`);


                if (fechamentoDate <= aberturaDate) {
                    return false;
                }

                const limiteMaximo = new Date(`2024-01-01T23:59`);
                if (aberturaDate > limiteMaximo || fechamentoDate > limiteMaximo) {
                    return false;
                }

                return true;
            }

            if (!validaHorario(abertura, fechamento)) {
                interaction.reply({ content: "Horários inválidos, verifique as regras.", ephemeral: true });
                return;
            }
            await db.set("horario.quarta.aberto", abertura)
            await db.set("horario.quarta.fechado", fechamento)

            config_bot()
        }


        if (interaction.isModalSubmit() && interaction.customId === "quinta_modal") {
            const abertura = interaction.fields.getTextInputValue("abertura")
            const fechamento = interaction.fields.getTextInputValue("fechamento")

            function validaHorario(abertura, fechamento) {

                if (!validaFormatoHora(abertura) || !validaFormatoHora(fechamento)) {
                    return false;
                }


                const aberturaDate = new Date(`2024-01-01T${abertura}`);
                const fechamentoDate = new Date(`2024-01-01T${fechamento}`);


                if (fechamentoDate <= aberturaDate) {
                    return false;
                }

                const limiteMaximo = new Date(`2024-01-01T23:59`);
                if (aberturaDate > limiteMaximo || fechamentoDate > limiteMaximo) {
                    return false;
                }

                return true;
            }

            if (!validaHorario(abertura, fechamento)) {
                interaction.reply({ content: "Horários inválidos, verifique as regras.", ephemeral: true });
                return;
            }
            await db.set("horario.quinta.aberto", abertura)
            await db.set("horario.quinta.fechado", fechamento)
            config_bot()

        }


        if (interaction.isModalSubmit() && interaction.customId === "sexta_modal") {
            const abertura = interaction.fields.getTextInputValue("abertura")
            const fechamento = interaction.fields.getTextInputValue("fechamento")

            function validaHorario(abertura, fechamento) {

                if (!validaFormatoHora(abertura) || !validaFormatoHora(fechamento)) {
                    return false;
                }


                const aberturaDate = new Date(`2024-01-01T${abertura}`);
                const fechamentoDate = new Date(`2024-01-01T${fechamento}`);


                if (fechamentoDate <= aberturaDate) {
                    return false;
                }

                const limiteMaximo = new Date(`2024-01-01T23:59`);
                if (aberturaDate > limiteMaximo || fechamentoDate > limiteMaximo) {
                    return false;
                }

                return true;
            }

            if (!validaHorario(abertura, fechamento)) {
                interaction.reply({ content: "Horários inválidos, verifique as regras.", ephemeral: true });
                return;
            }
            await db.set("horario.sexta.aberto", abertura)
            await db.set("horario.sexta.fechado", fechamento)

            config_bot()
        }


        if (interaction.isModalSubmit() && interaction.customId === "sabado_modal") {
            const abertura = interaction.fields.getTextInputValue("abertura")
            const fechamento = interaction.fields.getTextInputValue("fechamento")

            function validaHorario(abertura, fechamento) {

                if (!validaFormatoHora(abertura) || !validaFormatoHora(fechamento)) {
                    return false;
                }


                const aberturaDate = new Date(`2024-01-01T${abertura}`);
                const fechamentoDate = new Date(`2024-01-01T${fechamento}`);


                if (fechamentoDate <= aberturaDate) {
                    return false;
                }

                const limiteMaximo = new Date(`2024-01-01T23:59`);
                if (aberturaDate > limiteMaximo || fechamentoDate > limiteMaximo) {
                    return false;
                }

                return true;
            }

            if (!validaHorario(abertura, fechamento)) {
                interaction.reply({ content: "Horários inválidos, verifique as regras.", ephemeral: true });
                return;
            }
            await db.set("horario.sabado.aberto", abertura)
            await db.set("horario.sabado.fechado", fechamento)
            config_bot()

        }



        if (interaction.isButton() && interaction.customId === "removecategory") {
            const modal = new ModalBuilder()
                .setCustomId("removecategory_modal")
                .setTitle("💢 - Remover Categoria");

            const text = new TextInputBuilder()
                .setCustomId("text")
                .setLabel("QUAL É O TYPE DA CATEGORIA?")
                .setStyle(1)
                .setPlaceholder("Exemplo: Suporte")
                .setRequired(true);

            modal.addComponents(new ActionRowBuilder().addComponents(text));

            return interaction.showModal(modal);
        }
        if (interaction.isModalSubmit() && interaction.customId === "removecategory_modal") {
            const text = interaction.fields.getTextInputValue("text");
            const a = db.get(`ticket`)
            db.set(`ticket`, [])
            a.map((rs) => {
                if (rs.type !== text) {
                    db.push(`ticket`,
                        {
                            "type": rs.type,
                            "description": rs.description,
                            "emoji": rs.emoji,
                            "categoria": rs.categoria
                        }
                    )
                }
            })
            const ticket = db.get(`ticket`) || []

            if (ticket.length <= 0) {
                let a = "";
                const ts = db.get(`ticket_default`)
                ts.map((rs) => {
                    a += `\`type\` - ${rs.type} \n \`description\` - ${rs.description}\n\n`
                })
                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${interaction.guild.name} | TICKET GESTÃO`)
                            .setDescription(`Segue abaixo a lista de Categorias De Tickets atual! \n\n ${a}`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("addcategory")
                                    .setLabel("Adicionar Nova Categoria")
                                    .setStyle(3)
                                    .setEmoji("1203415950414585977"),
                                new ButtonBuilder()
                                    .setCustomId("removecategory")
                                    .setLabel("Remover Uma Categoria")
                                    .setStyle(4)
                                    .setEmoji("1203416040638521424"),
                                new ButtonBuilder()
                                    .setCustomId("resetcategoria")
                                    .setLabel("Voltar as defalts")
                                    .setStyle(2)
                                    .setEmoji("1203416068966850653"),
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new StringSelectMenuBuilder()
                                    .setPlaceholder("Selecione o dia da semana")
                                    .addOptions(
                                        {
                                            label: "Domingo",
                                            description: `Aberto ás ${db.get(`horario.domingo.aberto`)} & Fechado ás: ${db.get(`horario.domingo.fechado`)}`,
                                            value: "domingo"
                                        },
                                        {
                                            label: "Segunda-Feira",
                                            description: `Aberto ás ${db.get(`horario.segunda.aberto`)} & Fechado ás: ${db.get(`horario.segunda.fechado`)}`,
                                            value: "segunda"
                                        },
                                        {
                                            label: "Terça-Feira",
                                            description: `Aberto ás ${db.get(`horario.terca.aberto`)} & Fechado ás: ${db.get(`horario.terca.fechado`)}`,
                                            value: "terca"
                                        },
                                        {
                                            label: "Quarta-Feira",
                                            description: `Aberto ás ${db.get(`horario.quarta.aberto`)} & Fechado ás: ${db.get(`horario.quarta.fechado`)}`,
                                            value: "quarta"
                                        },
                                        {
                                            label: "Quinta-Feita",
                                            description: `Aberto ás ${db.get(`horario.quinta.aberto`)} & Fechado ás: ${db.get(`horario.quinta.fechado`)}`,
                                            value: "quinta"
                                        },
                                        {
                                            label: "Sexta-Feita",
                                            description: `Aberto ás ${db.get(`horario.sexta.aberto`)} & Fechado ás: ${db.get(`horario.sexta.fechado`)}`,
                                            value: "sexta"
                                        },
                                        {
                                            label: "Sabado",
                                            description: `Aberto ás ${db.get(`horario.sabado.aberto`)} & Fechado ás: ${db.get(`horario.sabado.fechado`)}`,
                                            value: "sabado"
                                        },
                                    )
                                    .setCustomId("horario_select")
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("24hrs")
                                    .setLabel(db.get("24hrs") ? "24H Ativado" : "24H Desativado")
                                    .setEmoji("⏱️")
                                    .setStyle(db.get("24hrs") ? 3 : 4),
                                new ButtonBuilder()
                                    .setCustomId("voltar_horario")
                                    .setLabel("Voltar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056")
                            ),
                    ]
                })
            } else {
                let a = "";
                ticket.map((rs) => {
                    a += `\`type\` - ${rs.type} \n \`description\` - ${rs.description}\n\n`
                })
                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${interaction.guild.name} | TICKET GESTÃO`)
                            .setDescription(`Segue abaixo a lista de Categorias De Tickets atual! \n\n ${a}`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("addcategory")
                                    .setLabel("Adicionar Nova Categoria")
                                    .setStyle(3)
                                    .setEmoji("1203415950414585977"),
                                new ButtonBuilder()
                                    .setCustomId("removecategory")
                                    .setLabel("Remover Uma Categoria")
                                    .setStyle(4)
                                    .setEmoji("1203416040638521424"),
                                new ButtonBuilder()
                                    .setCustomId("resetcategoria")
                                    .setLabel("Voltar as defalts")
                                    .setStyle(2)
                                    .setEmoji("1203416068966850653"),
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new StringSelectMenuBuilder()
                                    .setPlaceholder("Selecione o dia da semana")
                                    .addOptions(
                                        {
                                            label: "Domingo",
                                            description: `Aberto ás ${db.get(`horario.domingo.aberto`)} & Fechado ás: ${db.get(`horario.domingo.fechado`)}`,
                                            value: "domingo"
                                        },
                                        {
                                            label: "Segunda-Feira",
                                            description: `Aberto ás ${db.get(`horario.segunda.aberto`)} & Fechado ás: ${db.get(`horario.segunda.fechado`)}`,
                                            value: "segunda"
                                        },
                                        {
                                            label: "Terça-Feira",
                                            description: `Aberto ás ${db.get(`horario.terca.aberto`)} & Fechado ás: ${db.get(`horario.terca.fechado`)}`,
                                            value: "terca"
                                        },
                                        {
                                            label: "Quarta-Feira",
                                            description: `Aberto ás ${db.get(`horario.quarta.aberto`)} & Fechado ás: ${db.get(`horario.quarta.fechado`)}`,
                                            value: "quarta"
                                        },
                                        {
                                            label: "Quinta-Feita",
                                            description: `Aberto ás ${db.get(`horario.quinta.aberto`)} & Fechado ás: ${db.get(`horario.quinta.fechado`)}`,
                                            value: "quinta"
                                        },
                                        {
                                            label: "Sexta-Feita",
                                            description: `Aberto ás ${db.get(`horario.sexta.aberto`)} & Fechado ás: ${db.get(`horario.sexta.fechado`)}`,
                                            value: "sexta"
                                        },
                                        {
                                            label: "Sabado",
                                            description: `Aberto ás ${db.get(`horario.sabado.aberto`)} & Fechado ás: ${db.get(`horario.sabado.fechado`)}`,
                                            value: "sabado"
                                        },
                                    )
                                    .setCustomId("horario_select")
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("24hrs")
                                    .setLabel(db.get("24hrs") ? "24H Ativado" : "24H Desativado")
                                    .setEmoji("⏱️")
                                    .setStyle(db.get("24hrs") ? 3 : 4),
                                new ButtonBuilder()
                                    .setCustomId("voltar_horario")
                                    .setLabel("Voltar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056")
                            ),
                    ]
                })
            }
        }




        if (interaction.isButton() && interaction.customId === "addcategory") {
            const modal = new ModalBuilder()
                .setCustomId("addcategory_modal")
                .setTitle("💢 - Adicionar Categoria");

            const text = new TextInputBuilder()
                .setCustomId("text")
                .setLabel("QUAL NOME DA NOVA CATEGORIA?")
                .setStyle(1)
                .setPlaceholder("Exemplo: Suporte")
                .setRequired(true);

            modal.addComponents(new ActionRowBuilder().addComponents(text));

            return interaction.showModal(modal);
        }
        if (interaction.isModalSubmit() && interaction.customId === "addcategory_modal") {
            const text = interaction.fields.getTextInputValue("text");
            await db.push(`ticket`, {
                "type": `${text}`,
                "description": `Caso precise de ${text} clique aqui.`,
                "emoji": "🎫",
                "categoria": "Não Definido"
            })
            const ticket = db.get(`ticket`)

            if (ticket.length <= 0) {
                let a = "";
                const ts = db.get(`ticket_default`)
                ts.map((rs) => {
                    a += `\`type\` - ${rs.type} \n \`description\` - ${rs.description}\n\n`
                })
                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${interaction.guild.name} | TICKET GESTÃO`)
                            .setDescription(`Segue abaixo a lista de Categorias De Tickets atual! \n\n ${a}`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("addcategory")
                                    .setLabel("Adicionar Nova Categoria")
                                    .setStyle(3)
                                    .setEmoji("1203415950414585977"),
                                new ButtonBuilder()
                                    .setCustomId("removecategory")
                                    .setLabel("Remover Uma Categoria")
                                    .setStyle(4)
                                    .setEmoji("1203416040638521424"),
                                new ButtonBuilder()
                                    .setCustomId("resetcategoria")
                                    .setLabel("Voltar as defalts")
                                    .setStyle(2)
                                    .setEmoji("1203416068966850653"),
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new StringSelectMenuBuilder()
                                    .setPlaceholder("Selecione o dia da semana")
                                    .addOptions(
                                        {
                                            label: "Domingo",
                                            description: `Aberto ás ${db.get(`horario.domingo.aberto`)} & Fechado ás: ${db.get(`horario.domingo.fechado`)}`,
                                            value: "domingo"
                                        },
                                        {
                                            label: "Segunda-Feira",
                                            description: `Aberto ás ${db.get(`horario.segunda.aberto`)} & Fechado ás: ${db.get(`horario.segunda.fechado`)}`,
                                            value: "segunda"
                                        },
                                        {
                                            label: "Terça-Feira",
                                            description: `Aberto ás ${db.get(`horario.terca.aberto`)} & Fechado ás: ${db.get(`horario.terca.fechado`)}`,
                                            value: "terca"
                                        },
                                        {
                                            label: "Quarta-Feira",
                                            description: `Aberto ás ${db.get(`horario.quarta.aberto`)} & Fechado ás: ${db.get(`horario.quarta.fechado`)}`,
                                            value: "quarta"
                                        },
                                        {
                                            label: "Quinta-Feita",
                                            description: `Aberto ás ${db.get(`horario.quinta.aberto`)} & Fechado ás: ${db.get(`horario.quinta.fechado`)}`,
                                            value: "quinta"
                                        },
                                        {
                                            label: "Sexta-Feita",
                                            description: `Aberto ás ${db.get(`horario.sexta.aberto`)} & Fechado ás: ${db.get(`horario.sexta.fechado`)}`,
                                            value: "sexta"
                                        },
                                        {
                                            label: "Sabado",
                                            description: `Aberto ás ${db.get(`horario.sabado.aberto`)} & Fechado ás: ${db.get(`horario.sabado.fechado`)}`,
                                            value: "sabado"
                                        },
                                    )
                                    .setCustomId("horario_select")
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("24hrs")
                                    .setLabel(db.get("24hrs") ? "24H Ativado" : "24H Desativado")
                                    .setEmoji("⏱️")
                                    .setStyle(db.get("24hrs") ? 3 : 4),
                                new ButtonBuilder()
                                    .setCustomId("voltar_horario")
                                    .setLabel("Voltar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056")
                            ),
                    ]
                })
            } else {
                let a = "";
                ticket.map((rs) => {
                    a += `\`type\` - ${rs.type} \n \`description\` - ${rs.description}\n\n`
                })
                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${interaction.guild.name} | TICKET GESTÃO`)
                            .setDescription(`Segue abaixo a lista de Categorias De Tickets atual! \n\n ${a}`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("addcategory")
                                    .setLabel("Adicionar Nova Categoria")
                                    .setStyle(3)
                                    .setEmoji("1203415950414585977"),
                                new ButtonBuilder()
                                    .setCustomId("removecategory")
                                    .setLabel("Remover Uma Categoria")
                                    .setStyle(4)
                                    .setEmoji("1203416040638521424"),
                                new ButtonBuilder()
                                    .setCustomId("resetcategoria")
                                    .setLabel("Voltar as defalts")
                                    .setStyle(2)
                                    .setEmoji("1203416068966850653"),
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new StringSelectMenuBuilder()
                                    .setPlaceholder("Selecione o dia da semana")
                                    .addOptions(
                                        {
                                            label: "Domingo",
                                            description: `Aberto ás ${db.get(`horario.domingo.aberto`)} & Fechado ás: ${db.get(`horario.domingo.fechado`)}`,
                                            value: "domingo"
                                        },
                                        {
                                            label: "Segunda-Feira",
                                            description: `Aberto ás ${db.get(`horario.segunda.aberto`)} & Fechado ás: ${db.get(`horario.segunda.fechado`)}`,
                                            value: "segunda"
                                        },
                                        {
                                            label: "Terça-Feira",
                                            description: `Aberto ás ${db.get(`horario.terca.aberto`)} & Fechado ás: ${db.get(`horario.terca.fechado`)}`,
                                            value: "terca"
                                        },
                                        {
                                            label: "Quarta-Feira",
                                            description: `Aberto ás ${db.get(`horario.quarta.aberto`)} & Fechado ás: ${db.get(`horario.quarta.fechado`)}`,
                                            value: "quarta"
                                        },
                                        {
                                            label: "Quinta-Feita",
                                            description: `Aberto ás ${db.get(`horario.quinta.aberto`)} & Fechado ás: ${db.get(`horario.quinta.fechado`)}`,
                                            value: "quinta"
                                        },
                                        {
                                            label: "Sexta-Feita",
                                            description: `Aberto ás ${db.get(`horario.sexta.aberto`)} & Fechado ás: ${db.get(`horario.sexta.fechado`)}`,
                                            value: "sexta"
                                        },
                                        {
                                            label: "Sabado",
                                            description: `Aberto ás ${db.get(`horario.sabado.aberto`)} & Fechado ás: ${db.get(`horario.sabado.fechado`)}`,
                                            value: "sabado"
                                        },
                                    )
                                    .setCustomId("horario_select")
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("24hrs")
                                    .setLabel(db.get("24hrs") ? "24H Ativado" : "24H Desativado")
                                    .setEmoji("⏱️")
                                    .setStyle(db.get("24hrs") ? 3 : 4),
                                new ButtonBuilder()
                                    .setCustomId("voltar_horario")
                                    .setLabel("Voltar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056")
                            ),
                    ]
                })
            }
        }

        if (interaction.isStringSelectMenu() && interaction.customId === "bot_select") {

            const options = interaction.values[0];
            if (options === "foto_bot") {
                const modal = new ModalBuilder()
                    .setTitle("✏ | Alterar a Foto do BOT")
                    .setCustomId("foto_bot_modal");

                const text = new TextInputBuilder()
                    .setCustomId("text")
                    .setStyle(1)
                    .setRequired(true)
                    .setPlaceholder("https://")
                    .setLabel("QUAL É O LINK DA IMAGEM?");

                modal.addComponents(new ActionRowBuilder().addComponents(text));
                return interaction.showModal(modal)
            }
            if (options === "nome_bot") {
                const modal = new ModalBuilder()
                    .setTitle("✏ | Alterar Nome do BOT")
                    .setCustomId("nome_bot_modal");

                const text = new TextInputBuilder()
                    .setCustomId("text")
                    .setStyle(1)
                    .setRequired(true)
                    .setLabel("QUAL VAI SER O NOME DO BOT?");

                modal.addComponents(new ActionRowBuilder().addComponents(text));
                return interaction.showModal(modal)
            }

            if (options === "status_bot") {
                const modal = new ModalBuilder()
                    .setTitle("Alterar Status do seu BOT")
                    .setCustomId("status_bot_modal");

                const text = new TextInputBuilder()
                    .setCustomId("presence")
                    .setRequired(true)
                    .setPlaceholder("Online, Ausente, Invisivel ou Não Pertubar")
                    .setLabel("ESCOLHA O TIPO DE PRESENÇA:")
                    .setStyle(1);

                const text1 = new TextInputBuilder()
                    .setCustomId("atividade")
                    .setRequired(true)
                    .setPlaceholder("Jogando, Assistindo, Competindo, Transmitindo, Ouvindo")
                    .setLabel("ESCOLHA O TIPO DE ATIVIDADE:")
                    .setStyle(1);

                const text2 = new TextInputBuilder()
                    .setCustomId("text_ativd")
                    .setRequired(true)
                    .setPlaceholder("Suporte Online")
                    .setLabel("ESCREVA O TEXTO DA ATIVIDADE:")
                    .setStyle(1);

                const text3 = new TextInputBuilder()
                    .setCustomId("url")
                    .setRequired(false)
                    .setLabel("URL DO CANAL:")
                    .setPlaceholder("Se a escolha foi Transmitindo, Coloque a Url aqui, ex: https://www.twitch.tv/discord")
                    .setStyle(2);

                modal.addComponents(new ActionRowBuilder().addComponents(text));
                modal.addComponents(new ActionRowBuilder().addComponents(text1));
                modal.addComponents(new ActionRowBuilder().addComponents(text2));
                modal.addComponents(new ActionRowBuilder().addComponents(text3));

                return interaction.showModal(modal);
            }

            if (options === "config_embed") {
                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${interaction.guild.name} | Embeds`)
                            .setDescription(`- ${interaction.user}, para alterar as embeds do seu bot e alguns emojis dentro do seu ticket basta apenas usar o menu abaixo:`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new StringSelectMenuBuilder()
                                    .addOptions(
                                        {
                                            label: "Embed Fora do Ticket",
                                            description: "Caso queira mudar a EMBED FORA clique aqui",
                                            value: "embed_fora",
                                            emoji: "1203416954422173736"
                                        },
                                        {
                                            label: "Embed Dentro do Ticket",
                                            description: "Caso queira mudar a EMBED DENTRO clique aqui",
                                            value: "embed_dentro",
                                            emoji: "1203416954422173736"
                                        },
                                        {
                                            label: "Botões dentro de Ticket",
                                            description: "Caso queira mudar os BOTÕES clique aqui",
                                            value: "button_ticket",
                                            emoji: "1203416954422173736"
                                        },

                                    )
                                    .setCustomId("config_embedsss")
                                    .setMaxValues(1)
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("vosltasdsad")
                                    .setLabel("Voltar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056")
                            )
                    ]
                })
            }
        }
        if (interaction.isButton() && interaction.customId === "vosltasdsad") {

            interaction.update({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${interaction.guild.name} | Configuração Bot`)
                        .setDescription(`- Olá senhor(a) ${interaction.user}, no select menu abaixo você pode configurar seu bot quando em **Foto, Nome, Status & Embeds** do seu Ticket!`)
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                                .addOptions(
                                    {
                                        label: "Foto do BOT",
                                        description: "Caso queira mudar a foto do bot clique aqui",
                                        emoji: `1203415908605886564`,
                                        value: "foto_bot",
                                    },
                                    {
                                        label: "Nome do BOT",
                                        description: "Caso queira mudar o nome do bot clique aqui",
                                        emoji: `1203415908605886564`,
                                        value: "nome_bot",
                                    },
                                    {
                                        label: "Status do BOT",
                                        description: "Caso queira mudar o STATUS do bot clique aqui",
                                        emoji: `1203415908605886564`,
                                        value: "status_bot"
                                    },
                                    {
                                        label: "Configurar Embeds",
                                        description: "Caso queira configurar a embed do bot clique aqui",
                                        emoji: `1203416954422173736`,
                                        value: "config_embed"
                                    }
                                )
                                .setCustomId("bot_select")
                                .setPlaceholder("Selecione uma opção")
                                .setMaxValues(1)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("voltar_bot")
                                .setLabel("Voltar")
                                .setStyle(2)
                                .setEmoji("1217286326064255056")
                        )
                ]
            })
        }
        if (interaction.isButton() && interaction.customId === "voltar_mudar") {
            interaction.update({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${interaction.guild.name} | Embeds`)
                        .setDescription(`- ${interaction.user}, para alterar as embeds do seu bot e alguns emojis dentro do seu ticket basta apenas usar o menu abaixo:`)
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                                .addOptions(
                                    {
                                        label: "Embed Fora do Ticket",
                                        description: "Caso queira mudar a EMBED FORA clique aqui",
                                        value: "embed_fora",
                                        emoji: "1203416954422173736"
                                    },
                                    {
                                        label: "Embed Dentro do Ticket",
                                        description: "Caso queira mudar a EMBED DENTRO clique aqui",
                                        value: "embed_dentro",
                                        emoji: "1203416954422173736"
                                    },
                                    {
                                        label: "Botões dentro de Ticket",
                                        description: "Caso queira mudar os BOTÕES clique aqui",
                                        value: "button_ticket",
                                        emoji: "1203416954422173736"
                                    },
                                )
                                .setCustomId("config_embedsss")
                                .setMaxValues(1)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("vosltasdsad")
                                .setLabel("Voltar")
                                .setStyle(2)
                                .setEmoji("1217286326064255056")
                        )
                ]
            })
        }
        if (interaction.isStringSelectMenu() && interaction.customId === "config_embedsss") {
            const options = interaction.values[0];

            if (options === "embed_fora") {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: `${interaction.guild.name} | Embeds` }).setColor(`${db.get(`embeds.cor`)}`)
                    .setFooter({ text: `${db.get(`embeds.footer`)}` })
                    .setDescription(`${db.get(`embeds.desc`)}`);

                if (db.get(`embeds.titulo`) !== "remover") {
                    embed.setTitle(`${db.get(`embeds.titulo`)}`)
                }
                if (db.get(`embeds.banner`) !== "remover") {
                    embed.setImage(`${db.get(`embeds.banner`)}`)
                }
                if (db.get(`embeds.imagem`) !== "remover") {
                    embed.setThumbnail(`${db.get(`embeds.imagem`)}`)
                }

                interaction.update({
                    embeds: [
                        embed
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("asodiasd192391283")
                                    .setStyle(2)
                                    .setEmoji(`${db.get(`embeds.button.emoji`)}`)
                                    .setLabel(`${db.get(`embeds.button.text`)}`)
                                    .setDisabled(true)
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("titulo_mudar")
                                    .setLabel("Mudar Título")
                                    .setStyle(1)
                                    .setEmoji("<:config:1181245056116588574>"),
                                new ButtonBuilder()
                                    .setCustomId("desc_mudar")
                                    .setLabel("Mudar Descrição")
                                    .setStyle(1)
                                    .setEmoji("<:config:1181245056116588574>"),
                                new ButtonBuilder()
                                    .setCustomId("footer_mudar")
                                    .setLabel("Mudar Footer")
                                    .setStyle(1)
                                    .setEmoji("<:config:1181245056116588574>"),
                                new ButtonBuilder()
                                    .setCustomId("banner_mudar")
                                    .setLabel("Mudar Banner")
                                    .setStyle(1)
                                    .setEmoji("🖼"),
                                new ButtonBuilder()
                                    .setCustomId("imagem_mudar")
                                    .setLabel("Mudar Imagem")
                                    .setStyle(1)
                                    .setEmoji("🖼"),
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("cor_mudar")
                                    .setStyle(1)
                                    .setEmoji("🖌")
                                    .setLabel("Mudar Cor"),
                                new ButtonBuilder()
                                    .setCustomId("button_mudar")
                                    .setStyle(1)
                                    .setEmoji("<a:Click:1171629799475781693>")
                                    .setLabel("Mudar Botão"),
                                new ButtonBuilder()
                                    .setCustomId("reset_embeds")
                                    .setStyle(4)
                                    .setEmoji("<:change:1181080357769068584>")
                                    .setLabel("Resetar Embeds"),
                                new ButtonBuilder()
                                    .setCustomId("voltar_mudar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056")
                                    .setLabel("Voltar"),
                            )
                    ]
                })
            }
            if (options === "embed_dentro") {
                const embed = new EmbedBuilder()
                    .setTitle(`${db.get(`embed_dentro.titulo`)}`)
                    .setAuthor({ name: `${interaction.guild.name} | Embeds` }).setColor(`${db.get(`embed_dentro.cor`)}`)
                    .setDescription(`${db.get(`embed_dentro.desc`)}`);

                if (db.get(`embed_dentro.banner`) !== "remover") {
                    embed.setImage(`${db.get(`embed_dentro.banner`)}`)
                }
                if (db.get(`embed_dentro.imagem`) !== "remover") {
                    embed.setThumbnail(`${db.get(`embed_dentro.imagem`)}`)
                }

                interaction.update({
                    embeds: [
                        embed
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("mudar_titulo")
                                    .setLabel("Mudar Título")
                                    .setStyle(1)
                                    .setEmoji("<:config:1181245056116588574>"),
                                new ButtonBuilder()
                                    .setCustomId("mudar_desc")
                                    .setLabel("Mudar Descrição")
                                    .setStyle(1)
                                    .setEmoji("<:config:1181245056116588574>"),
                                new ButtonBuilder()
                                    .setCustomId("mudar_banner")
                                    .setLabel("Mudar Banner")
                                    .setStyle(1)
                                    .setEmoji("🖼"),
                                new ButtonBuilder()
                                    .setCustomId("mudar_imagem")
                                    .setLabel("Mudar Imagem")
                                    .setStyle(1)
                                    .setEmoji("🖼"),
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("mudar_cor")
                                    .setLabel("Mudar Cor")
                                    .setStyle(1)
                                    .setEmoji("🖌"),
                                new ButtonBuilder()
                                    .setCustomId("reset_embeds_dentro")
                                    .setLabel("Resetar Embeds")
                                    .setStyle(4)
                                    .setEmoji("<:change:1181080357769068584>"),
                                new ButtonBuilder()
                                    .setCustomId("voltar_mudar")
                                    .setLabel("Voltar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056"),
                            )
                    ]
                })
            }
            if (options === "button_ticket") {
                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${interaction.guild.name} | Emoji Buttons`)
                            .setDescription(`- ${interaction.user}, abaixo você pode selecionar qual emoji você deseja alterar:`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new StringSelectMenuBuilder()
                                    .addOptions(
                                        {
                                            label: "Sair do Ticket",
                                            description: "Caso queira mudar o EMOJI, clique aqui",
                                            value: "sair_emoji",
                                            emoji: `${db.get(`emojis.sair`)}`
                                        },
                                        {
                                            label: "Assumir Ticket",
                                            description: "Caso queira mudar o EMOJI, clique aqui",
                                            value: "assumir_emoji",
                                            emoji: `${db.get(`emojis.assumir`)}`
                                        },
                                        {
                                            label: "Renomear Sala",
                                            description: "Caso queira mudar o EMOJI, clique aqui",
                                            value: "renomear_sala",
                                            emoji: `${db.get(`emojis.renomear`)}`
                                        },
                                        {
                                            label: "Notificar Membro",
                                            description: "Caso queira mudar o EMOJI, clique aqui",
                                            value: "notify_emoji",
                                            emoji: `${db.get(`emojis.notify_member`)}`
                                        },
                                        {
                                            label: "Adicionar Membro",
                                            description: "Caso queira mudar o EMOJI, clique aqui",
                                            value: "addmember_emoji",
                                            emoji: `${db.get(`emojis.addmember`)}`
                                        },
                                        {
                                            label: "Remover Membro",
                                            description: "Caso queira mudar o EMOJI, clique aqui",
                                            value: "removemember_emoji",
                                            emoji: `${db.get(`emojis.removemember`)}`
                                        },
                                        {
                                            label: "Pagamento",
                                            description: "Caso queira mudar o EMOJI, clique aqui",
                                            value: "payments_emoji",
                                            emoji: `${db.get(`emojis.payments`)}`
                                        },
                                        {
                                            label: "Criar Call",
                                            description: "Caso queira mudar o EMOJI, clique aqui",
                                            value: "createcall_emoji",
                                            emoji: `${db.get(`emojis.criarcall`)}`
                                        },
                                        {
                                            label: "Fechar Ticket",
                                            description: "Caso queira mudar o EMOJI, clique aqui",
                                            value: "fechar_emoji",
                                            emoji: `${db.get(`emojis.fechar`)}`
                                        },
                                    )
                                    .setCustomId("button_select_string")
                                    .setPlaceholder("Selecione um Emoji")
                                    .setMaxValues(1)
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("voltar_mudar")
                                    .setLabel("Voltar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056"),
                            )
                    ]
                })
            }
        }

        if (interaction.isStringSelectMenu() && interaction.customId === "button_select_string") {
            const options = interaction.values[0]
            if (options === "sair_emoji") {
                const modal = new ModalBuilder()
                    .setCustomId("sair_emoji_modal")
                    .setTitle("✏ | Alterar Emoji");

                const text = new TextInputBuilder()
                    .setCustomId("text")
                    .setStyle(1)
                    .setRequired(true)
                    .setLabel("QUAL VAI SER O NOVO EMOJI?");

                modal.addComponents(new ActionRowBuilder().addComponents(text));
                return interaction.showModal(modal)
            }
            if (options === "assumir_emoji") {
                const modal = new ModalBuilder()
                    .setCustomId("assumir_emoji_modal")
                    .setTitle("✏ | Alterar Emoji");

                const text = new TextInputBuilder()
                    .setCustomId("text")
                    .setStyle(1)
                    .setRequired(true)
                    .setLabel("QUAL VAI SER O NOVO EMOJI?");

                modal.addComponents(new ActionRowBuilder().addComponents(text));
                return interaction.showModal(modal)
            }
            if (options === "renomear_sala") {
                const modal = new ModalBuilder()
                    .setCustomId("renomear_sala_modal")
                    .setTitle("✏ | Alterar Emoji");

                const text = new TextInputBuilder()
                    .setCustomId("text")
                    .setStyle(1)
                    .setRequired(true)
                    .setLabel("QUAL VAI SER O NOVO EMOJI?");

                modal.addComponents(new ActionRowBuilder().addComponents(text));
                return interaction.showModal(modal)
            }
            if (options === "notify_emoji") {
                const modal = new ModalBuilder()
                    .setCustomId("notify_emoji_modal")
                    .setTitle("✏ | Alterar Emoji");

                const text = new TextInputBuilder()
                    .setCustomId("text")
                    .setStyle(1)
                    .setRequired(true)
                    .setLabel("QUAL VAI SER O NOVO EMOJI?");

                modal.addComponents(new ActionRowBuilder().addComponents(text));
                return interaction.showModal(modal)
            }
            if (options === "addmember_emoji") {
                const modal = new ModalBuilder()
                    .setCustomId("addmember_emoji_modal")
                    .setTitle("✏ | Alterar Emoji");

                const text = new TextInputBuilder()
                    .setCustomId("text")
                    .setStyle(1)
                    .setRequired(true)
                    .setLabel("QUAL VAI SER O NOVO EMOJI?");

                modal.addComponents(new ActionRowBuilder().addComponents(text));
                return interaction.showModal(modal)
            }
            if (options === "removemember_emoji") {
                const modal = new ModalBuilder()
                    .setCustomId("removemember_emoji_modal")
                    .setTitle("✏ | Alterar Emoji");

                const text = new TextInputBuilder()
                    .setCustomId("text")
                    .setStyle(1)
                    .setRequired(true)
                    .setLabel("QUAL VAI SER O NOVO EMOJI?");

                modal.addComponents(new ActionRowBuilder().addComponents(text));
                return interaction.showModal(modal)
            }
            if (options === "createcall_emoji") {
                const modal = new ModalBuilder()
                    .setCustomId("createcall_emoji_modal")
                    .setTitle("✏ | Alterar Emoji");

                const text = new TextInputBuilder()
                    .setCustomId("text")
                    .setStyle(1)
                    .setRequired(true)
                    .setLabel("QUAL VAI SER O NOVO EMOJI?");

                modal.addComponents(new ActionRowBuilder().addComponents(text));
                return interaction.showModal(modal)
            }

            if (options === "payments_emoji") {
                const modal = new ModalBuilder()
                    .setCustomId("payments_emoji_modal")
                    .setTitle("✏ | Alterar Emoji");

                const text = new TextInputBuilder()
                    .setCustomId("text")
                    .setStyle(1)
                    .setRequired(true)
                    .setLabel("QUAL VAI SER O NOVO EMOJI?");

                modal.addComponents(new ActionRowBuilder().addComponents(text));
                return interaction.showModal(modal)
            }

            if (options === "fechar_emoji") {
                const modal = new ModalBuilder()
                    .setCustomId("fechar_emoji_modal")
                    .setTitle("✏ | Alterar Emoji");

                const text = new TextInputBuilder()
                    .setCustomId("text")
                    .setStyle(1)
                    .setRequired(true)
                    .setLabel("QUAL VAI SER O NOVO EMOJI?");

                modal.addComponents(new ActionRowBuilder().addComponents(text));
                return interaction.showModal(modal)
            }
        }
        if (interaction.isModalSubmit() && interaction.customId === "sair_emoji_modal") {
            const text = interaction.fields.getTextInputValue("text");
            const emojis = text

            const emojiverification = interaction.client.emojis.cache.find(emoji => `<:${emoji.name}:${emoji.id}>` === emojis) || interaction.client.emojis.cache.find(emoji => emoji.name === emojis) || interaction.client.emojis.cache.get(emojis);

            const customEmojiRegex = /<a?:\w+:\d+>/;
            const unicodeEmojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF]/;
            const animatedEmojiRegex = /<a:\w+:\d+>/;


            if (!emojiverification && !emojis.match(customEmojiRegex) && !emojis.match(unicodeEmojiRegex) && !emojis.match(animatedEmojiRegex)) {
                interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`**❌ - Não encontrei nenhum emoji que tenha nome  ou que tenha id , Use Emojis deste servidor!**`)
                    ]
                });
                return;
            }
            await db.set(`emojis.sair`, text);

            button_select()

        }

        if (interaction.isModalSubmit() && interaction.customId === "assumir_emoji_modal") {
            const text = interaction.fields.getTextInputValue("text");
            const emojis = text

            const emojiverification = interaction.client.emojis.cache.find(emoji => `<:${emoji.name}:${emoji.id}>` === emojis) || interaction.client.emojis.cache.find(emoji => emoji.name === emojis) || interaction.client.emojis.cache.get(emojis);

            const customEmojiRegex = /<a?:\w+:\d+>/;
            const unicodeEmojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF]/;
            const animatedEmojiRegex = /<a:\w+:\d+>/;


            if (!emojiverification && !emojis.match(customEmojiRegex) && !emojis.match(unicodeEmojiRegex) && !emojis.match(animatedEmojiRegex)) {
                interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`**❌ - Não encontrei nenhum emoji que tenha nome  ou que tenha id , Use Emojis deste servidor!**`)
                    ]
                });
                return;
            }
            await db.set(`emojis.assumir`, text);

            button_select()


        }

        if (interaction.isModalSubmit() && interaction.customId === "renomear_sala_modal") {
            const text = interaction.fields.getTextInputValue("text");
            const emojis = text

            const emojiverification = interaction.client.emojis.cache.find(emoji => `<:${emoji.name}:${emoji.id}>` === emojis) || interaction.client.emojis.cache.find(emoji => emoji.name === emojis) || interaction.client.emojis.cache.get(emojis);

            const customEmojiRegex = /<a?:\w+:\d+>/;
            const unicodeEmojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF]/;
            const animatedEmojiRegex = /<a:\w+:\d+>/;


            if (!emojiverification && !emojis.match(customEmojiRegex) && !emojis.match(unicodeEmojiRegex) && !emojis.match(animatedEmojiRegex)) {
                interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`**❌ - Não encontrei nenhum emoji que tenha nome  ou que tenha id , Use Emojis deste servidor!**`)
                    ]
                });
                return;
            }
            await db.set(`emojis.renomear`, text);

            button_select()


        }

        if (interaction.isModalSubmit() && interaction.customId === "notify_emoji_modal") {
            const text = interaction.fields.getTextInputValue("text");
            const emojis = text

            const emojiverification = interaction.client.emojis.cache.find(emoji => `<:${emoji.name}:${emoji.id}>` === emojis) || interaction.client.emojis.cache.find(emoji => emoji.name === emojis) || interaction.client.emojis.cache.get(emojis);

            const customEmojiRegex = /<a?:\w+:\d+>/;
            const unicodeEmojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF]/;
            const animatedEmojiRegex = /<a:\w+:\d+>/;


            if (!emojiverification && !emojis.match(customEmojiRegex) && !emojis.match(unicodeEmojiRegex) && !emojis.match(animatedEmojiRegex)) {
                interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`**❌ - Não encontrei nenhum emoji que tenha nome  ou que tenha id , Use Emojis deste servidor!**`)
                    ]
                });
                return;
            }
            await db.set(`emojis.notify_member`, text);

            button_select()


        }

        if (interaction.isModalSubmit() && interaction.customId === "addmember_emoji_modal") {
            const text = interaction.fields.getTextInputValue("text");
            const emojis = text

            const emojiverification = interaction.client.emojis.cache.find(emoji => `<:${emoji.name}:${emoji.id}>` === emojis) || interaction.client.emojis.cache.find(emoji => emoji.name === emojis) || interaction.client.emojis.cache.get(emojis);

            const customEmojiRegex = /<a?:\w+:\d+>/;
            const unicodeEmojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF]/;
            const animatedEmojiRegex = /<a:\w+:\d+>/;


            if (!emojiverification && !emojis.match(customEmojiRegex) && !emojis.match(unicodeEmojiRegex) && !emojis.match(animatedEmojiRegex)) {
                interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`**❌ - Não encontrei nenhum emoji que tenha nome  ou que tenha id , Use Emojis deste servidor!**`)
                    ]
                });
                return;
            }
            await db.set(`emojis.addmember`, text);

            button_select()


        }

        if (interaction.isModalSubmit() && interaction.customId === "removemember_emoji_modal") {
            const text = interaction.fields.getTextInputValue("text");
            const emojis = text

            const emojiverification = interaction.client.emojis.cache.find(emoji => `<:${emoji.name}:${emoji.id}>` === emojis) || interaction.client.emojis.cache.find(emoji => emoji.name === emojis) || interaction.client.emojis.cache.get(emojis);

            const customEmojiRegex = /<a?:\w+:\d+>/;
            const unicodeEmojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF]/;
            const animatedEmojiRegex = /<a:\w+:\d+>/;


            if (!emojiverification && !emojis.match(customEmojiRegex) && !emojis.match(unicodeEmojiRegex) && !emojis.match(animatedEmojiRegex)) {
                interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`**❌ - Não encontrei nenhum emoji que tenha nome  ou que tenha id , Use Emojis deste servidor!**`)
                    ]
                });
                return;
            }
            await db.set(`emojis.removemember`, text);

            button_select()


        }

        if (interaction.isModalSubmit() && interaction.customId === "payments_emoji_modal") {
            const text = interaction.fields.getTextInputValue("text");
            const emojis = text

            const emojiverification = interaction.client.emojis.cache.find(emoji => `<:${emoji.name}:${emoji.id}>` === emojis) || interaction.client.emojis.cache.find(emoji => emoji.name === emojis) || interaction.client.emojis.cache.get(emojis);

            const customEmojiRegex = /<a?:\w+:\d+>/;
            const unicodeEmojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF]/;
            const animatedEmojiRegex = /<a:\w+:\d+>/;


            if (!emojiverification && !emojis.match(customEmojiRegex) && !emojis.match(unicodeEmojiRegex) && !emojis.match(animatedEmojiRegex)) {
                interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`**❌ - Não encontrei nenhum emoji que tenha nome ou que tenha id , Use Emojis deste servidor!**`)
                    ]
                });
                return;
            }
            await db.set(`emojis.payments`, text);

            button_select()
        }

        if (interaction.isModalSubmit() && interaction.customId === "createcall_emoji_modal") {
            const text = interaction.fields.getTextInputValue("text");
            const emojis = text

            const emojiverification = interaction.client.emojis.cache.find(emoji => `<:${emoji.name}:${emoji.id}>` === emojis) || interaction.client.emojis.cache.find(emoji => emoji.name === emojis) || interaction.client.emojis.cache.get(emojis);

            const customEmojiRegex = /<a?:\w+:\d+>/;
            const unicodeEmojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF]/;
            const animatedEmojiRegex = /<a:\w+:\d+>/;


            if (!emojiverification && !emojis.match(customEmojiRegex) && !emojis.match(unicodeEmojiRegex) && !emojis.match(animatedEmojiRegex)) {
                interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`**❌ - Não encontrei nenhum emoji que tenha nome  ou que tenha id , Use Emojis deste servidor!**`)
                    ]
                });
                return;
            }
            await db.set(`emojis.criarcall`, text);

            button_select()


        }

        if (interaction.isModalSubmit() && interaction.customId === "fechar_emoji_modal") {
            const text = interaction.fields.getTextInputValue("text");
            const emojis = text

            const emojiverification = interaction.client.emojis.cache.find(emoji => `<:${emoji.name}:${emoji.id}>` === emojis) || interaction.client.emojis.cache.find(emoji => emoji.name === emojis) || interaction.client.emojis.cache.get(emojis);

            const customEmojiRegex = /<a?:\w+:\d+>/;
            const unicodeEmojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF]/;
            const animatedEmojiRegex = /<a:\w+:\d+>/;


            if (!emojiverification && !emojis.match(customEmojiRegex) && !emojis.match(unicodeEmojiRegex) && !emojis.match(animatedEmojiRegex)) {
                interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`**❌ - Não encontrei nenhum emoji que tenha nome  ou que tenha id , Use Emojis deste servidor!**`)
                    ]
                });
                return;
            }
            await db.set(`emojis.fechar`, text);

            button_select()


        }


        if (interaction.isButton() && interaction.customId === "reset_embeds_dentro") {
            await db.set(`embed_dentro`, {
                "titulo": "Ticket",
                "desc": "**Aguarde que algum membro da STAFF venha verificar seu TICKET** \n\n *ID do Ticket:* `#ID` \n\n *Motivo do contato:* `#MOTIVO`\n *Tipo do ticket:* `#TIPO`",
                "banner": "remover",
                "imagem": "remover",
                "cor": "#000000"
            })

            const embed = new EmbedBuilder()
                .setTitle(`${db.get(`embed_dentro.titulo`)}`)
                .setAuthor({ name: `${interaction.guild.name} | Embeds` }).setColor(`${db.get(`embed_dentro.cor`)}`)
                .setDescription(`${db.get(`embed_dentro.desc`)}`);

            if (db.get(`embed_dentro.banner`) !== "remover") {
                embed.setImage(`${db.get(`embed_dentro.banner`)}`)
            }
            if (db.get(`embed_dentro.imagem`) !== "remover") {
                embed.setThumbnail(`${db.get(`embed_dentro.imagem`)}`)
            }

            interaction.update({
                embeds: [
                    embed
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("mudar_titulo")
                                .setLabel("Mudar Título")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("mudar_desc")
                                .setLabel("Mudar Descrição")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("mudar_banner")
                                .setLabel("Mudar Banner")
                                .setStyle(1)
                                .setEmoji("🖼"),
                            new ButtonBuilder()
                                .setCustomId("mudar_imagem")
                                .setLabel("Mudar Imagem")
                                .setStyle(1)
                                .setEmoji("🖼"),
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("mudar_cor")
                                .setLabel("Mudar Cor")
                                .setStyle(1)
                                .setEmoji("🖌"),
                            new ButtonBuilder()
                                .setCustomId("reset_embeds_dentro")
                                .setLabel("Resetar Embeds")
                                .setStyle(4)
                                .setEmoji("<:change:1181080357769068584>"),
                            new ButtonBuilder()
                                .setCustomId("voltar_mudar")
                                .setLabel("Voltar")
                                .setStyle(2)
                                .setEmoji("1217286326064255056"),
                        )
                ]
            })

        }
        if (interaction.isButton() && interaction.customId === "mudar_titulo") {
            const modal = new ModalBuilder()
                .setCustomId("mudar_titulo_modal")
                .setTitle("✏ | Alterar Título da Embed");

            const text = new TextInputBuilder()
                .setCustomId("text")
                .setLabel("QUAL VAI SER O TÍTULO DA EMBED")
                .setStyle(1)
                .setRequired(true);

            modal.addComponents(new ActionRowBuilder().addComponents(text));

            return interaction.showModal(modal)
        }
        if (interaction.isModalSubmit() && interaction.customId === "mudar_titulo_modal") {
            const text = interaction.fields.getTextInputValue("text")
            await db.set(`embed_dentro.titulo`, text)
            const embed = new EmbedBuilder()
                .setTitle(`${db.get(`embed_dentro.titulo`)}`)
                .setAuthor({ name: `${interaction.guild.name} | Embeds` }).setColor(`${db.get(`embed_dentro.cor`)}`)
                .setDescription(`${db.get(`embed_dentro.desc`)}`);

            if (db.get(`embed_dentro.banner`) !== "remover") {
                embed.setImage(`${db.get(`embed_dentro.banner`)}`)
            }
            if (db.get(`embed_dentro.imagem`) !== "remover") {
                embed.setThumbnail(`${db.get(`embed_dentro.imagem`)}`)
            }

            interaction.update({
                embeds: [
                    embed
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("mudar_titulo")
                                .setLabel("Mudar Título")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("mudar_desc")
                                .setLabel("Mudar Descrição")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("mudar_banner")
                                .setLabel("Mudar Banner")
                                .setStyle(1)
                                .setEmoji("🖼"),
                            new ButtonBuilder()
                                .setCustomId("mudar_imagem")
                                .setLabel("Mudar Imagem")
                                .setStyle(1)
                                .setEmoji("🖼"),
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("mudar_cor")
                                .setLabel("Mudar Cor")
                                .setStyle(1)
                                .setEmoji("🖌"),
                            new ButtonBuilder()
                                .setCustomId("reset_embeds_dentro")
                                .setLabel("Resetar Embeds")
                                .setStyle(4)
                                .setEmoji("<:change:1181080357769068584>"),
                            new ButtonBuilder()
                                .setCustomId("voltar_mudar")
                                .setLabel("Voltar")
                                .setStyle(2)
                                .setEmoji("1217286326064255056"),
                        )
                ]
            })
        }

        if (interaction.isButton() && interaction.customId === "mudar_desc") {
            const modal = new ModalBuilder()
                .setCustomId("mudar_desc_modal")
                .setTitle("✏ | Alterar Descrição da Embed");

            const text = new TextInputBuilder()
                .setCustomId("text")
                .setLabel("QUAL VAI SER A DESCRIÇÃO DA EMBED")
                .setStyle(2)
                .setRequired(true);

            modal.addComponents(new ActionRowBuilder().addComponents(text));

            return interaction.showModal(modal)
        }
        if (interaction.isModalSubmit() && interaction.customId === "mudar_desc_modal") {
            const text = interaction.fields.getTextInputValue("text")
            await db.set(`embed_dentro.desc`, text)
            const embed = new EmbedBuilder()
                .setTitle(`${db.get(`embed_dentro.titulo`)}`)
                .setAuthor({ name: `${interaction.guild.name} | Embeds` }).setColor(`${db.get(`embed_dentro.cor`)}`)
                .setDescription(`${db.get(`embed_dentro.desc`)}`);

            if (db.get(`embed_dentro.banner`) !== "remover") {
                embed.setImage(`${db.get(`embed_dentro.banner`)}`)
            }
            if (db.get(`embed_dentro.imagem`) !== "remover") {
                embed.setThumbnail(`${db.get(`embed_dentro.imagem`)}`)
            }

            interaction.update({
                embeds: [
                    embed
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("mudar_titulo")
                                .setLabel("Mudar Título")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("mudar_desc")
                                .setLabel("Mudar Descrição")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("mudar_banner")
                                .setLabel("Mudar Banner")
                                .setStyle(1)
                                .setEmoji("🖼"),
                            new ButtonBuilder()
                                .setCustomId("mudar_imagem")
                                .setLabel("Mudar Imagem")
                                .setStyle(1)
                                .setEmoji("🖼"),
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("mudar_cor")
                                .setLabel("Mudar Cor")
                                .setStyle(1)
                                .setEmoji("🖌"),
                            new ButtonBuilder()
                                .setCustomId("reset_embeds_dentro")
                                .setLabel("Resetar Embeds")
                                .setStyle(4)
                                .setEmoji("<:change:1181080357769068584>"),
                            new ButtonBuilder()
                                .setCustomId("voltar_mudar")
                                .setLabel("Voltar")
                                .setStyle(2)
                                .setEmoji("1217286326064255056"),
                        )
                ]
            })
        }

        if (interaction.isButton() && interaction.customId === "mudar_banner") {
            const modal = new ModalBuilder()
                .setCustomId("mudar_banner_modal")
                .setTitle("✏ | Alterar Banner da Embed");

            const text = new TextInputBuilder()
                .setCustomId("text")
                .setLabel("QUAL VAI SER O BANNER DA EMBED")
                .setStyle(1)
                .setRequired(true);

            modal.addComponents(new ActionRowBuilder().addComponents(text));

            return interaction.showModal(modal)
        }
        if (interaction.isModalSubmit() && interaction.customId === "mudar_banner_modal") {
            const text = interaction.fields.getTextInputValue("text")

            const embed = new EmbedBuilder()
                .setTitle(`${db.get(`embed_dentro.titulo`)}`)
                .setAuthor({ name: `${interaction.guild.name} | Embeds` }).setColor(`${db.get(`embed_dentro.cor`)}`)
                .setDescription(`${db.get(`embed_dentro.desc`)}`);


            try {
                if (db.get(`embed_dentro.imagem`) !== "remover") {
                    embed.setThumbnail(`${db.get(`embed_dentro.imagem`)}`)
                }

                interaction.update({
                    embeds: [
                        embed.setImage(`${text}`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("mudar_titulo")
                                    .setLabel("Mudar Título")
                                    .setStyle(1)
                                    .setEmoji("<:config:1181245056116588574>"),
                                new ButtonBuilder()
                                    .setCustomId("mudar_desc")
                                    .setLabel("Mudar Descrição")
                                    .setStyle(1)
                                    .setEmoji("<:config:1181245056116588574>"),
                                new ButtonBuilder()
                                    .setCustomId("mudar_banner")
                                    .setLabel("Mudar Banner")
                                    .setStyle(1)
                                    .setEmoji("🖼"),
                                new ButtonBuilder()
                                    .setCustomId("mudar_imagem")
                                    .setLabel("Mudar Imagem")
                                    .setStyle(1)
                                    .setEmoji("🖼"),
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("mudar_cor")
                                    .setLabel("Mudar Cor")
                                    .setStyle(1)
                                    .setEmoji("🖌"),
                                new ButtonBuilder()
                                    .setCustomId("reset_embeds_dentro")
                                    .setLabel("Resetar Embeds")
                                    .setStyle(4)
                                    .setEmoji("<:change:1181080357769068584>"),
                                new ButtonBuilder()
                                    .setCustomId("voltar_mudar")
                                    .setLabel("Voltar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056"),
                            )
                    ]
                }).then(async () => { await db.set(`embed_dentro.banner`, text) })
            } catch {
                interaction.reply({
                    content: "Coloque uma URL de Imagem Valida!",
                    ephemeral: true
                })
            }
        }

        if (interaction.isButton() && interaction.customId === "mudar_imagem") {
            const modal = new ModalBuilder()
                .setCustomId("mudar_imagem_modal")
                .setTitle("✏ | Alterar Imagem da Embed");

            const text = new TextInputBuilder()
                .setCustomId("text")
                .setLabel("QUAL VAI SER A IMAGEM DA EMBED")
                .setStyle(1)
                .setRequired(true);

            modal.addComponents(new ActionRowBuilder().addComponents(text));

            return interaction.showModal(modal)
        }
        if (interaction.isModalSubmit() && interaction.customId === "mudar_imagem_modal") {
            const text = interaction.fields.getTextInputValue("text")

            try {
                const embed = new EmbedBuilder()
                    .setTitle(`${db.get(`embed_dentro.titulo`)}`)
                    .setAuthor({ name: `${interaction.guild.name} | Embeds` }).setColor(`${db.get(`embed_dentro.cor`)}`)
                    .setDescription(`${db.get(`embed_dentro.desc`)}`);

                if (db.get(`embed_dentro.banner`) !== "remover") {
                    embed.setImage(`${db.get(`embed_dentro.banner`)}`)
                }

                interaction.update({
                    embeds: [
                        embed.setThumbnail(`${text}`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("mudar_titulo")
                                    .setLabel("Mudar Título")
                                    .setStyle(1)
                                    .setEmoji("<:config:1181245056116588574>"),
                                new ButtonBuilder()
                                    .setCustomId("mudar_desc")
                                    .setLabel("Mudar Descrição")
                                    .setStyle(1)
                                    .setEmoji("<:config:1181245056116588574>"),
                                new ButtonBuilder()
                                    .setCustomId("mudar_banner")
                                    .setLabel("Mudar Banner")
                                    .setStyle(1)
                                    .setEmoji("🖼"),
                                new ButtonBuilder()
                                    .setCustomId("mudar_imagem")
                                    .setLabel("Mudar Imagem")
                                    .setStyle(1)
                                    .setEmoji("🖼"),
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("mudar_cor")
                                    .setLabel("Mudar Cor")
                                    .setStyle(1)
                                    .setEmoji("🖌"),
                                new ButtonBuilder()
                                    .setCustomId("reset_embeds_dentro")
                                    .setLabel("Resetar Embeds")
                                    .setStyle(4)
                                    .setEmoji("<:change:1181080357769068584>"),
                                new ButtonBuilder()
                                    .setCustomId("voltar_mudar")
                                    .setLabel("Voltar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056"),
                            )
                    ]
                }).then(async () => { await db.set(`embed_dentro.imagem`, text) })
            } catch {
                interaction.reply({
                    content: "Verifique a URL que você colocou para imagem!",
                    ephemeral: true
                })
            }
        }

        if (interaction.isButton() && interaction.customId === "mudar_cor") {
            const modal = new ModalBuilder()
                .setCustomId("mudar_cor_modal")
                .setTitle("✏ | Alterar Cor da Embed");

            const text = new TextInputBuilder()
                .setCustomId("text")
                .setLabel("QUAL VAI SER A COR DA EMBED")
                .setStyle(1)
                .setPlaceholder("#000000")
                .setRequired(true);

            modal.addComponents(new ActionRowBuilder().addComponents(text));

            return interaction.showModal(modal)
        }
        if (interaction.isModalSubmit() && interaction.customId === "mudar_cor_modal") {
            const text = interaction.fields.getTextInputValue("text")
            const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

            if (!regex.test(text)) {
                interaction.reply({
                    content: "Coloque uma cor hexadecimal Correta!",
                    ephemeral: true
                })
            }
            await db.set(`embed_dentro.cor`, text)
            const embed = new EmbedBuilder()
                .setTitle(`${db.get(`embed_dentro.titulo`)}`)
                .setAuthor({ name: `${interaction.guild.name} | Embeds` }).setColor(`${db.get(`embed_dentro.cor`)}`)
                .setDescription(`${db.get(`embed_dentro.desc`)}`);

            if (db.get(`embed_dentro.banner`) !== "remover") {
                embed.setImage(`${db.get(`embed_dentro.banner`)}`)
            }
            if (db.get(`embed_dentro.imagem`) !== "remover") {
                embed.setThumbnail(`${db.get(`embed_dentro.imagem`)}`)
            }

            interaction.update({
                embeds: [
                    embed
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("mudar_titulo")
                                .setLabel("Mudar Título")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("mudar_desc")
                                .setLabel("Mudar Descrição")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("mudar_banner")
                                .setLabel("Mudar Banner")
                                .setStyle(1)
                                .setEmoji("🖼"),
                            new ButtonBuilder()
                                .setCustomId("mudar_imagem")
                                .setLabel("Mudar Imagem")
                                .setStyle(1)
                                .setEmoji("🖼"),
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("mudar_cor")
                                .setLabel("Mudar Cor")
                                .setStyle(1)
                                .setEmoji("🖌"),
                            new ButtonBuilder()
                                .setCustomId("reset_embeds_dentro")
                                .setLabel("Resetar Embeds")
                                .setStyle(4)
                                .setEmoji("<:change:1181080357769068584>"),
                            new ButtonBuilder()
                                .setCustomId("voltar_mudar")
                                .setLabel("Voltar")
                                .setStyle(2)
                                .setEmoji("1217286326064255056"),
                        )
                ]
            })
        }

        if (interaction.isButton() && interaction.customId === "reset_embeds") {
            await db.set(`embeds`, {
                "titulo": "remover",
                "desc": "👋 | Aperte no botão abaixo para começar seu atendimento.",
                "footer": `${interaction.guild.name} - Todos os direitos reservados.`,
                "banner": "remover",
                "imagem": "remover",
                "cor": "Default",
                "button": {
                    "text": "Criar Ticket",
                    "emoji": "🎫"
                }
            })

            const embed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.guild.name} | Embeds` }).setColor(`${db.get(`embeds.cor`)}`)
                .setFooter({ text: `${db.get(`embeds.footer`)}` })
                .setDescription(`${db.get(`embeds.desc`)}`);

            if (db.get(`embeds.titulo`) !== "remover") {
                embed.setTitle(`${db.get(`embeds.titulo`)}`)
            }
            if (db.get(`embeds.banner`) !== "remover") {
                embed.setImage(`${db.get(`embeds.banner`)}`)
            }
            if (db.get(`embeds.imagem`) !== "remover") {
                embed.setThumbnail(`${db.get(`embeds.imagem`)}`)
            }

            interaction.update({
                embeds: [
                    embed
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("asodiasd192391283")
                                .setStyle(2)
                                .setEmoji(`${db.get(`embeds.button.emoji`)}`)
                                .setLabel(`${db.get(`embeds.button.text`)}`)
                                .setDisabled(true)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("titulo_mudar")
                                .setLabel("Mudar Título")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("desc_mudar")
                                .setLabel("Mudar Descrição")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("footer_mudar")
                                .setLabel("Mudar Footer")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("banner_mudar")
                                .setLabel("Mudar Banner")
                                .setStyle(1)
                                .setEmoji("🖼"),
                            new ButtonBuilder()
                                .setCustomId("imagem_mudar")
                                .setLabel("Mudar Imagem")
                                .setStyle(1)
                                .setEmoji("🖼"),
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("cor_mudar")
                                .setStyle(1)
                                .setEmoji("🖌")
                                .setLabel("Mudar Cor"),
                            new ButtonBuilder()
                                .setCustomId("button_mudar")
                                .setStyle(1)
                                .setEmoji("<a:Click:1171629799475781693>")
                                .setLabel("Mudar Botão"),
                            new ButtonBuilder()
                                .setCustomId("reset_embeds")
                                .setStyle(4)
                                .setEmoji("<:change:1181080357769068584>")
                                .setLabel("Resetar Embeds"),
                            new ButtonBuilder()
                                .setCustomId("voltar_mudar")
                                .setStyle(2)
                                .setEmoji("1217286326064255056")
                                .setLabel("Voltar"),
                        )
                ]
            })
        }

        if (interaction.isButton() && interaction.customId === "titulo_mudar") {
            const modal = new ModalBuilder()
                .setCustomId("titulo_mudar_modal")
                .setTitle("✏ | Alterar Título do Bot");

            const text = new TextInputBuilder()
                .setCustomId("text")
                .setStyle(1)
                .setLabel("QUAL VAI SER O NOVO TÍTULO?")
                .setRequired(true)

            modal.addComponents(new ActionRowBuilder().addComponents(text));

            return interaction.showModal(modal)
        }
        if (interaction.isModalSubmit() && interaction.customId === "titulo_mudar_modal") {
            await db.set(`embeds.titulo`, interaction.fields.getTextInputValue("text"))
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.guild.name} | Embeds` }).setColor(`${db.get(`embeds.cor`)}`)
                .setFooter({ text: `${db.get(`embeds.footer`)}` })
                .setDescription(`${db.get(`embeds.desc`)}`);

            if (db.get(`embeds.titulo`) !== "remover") {
                embed.setTitle(`${db.get(`embeds.titulo`)}`)
            }
            if (db.get(`embeds.banner`) !== "remover") {
                embed.setImage(`${db.get(`embeds.banner`)}`)
            }
            if (db.get(`embeds.imagem`) !== "remover") {
                embed.setThumbnail(`${db.get(`embeds.imagem`)}`)
            }

            interaction.update({
                embeds: [
                    embed
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("asodiasd192391283")
                                .setStyle(2)
                                .setEmoji(`${db.get(`embeds.button.emoji`)}`)
                                .setLabel(`${db.get(`embeds.button.text`)}`)
                                .setDisabled(true)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("titulo_mudar")
                                .setLabel("Mudar Título")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("desc_mudar")
                                .setLabel("Mudar Descrição")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("footer_mudar")
                                .setLabel("Mudar Footer")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("banner_mudar")
                                .setLabel("Mudar Banner")
                                .setStyle(1)
                                .setEmoji("🖼"),
                            new ButtonBuilder()
                                .setCustomId("imagem_mudar")
                                .setLabel("Mudar Imagem")
                                .setStyle(1)
                                .setEmoji("🖼"),
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("cor_mudar")
                                .setStyle(1)
                                .setEmoji("🖌")
                                .setLabel("Mudar Cor"),
                            new ButtonBuilder()
                                .setCustomId("button_mudar")
                                .setStyle(1)
                                .setEmoji("<a:Click:1171629799475781693>")
                                .setLabel("Mudar Botão"),
                            new ButtonBuilder()
                                .setCustomId("reset_embeds")
                                .setStyle(4)
                                .setEmoji("<:change:1181080357769068584>")
                                .setLabel("Resetar Embeds"),
                            new ButtonBuilder()
                                .setCustomId("voltar_mudar")
                                .setStyle(2)
                                .setEmoji("1217286326064255056")
                                .setLabel("Voltar"),
                        )
                ]
            })
        }



        if (interaction.isButton() && interaction.customId === "desc_mudar") {
            const modal = new ModalBuilder()
                .setCustomId("desc_mudar_modal")
                .setTitle("✏ | Alterar Descrição do Bot");

            const text = new TextInputBuilder()
                .setCustomId("text")
                .setStyle(2)
                .setLabel("QUAL VAI SER O NOVA DESCRIÇÃO?")
                .setRequired(true)

            modal.addComponents(new ActionRowBuilder().addComponents(text));

            return interaction.showModal(modal)
        }
        if (interaction.isModalSubmit() && interaction.customId === "desc_mudar_modal") {
            await db.set(`embeds.desc`, `${interaction.fields.getTextInputValue("text")}`)
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.guild.name} | Embeds` }).setColor(`${db.get(`embeds.cor`)}`)
                .setFooter({ text: `${db.get(`embeds.footer`)}` })
                .setDescription(`${db.get(`embeds.desc`)}`);

            if (db.get(`embeds.titulo`) !== "remover") {
                embed.setTitle(`${db.get(`embeds.titulo`)}`)
            }
            if (db.get(`embeds.banner`) !== "remover") {
                embed.setImage(`${db.get(`embeds.banner`)}`)
            }
            if (db.get(`embeds.imagem`) !== "remover") {
                embed.setThumbnail(`${db.get(`embeds.imagem`)}`)
            }

            interaction.update({
                embeds: [
                    embed
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("asodiasd192391283")
                                .setStyle(2)
                                .setEmoji(`${db.get(`embeds.button.emoji`)}`)
                                .setLabel(`${db.get(`embeds.button.text`)}`)
                                .setDisabled(true)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("titulo_mudar")
                                .setLabel("Mudar Título")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("desc_mudar")
                                .setLabel("Mudar Descrição")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("footer_mudar")
                                .setLabel("Mudar Footer")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("banner_mudar")
                                .setLabel("Mudar Banner")
                                .setStyle(1)
                                .setEmoji("🖼"),
                            new ButtonBuilder()
                                .setCustomId("imagem_mudar")
                                .setLabel("Mudar Imagem")
                                .setStyle(1)
                                .setEmoji("🖼"),
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("cor_mudar")
                                .setStyle(1)
                                .setEmoji("🖌")
                                .setLabel("Mudar Cor"),
                            new ButtonBuilder()
                                .setCustomId("button_mudar")
                                .setStyle(1)
                                .setEmoji("<a:Click:1171629799475781693>")
                                .setLabel("Mudar Botão"),
                            new ButtonBuilder()
                                .setCustomId("reset_embeds")
                                .setStyle(4)
                                .setEmoji("<:change:1181080357769068584>")
                                .setLabel("Resetar Embeds"),
                            new ButtonBuilder()
                                .setCustomId("voltar_mudar")
                                .setStyle(2)
                                .setEmoji("1217286326064255056")
                                .setLabel("Voltar"),
                        )
                ]
            })
        }



        if (interaction.isButton() && interaction.customId === "footer_mudar") {
            const modal = new ModalBuilder()
                .setCustomId("footer_mudar_modal")
                .setTitle("✏ | Alterar Footer do Bot");

            const text = new TextInputBuilder()
                .setCustomId("text")
                .setStyle(1)
                .setLabel("QUAL VAI SER O NOVO FOOTER?")
                .setRequired(true)

            modal.addComponents(new ActionRowBuilder().addComponents(text));

            return interaction.showModal(modal)
        }
        if (interaction.isModalSubmit() && interaction.customId === "footer_mudar_modal") {
            await db.set(`embeds.footer`, `${interaction.fields.getTextInputValue("text")}`)
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.guild.name} | Embeds` }).setColor(`${db.get(`embeds.cor`)}`)
                .setFooter({ text: `${db.get(`embeds.footer`)}` })
                .setDescription(`${db.get(`embeds.desc`)}`);

            if (db.get(`embeds.titulo`) !== "remover") {
                embed.setTitle(`${db.get(`embeds.titulo`)}`)
            }
            if (db.get(`embeds.banner`) !== "remover") {
                embed.setImage(`${db.get(`embeds.banner`)}`)
            }
            if (db.get(`embeds.imagem`) !== "remover") {
                embed.setThumbnail(`${db.get(`embeds.imagem`)}`)
            }

            interaction.update({
                embeds: [
                    embed
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("asodiasd192391283")
                                .setStyle(2)
                                .setEmoji(`${db.get(`embeds.button.emoji`)}`)
                                .setLabel(`${db.get(`embeds.button.text`)}`)
                                .setDisabled(true)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("titulo_mudar")
                                .setLabel("Mudar Título")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("desc_mudar")
                                .setLabel("Mudar Descrição")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("footer_mudar")
                                .setLabel("Mudar Footer")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("banner_mudar")
                                .setLabel("Mudar Banner")
                                .setStyle(1)
                                .setEmoji("🖼"),
                            new ButtonBuilder()
                                .setCustomId("imagem_mudar")
                                .setLabel("Mudar Imagem")
                                .setStyle(1)
                                .setEmoji("🖼"),
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("cor_mudar")
                                .setStyle(1)
                                .setEmoji("🖌")
                                .setLabel("Mudar Cor"),
                            new ButtonBuilder()
                                .setCustomId("button_mudar")
                                .setStyle(1)
                                .setEmoji("<a:Click:1171629799475781693>")
                                .setLabel("Mudar Botão"),
                            new ButtonBuilder()
                                .setCustomId("reset_embeds")
                                .setStyle(4)
                                .setEmoji("<:change:1181080357769068584>")
                                .setLabel("Resetar Embeds"),
                            new ButtonBuilder()
                                .setCustomId("voltar_mudar")
                                .setStyle(2)
                                .setEmoji("1217286326064255056")
                                .setLabel("Voltar"),
                        )
                ]
            })
        }


        if (interaction.isButton() && interaction.customId === "banner_mudar") {
            const modal = new ModalBuilder()
                .setCustomId("banner_mudar_modal")
                .setTitle("✏ | Alterar Banner do Bot");

            const text = new TextInputBuilder()
                .setCustomId("text")
                .setPlaceholder("https://")
                .setStyle(1)
                .setLabel("QUAL VAI SER O NOVO BANNER?")
                .setRequired(true)

            modal.addComponents(new ActionRowBuilder().addComponents(text));

            return interaction.showModal(modal)
        }

        if (interaction.isModalSubmit() && interaction.customId === "banner_mudar_modal") {
            const text = interaction.fields.getTextInputValue("text")


            try {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: `${interaction.guild.name} | Embeds` }).setColor(`${db.get(`embeds.cor`)}`)
                    .setFooter({ text: `${db.get(`embeds.footer`)}` })
                    .setDescription(`${db.get(`embeds.desc`)}`);

                if (db.get(`embeds.titulo`) !== "remover") {
                    embed.setTitle(`${db.get(`embeds.titulo`)}`)
                }
                if (db.get(`embeds.imagem`) !== "remover") {
                    embed.setThumbnail(`${db.get(`embeds.imagem`)}`)
                }
                interaction.update({
                    embeds: [
                        embed.setImage(`${text}`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("asodiasd192391283")
                                    .setStyle(2)
                                    .setEmoji(`${db.get(`embeds.button.emoji`)}`)
                                    .setLabel(`${db.get(`embeds.button.text`)}`)
                                    .setDisabled(true)
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("titulo_mudar")
                                    .setLabel("Mudar Título")
                                    .setStyle(1)
                                    .setEmoji("<:config:1181245056116588574>"),
                                new ButtonBuilder()
                                    .setCustomId("desc_mudar")
                                    .setLabel("Mudar Descrição")
                                    .setStyle(1)
                                    .setEmoji("<:config:1181245056116588574>"),
                                new ButtonBuilder()
                                    .setCustomId("footer_mudar")
                                    .setLabel("Mudar Footer")
                                    .setStyle(1)
                                    .setEmoji("<:config:1181245056116588574>"),
                                new ButtonBuilder()
                                    .setCustomId("banner_mudar")
                                    .setLabel("Mudar Banner")
                                    .setStyle(1)
                                    .setEmoji("🖼"),
                                new ButtonBuilder()
                                    .setCustomId("imagem_mudar")
                                    .setLabel("Mudar Imagem")
                                    .setStyle(1)
                                    .setEmoji("🖼"),
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("cor_mudar")
                                    .setStyle(1)
                                    .setEmoji("🖌")
                                    .setLabel("Mudar Cor"),
                                new ButtonBuilder()
                                    .setCustomId("button_mudar")
                                    .setStyle(1)
                                    .setEmoji("<a:Click:1171629799475781693>")
                                    .setLabel("Mudar Botão"),
                                new ButtonBuilder()
                                    .setCustomId("reset_embeds")
                                    .setStyle(4)
                                    .setEmoji("<:change:1181080357769068584>")
                                    .setLabel("Resetar Embeds"),
                                new ButtonBuilder()
                                    .setCustomId("voltar_mudar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056")
                                    .setLabel("Voltar"),
                            )
                    ]
                }).then(() => {
                    db.set(`embeds.banner`, `${interaction.fields.getTextInputValue("text")}`)
                })
            } catch {
                interaction.reply({
                    content: "❌ | Você não Colocou uma Imagem Valida!"
                })
            }
        }


        if (interaction.isButton() && interaction.customId === "imagem_mudar") {
            const modal = new ModalBuilder()
                .setCustomId("imagem_mudar_modal")
                .setTitle("✏ | Alterar Imagem do Bot");

            const text = new TextInputBuilder()
                .setCustomId("text")
                .setStyle(1)
                .setPlaceholder("https://")
                .setLabel("QUAL VAI SER A NOVA IMAGEM?")
                .setRequired(true)

            modal.addComponents(new ActionRowBuilder().addComponents(text));

            return interaction.showModal(modal)
        }

        if (interaction.isModalSubmit() && interaction.customId === "imagem_mudar_modal") {
            const text = interaction.fields.getTextInputValue("text")

            try {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: `${interaction.guild.name} | Embeds` }).setColor(`${db.get(`embeds.cor`)}`)
                    .setFooter({ text: `${db.get(`embeds.footer`)}` })
                    .setDescription(`${db.get(`embeds.desc`)}`);

                if (db.get(`embeds.titulo`) !== "remover") {
                    embed.setTitle(`${db.get(`embeds.titulo`)}`)
                }
                if (db.get(`embeds.banner`) !== "remover") {
                    embed.setImage(`${db.get(`embeds.banner`)}`)
                }
                interaction.update({
                    embeds: [
                        embed.setThumbnail(`${text}`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("asodiasd192391283")
                                    .setStyle(2)
                                    .setEmoji(`${db.get(`embeds.button.emoji`)}`)
                                    .setLabel(`${db.get(`embeds.button.text`)}`)
                                    .setDisabled(true)
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("titulo_mudar")
                                    .setLabel("Mudar Título")
                                    .setStyle(1)
                                    .setEmoji("<:config:1181245056116588574>"),
                                new ButtonBuilder()
                                    .setCustomId("desc_mudar")
                                    .setLabel("Mudar Descrição")
                                    .setStyle(1)
                                    .setEmoji("<:config:1181245056116588574>"),
                                new ButtonBuilder()
                                    .setCustomId("footer_mudar")
                                    .setLabel("Mudar Footer")
                                    .setStyle(1)
                                    .setEmoji("<:config:1181245056116588574>"),
                                new ButtonBuilder()
                                    .setCustomId("banner_mudar")
                                    .setLabel("Mudar Banner")
                                    .setStyle(1)
                                    .setEmoji("🖼"),
                                new ButtonBuilder()
                                    .setCustomId("imagem_mudar")
                                    .setLabel("Mudar Imagem")
                                    .setStyle(1)
                                    .setEmoji("🖼"),
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("cor_mudar")
                                    .setStyle(1)
                                    .setEmoji("🖌")
                                    .setLabel("Mudar Cor"),
                                new ButtonBuilder()
                                    .setCustomId("button_mudar")
                                    .setStyle(1)
                                    .setEmoji("<a:Click:1171629799475781693>")
                                    .setLabel("Mudar Botão"),
                                new ButtonBuilder()
                                    .setCustomId("reset_embeds")
                                    .setStyle(4)
                                    .setEmoji("<:change:1181080357769068584>")
                                    .setLabel("Resetar Embeds"),
                                new ButtonBuilder()
                                    .setCustomId("voltar_mudar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056")
                                    .setLabel("Voltar"),
                            )
                    ]
                }).then(() => {
                    db.set(`embeds.imagem`, `${interaction.fields.getTextInputValue("text")}`)
                })
            } catch {
                interaction.reply({
                    content: "❌ | Você não Colocou uma Imagem Valida!"
                })
            }
        }



        if (interaction.isButton() && interaction.customId === "cor_mudar") {
            const modal = new ModalBuilder()
                .setCustomId("cor_mudar_modal")
                .setTitle("✏ | Alterar Cor da Embed");

            const text = new TextInputBuilder()
                .setCustomId("text")
                .setStyle(1)
                .setLabel("QUAL VAI SER A NOVA COR?")
                .setPlaceholder("#000000")
                .setRequired(true)

            modal.addComponents(new ActionRowBuilder().addComponents(text));

            return interaction.showModal(modal)
        }

        if (interaction.isModalSubmit() && interaction.customId === "cor_mudar_modal") {
            const text = interaction.fields.getTextInputValue("text");
            const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

            if (!regex.test(text)) {
                interaction.reply({
                    content: "Coloque uma Cor Hexadecimal Existente!",
                    ephemeral: true
                });
                return;
            }
            await db.set(`embeds.cor`, `${text}`)
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.guild.name} | Embeds` }).setColor(`${db.get(`embeds.cor`)}`)
                .setFooter({ text: `${db.get(`embeds.footer`)}` })
                .setDescription(`${db.get(`embeds.desc`)}`);

            if (db.get(`embeds.titulo`) !== "remover") {
                embed.setTitle(`${db.get(`embeds.titulo`)}`)
            }
            if (db.get(`embeds.banner`) !== "remover") {
                embed.setImage(`${db.get(`embeds.banner`)}`)
            }
            if (db.get(`embeds.imagem`) !== "remover") {
                embed.setThumbnail(`${db.get(`embeds.imagem`)}`)
            }

            interaction.update({
                embeds: [
                    embed
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("asodiasd192391283")
                                .setStyle(2)
                                .setEmoji(`${db.get(`embeds.button.emoji`)}`)
                                .setLabel(`${db.get(`embeds.button.text`)}`)
                                .setDisabled(true)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("titulo_mudar")
                                .setLabel("Mudar Título")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("desc_mudar")
                                .setLabel("Mudar Descrição")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("footer_mudar")
                                .setLabel("Mudar Footer")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("banner_mudar")
                                .setLabel("Mudar Banner")
                                .setStyle(1)
                                .setEmoji("🖼"),
                            new ButtonBuilder()
                                .setCustomId("imagem_mudar")
                                .setLabel("Mudar Imagem")
                                .setStyle(1)
                                .setEmoji("🖼"),
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("cor_mudar")
                                .setStyle(1)
                                .setEmoji("🖌")
                                .setLabel("Mudar Cor"),
                            new ButtonBuilder()
                                .setCustomId("button_mudar")
                                .setStyle(1)
                                .setEmoji("<a:Click:1171629799475781693>")
                                .setLabel("Mudar Botão"),
                            new ButtonBuilder()
                                .setCustomId("reset_embeds")
                                .setStyle(4)
                                .setEmoji("<:change:1181080357769068584>")
                                .setLabel("Resetar Embeds"),
                            new ButtonBuilder()
                                .setCustomId("voltar_mudar")
                                .setStyle(2)
                                .setEmoji("1217286326064255056")
                                .setLabel("Voltar"),
                        )
                ]
            })
        }


        if (interaction.isButton() && interaction.customId === "button_mudar") {
            const modal = new ModalBuilder()
                .setCustomId("button_mudar_modal")
                .setTitle("✏ | Alterar Botão da Embed");

            const text = new TextInputBuilder()
                .setCustomId("text")
                .setStyle(1)
                .setLabel("QUAL VAI SER O TEXTO DO BOTÃO?")
                .setRequired(true)
            const text1 = new TextInputBuilder()
                .setCustomId("text1")
                .setStyle(1)
                .setPlaceholder("Ex: 🎫")
                .setLabel("QUAL VAI SER O EMOJI DO BOTÃO?")
                .setRequired(true)

            modal.addComponents(new ActionRowBuilder().addComponents(text));
            modal.addComponents(new ActionRowBuilder().addComponents(text1));

            return interaction.showModal(modal)
        }

        if (interaction.isModalSubmit() && interaction.customId === "button_mudar_modal") {
            const text = interaction.fields.getTextInputValue("text");
            const emoji = interaction.fields.getTextInputValue("text1")
            const emojis = emoji

            const emojiverification = interaction.client.emojis.cache.find(emoji => `<:${emoji.name}:${emoji.id}>` === emojis) || interaction.client.emojis.cache.find(emoji => emoji.name === emojis) || interaction.client.emojis.cache.get(emojis);

            const customEmojiRegex = /<a?:\w+:\d+>/;
            const unicodeEmojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF]/;
            const animatedEmojiRegex = /<a:\w+:\d+>/;


            if (!emojiverification && !emojis.match(customEmojiRegex) && !emojis.match(unicodeEmojiRegex) && !emojis.match(animatedEmojiRegex)) {
                interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`**❌ - Não encontrei nenhum emoji que tenha nome  ou que tenha id , Use Emojis deste servidor!**`)
                    ]
                });
                return;
            }
            await db.set(`embeds.button.emoji`, `${emoji}`)
            await db.set(`embeds.button.text`, `${text}`)
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.guild.name} | Embeds` }).setColor(`${db.get(`embeds.cor`)}`)
                .setFooter({ text: `${db.get(`embeds.footer`)}` })
                .setDescription(`${db.get(`embeds.desc`)}`);

            if (db.get(`embeds.titulo`) !== "remover") {
                embed.setTitle(`${db.get(`embeds.titulo`)}`)
            }
            if (db.get(`embeds.banner`) !== "remover") {
                embed.setImage(`${db.get(`embeds.banner`)}`)
            }
            if (db.get(`embeds.imagem`) !== "remover") {
                embed.setThumbnail(`${db.get(`embeds.imagem`)}`)
            }

            interaction.update({
                embeds: [
                    embed
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("asodiasd192391283")
                                .setStyle(2)
                                .setEmoji(`${db.get(`embeds.button.emoji`)}`)
                                .setLabel(`${db.get(`embeds.button.text`)}`)
                                .setDisabled(true)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("titulo_mudar")
                                .setLabel("Mudar Título")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("desc_mudar")
                                .setLabel("Mudar Descrição")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("footer_mudar")
                                .setLabel("Mudar Footer")
                                .setStyle(1)
                                .setEmoji("<:config:1181245056116588574>"),
                            new ButtonBuilder()
                                .setCustomId("banner_mudar")
                                .setLabel("Mudar Banner")
                                .setStyle(1)
                                .setEmoji("🖼"),
                            new ButtonBuilder()
                                .setCustomId("imagem_mudar")
                                .setLabel("Mudar Imagem")
                                .setStyle(1)
                                .setEmoji("🖼"),
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("cor_mudar")
                                .setStyle(1)
                                .setEmoji("🖌")
                                .setLabel("Mudar Cor"),
                            new ButtonBuilder()
                                .setCustomId("button_mudar")
                                .setStyle(1)
                                .setEmoji("<a:Click:1171629799475781693>")
                                .setLabel("Mudar Botão"),
                            new ButtonBuilder()
                                .setCustomId("reset_embeds")
                                .setStyle(4)
                                .setEmoji("<:change:1181080357769068584>")
                                .setLabel("Resetar Embeds"),
                            new ButtonBuilder()
                                .setCustomId("voltar_mudar")
                                .setStyle(2)
                                .setEmoji("1217286326064255056")
                                .setLabel("Voltar"),
                        )
                ]
            })
        }



        if (interaction.isModalSubmit() && interaction.customId === "status_bot_modal") {
            const text = interaction.fields.getTextInputValue("presence");
            const text1 = interaction.fields.getTextInputValue("atividade");
            const text2 = interaction.fields.getTextInputValue("text_ativd");
            const url = interaction.fields.getTextInputValue("url") || "https://www.twitch.tv/discord";

            const statusMap = {
                "online": "online",
                "ausente": "idle",
                "ocupado": "dnd",
                "invisivel": "invisible",
            };

            const activityMap = {
                "jogando": "Playing",
                "assistindo": "Watching",
                "competindo": "Competing",
                "transmitindo": "Streaming",
                "ouvindo": "Listening"
            };
            if (Object.keys(statusMap).includes(text.toLowerCase()) && Object.keys(activityMap).includes(text1.toLowerCase())) {

                if (text1.toLowerCase() === "transmitindo") {
                    try {
                        interaction.client.user.setPresence({
                            activities: [{
                                name: `${text2}`,
                                type: ActivityType[activityMap[text1.toLowerCase()]],
                                url: url
                            }]
                        })

                        interaction.client.user.setStatus(statusMap[text.toLowerCase()]);
                        interaction.update({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle(`${interaction.guild.name} | Configuração Bot`)
                                    .setDescription(`- Olá senhor(a) ${interaction.user}, no select menu abaixo você pode configurar seu bot quando em **Foto, Nome, Status & Embeds** do seu Ticket! \n\n O **STATUS** do bot foi **ALTERADO** com **SUCESSO**`)
                            ],
                            components: [
                                new ActionRowBuilder()
                                    .addComponents(
                                        new StringSelectMenuBuilder()
                                            .addOptions(
                                                {
                                                    label: "Foto do BOT",
                                                    description: "Caso queira mudar a foto do bot clique aqui",
                                                    emoji: `1203415908605886564`,
                                                    value: "foto_bot",
                                                },
                                                {
                                                    label: "Nome do BOT",
                                                    description: "Caso queira mudar o nome do bot clique aqui",
                                                    emoji: `1203415908605886564`,
                                                    value: "nome_bot",
                                                },
                                                {

                                                    label: "Status do BOT",
                                                    description: "Caso queira mudar o STATUS do bot clique aqui",
                                                    emoji: `1203415908605886564`,
                                                    value: "status_bot"
                                                },
                                                {
                                                    label: "Configurar Embeds",
                                                    description: "Caso queira configurar a embed do bot clique aqui",
                                                    emoji: `1203416954422173736`,
                                                    value: "config_embed"
                                                }
                                            )
                                            .setCustomId("bot_select")
                                            .setPlaceholder("Selecione uma opção")
                                            .setMaxValues(1)
                                    ),
                                new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                            .setCustomId("voltar_bot")
                                            .setLabel("Voltar")
                                            .setStyle(2)
                                            .setEmoji("1217286326064255056")
                                    )
                            ]
                        })
                    } catch (err) {
                        console.log(err)
                        interaction.reply({
                            content: "Ocorreu um erro ao tentar mudar os status do bot",
                            ephemeral: true
                        })
                    }
                } else {
                    try {

                        interaction.client.user.setPresence({
                            activities: [{
                                name: `${text2}`,
                                type: ActivityType[activityMap[text1.toLowerCase()]],
                            }]
                        })

                        interaction.client.user.setStatus(statusMap[text.toLowerCase()]);
                        interaction.update({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle(`${interaction.guild.name} | Configuração Bot`)
                                    .setDescription(`- Olá senhor(a) ${interaction.user}, no select menu abaixo você pode configurar seu bot quando em **Foto, Nome, Status & Embeds** do seu Ticket! \n\n O **STATUS** do bot foi **ALTERADO** com **SUCESSO**`)
                            ],
                            components: [
                                new ActionRowBuilder()
                                    .addComponents(
                                        new StringSelectMenuBuilder()
                                            .addOptions(
                                                {
                                                    label: "Foto do BOT",
                                                    description: "Caso queira mudar a foto do bot clique aqui",
                                                    emoji: `1203415908605886564`,
                                                    value: "foto_bot",
                                                },
                                                {
                                                    label: "Nome do BOT",
                                                    description: "Caso queira mudar o nome do bot clique aqui",
                                                    emoji: `1203415908605886564`,
                                                    value: "nome_bot",
                                                },
                                                {
                                                    label: "Status do BOT",
                                                    description: "Caso queira mudar o STATUS do bot clique aqui",
                                                    emoji: `1203415908605886564`,
                                                    value: "status_bot"
                                                },
                                                {
                                                    label: "Configurar Embeds",
                                                    description: "Caso queira configurar a embed do bot clique aqui",
                                                    emoji: `1203416954422173736`,
                                                    value: "config_embed"
                                                }
                                            )
                                            .setCustomId("bot_select")
                                            .setPlaceholder("Selecione uma opção")
                                            .setMaxValues(1)
                                    ),
                                new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                            .setCustomId("voltar_bot")
                                            .setLabel("Voltar")
                                            .setStyle(2)
                                            .setEmoji("1217286326064255056")
                                    )
                            ]
                        })
                    } catch (err) {
                        console.log(err)
                        interaction.reply({
                            content: "Ocorreu um erro ao tentar mudar os status do bot",
                            ephemeral: true
                        })
                    }
                }
            } else {
                interaction.reply({ content: "Desculpe, mas a atividade fornecida não é válida. Por favor, forneça uma das seguintes atividades: jogando, assistindo, competindo, transmitindo, ouvindo.", ephemeral: true });
            }

        }


        if (interaction.isModalSubmit() && interaction.customId === "foto_bot_modal") {
            const text = interaction.fields.getTextInputValue("text")
            interaction.client.user.setAvatar(`${text}`).then(() => {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`Alterado com sucesso para: [clique aqui](${text})`)
                            .setColor("Green")
                    ],
                    ephemeral: true
                })
            }).catch(() => {
                interaction.reply({ content: "❌ | Ocorreu um erro, verifique a imagem que você colocou!", ephemeral: true })
            })
        }
        if (interaction.isModalSubmit() && interaction.customId === "nome_bot_modal") {
            const text = interaction.fields.getTextInputValue("text")

            interaction.client.user.setUsername(`${text}`).then(() => {
                interaction.reply({ content: "✅ | Nome Atualizado com Sucesso!", ephemeral: true })
            }).catch(() => {
                interaction.reply({ content: "⛔ | Nome não foi alterado, Ocorreu um erro ao tentar trocar o nome do BOT" })
            })
        }


        if (interaction.isRoleSelectMenu() && interaction.customId === "role_select") {
            await db.set(`roles`, interaction.values)
            let a = ""
            db.get(`roles`).map((rs) => {

                a += `\n- <@&${rs}>`
            })
            interaction.update({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${interaction.guild.name} | Cargos Perm`)
                        .setDescription(`> Olá ${interaction.user}, aqui você pode gerenciar os **CARGOS** com permissão\n${a}`)
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(

                            new RoleSelectMenuBuilder()
                                .setCustomId("role_select")
                                .setPlaceholder("Selecione os Cargos Abaixo:")
                                .setMaxValues(10),
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("voltar_role")
                                .setLabel("Voltar")
                                .setStyle(2)
                                .setEmoji("1217286326064255056")
                        )
                ]
            })
        }

        if (interaction.isButton() && interaction.customId === "channel_logs_button") {
            interaction.update({
                components: [

                    new ActionRowBuilder()
                        .addComponents(
                            new ChannelSelectMenuBuilder()
                                .setChannelTypes(ChannelType.GuildText)
                                .setCustomId("channel_logs_select")
                                .setPlaceholder(`Clique aqui para selecionar o canal`)
                                .setMaxValues(1)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("voltar_logs")
                                .setStyle(2)
                                .setEmoji("1217286326064255056")
                                .setLabel("Voltar")
                        )
                ]
            })

        }

        if (interaction.isButton() && interaction.customId === "channel_feedbacks_button") {
            interaction.update({
                components: [

                    new ActionRowBuilder()
                        .addComponents(
                            new ChannelSelectMenuBuilder()
                                .setChannelTypes(ChannelType.GuildText)
                                .setCustomId("channel_logs2_select")
                                .setPlaceholder(`Clique aqui para selecionar o canal`)
                                .setMaxValues(1)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("voltar_logs")
                                .setStyle(2)
                                .setEmoji("1217286326064255056")
                                .setLabel("Voltar")
                        )
                ]
            })

        }

        if (interaction.isChannelSelectMenu() && interaction.customId === "channel_logs_select") {
            await db.set(`channel_logs`, `${interaction.values[0]}`);

            interaction.update({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`Canais e Logs`)
                        .setDescription(`> Olá ${interaction.user}, aqui você pode gerenciar os **CANAIS & LOGS** do seu bot.`)
                        .setFields(
                            {
                                name: `Logs Privadas`, value: `${interaction.guild.channels.cache.get(db.get(`channel_logs`)) ?? "`Não Definido`"}`, inline: true
                            },
                            {
                                name: `   `, value: `   `, inline: true
                            },
                            {
                                name: `Logs Avaliações`, value: `${interaction.guild.channels.cache.get(db.get(`channel_feedbacks`)) ?? "`Não Definido`"}`, inline: true
                            }
                        )
                        .setColor(`#00FFFF`)
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("channel_logs_button")
                                .setLabel("Logs Privadas")
                                .setStyle(1)
                                .setEmoji("1203415970803220550"),
                            new ButtonBuilder()
                                .setCustomId("channel_feedbacks_button")
                                .setLabel("Logs Avaliações")
                                .setStyle(1)
                                .setEmoji("1203415970803220550"),
                            new ButtonBuilder()
                                .setCustomId("voltar_logs")
                                .setStyle(2)
                                .setEmoji("1217286326064255056")
                                .setLabel("Voltar")
                        )
                ]
            })
        }

        if (interaction.isChannelSelectMenu() && interaction.customId === "channel_logs2_select") {
            await db.set(`channel_feedbacks`, `${interaction.values[0]}`);

            interaction.update({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`Canais e Logs`)
                        .setDescription(`> Olá ${interaction.user}, aqui você pode gerenciar os **CANAIS & LOGS** do seu bot.`)
                        .setFields(
                            {
                                name: `Logs Privadas`, value: `${interaction.guild.channels.cache.get(db.get(`channel_logs`)) ?? "`Não Definido`"}`, inline: true
                            },
                            {
                                name: `   `, value: `   `, inline: true
                            },
                            {
                                name: `Logs Avaliações`, value: `${interaction.guild.channels.cache.get(db.get(`channel_feedbacks`)) ?? "`Não Definido`"}`, inline: true
                            }
                        )
                        .setColor(`#00FFFF`)
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("channel_logs_button")
                                .setLabel("Logs Privadas")
                                .setStyle(1)
                                .setEmoji("1203415970803220550"),
                            new ButtonBuilder()
                                .setCustomId("channel_feedbacks_button")
                                .setLabel("Logs Avaliações")
                                .setStyle(1)
                                .setEmoji("1203415970803220550"),
                            new ButtonBuilder()
                                .setCustomId("voltar_logs")
                                .setStyle(2)
                                .setEmoji("1217286326064255056")
                                .setLabel("Voltar")
                        )
                ]
            })
        }

        if (interaction.isStringSelectMenu() && interaction.customId === "config_cat_select") {

            const text = interaction.values[0];
            let emoji = "";
            let desc = "";
            let titulo = "";
            let category = "";
            db.get(`ticket`).map((asd) => {
                if (asd.type === text) {
                    emoji = asd.emoji
                    desc = asd.description;
                    titulo = asd.type;
                    category = interaction.guild.channels.cache.get(`${asd.categoria}`)
                }
            })
            interaction.update({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${interaction.guild.name} | Configuração Ticket`)
                        .setDescription(`💬 Emoji Selecionado: ${emoji} \n 👥 Descrição Atual: \`${desc}\`\n 📥 Titlo Atual: \`${titulo}\` \n 📋 Categoria: ${category ?? "`Sem Categoria`"}`)
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`${text}_category_emoji`)
                                .setLabel("Alterar Emoji")
                                .setStyle(2)
                                .setEmoji("1203415908605886564"),
                            new ButtonBuilder()
                                .setCustomId(`${text}_category_desc`)
                                .setLabel("Alterar Descrição")
                                .setStyle(2)
                                .setEmoji("1203415908605886564"),
                            new ButtonBuilder()
                                .setCustomId(`${text}_category_titulo`)
                                .setLabel("Alterar Titulo")
                                .setStyle(2)
                                .setEmoji("1203415908605886564"),
                            new ButtonBuilder()
                                .setCustomId(`${text}_category_category`)
                                .setLabel("Alterar Categoria")
                                .setStyle(2)
                                .setEmoji("1203415908605886564"),
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("voltarconfigticket")
                                .setLabel("Voltar")
                                .setStyle(2)
                                .setEmoji("1217286326064255056")
                        )
                ]
            })
        }
        if (interaction.isButton() && interaction.customId === "voltarconfigticket") {
            const ticket = db.get(`ticket`)
            if (ticket.length <= 0) {
                interaction.reply({
                    content: "❌ | Nenhuma categoria foi criada neste servidor!"
                })
            } else {
                const select = new StringSelectMenuBuilder().setCustomId("config_cat_select").setPlaceholder("Selecione uma categoria")
                ticket.map((rs) => {
                    select.addOptions(
                        {
                            label: `${rs.type}`,
                            description: `${rs.description}`,
                            value: `${rs.type}`
                        }
                    )
                })
                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${interaction.guild.name} | Configurando Categoria's`)
                            .setDescription(`- ${interaction.user} use o menu abaixo e selecione a categoria que você deseja configurar:`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(select),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("voltar_categoria")
                                    .setLabel("Voltar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056")
                            )
                    ]
                })
            }
        }

        if (interaction.isButton()) {
            const customId = interaction.customId;
            //console.log(customId.split("_")[0])
            if (customId.endsWith("_category_emoji")) {
                const id = customId.split("_")[0]
                const modal = new ModalBuilder()
                    .setCustomId(`${id}_emoji_modal`)
                    .setTitle("💢 - Novo Emoji");

                const text = new TextInputBuilder()
                    .setCustomId("text")
                    .setLabel("Qual será o novo emoji do seu ticket?")
                    .setStyle(1)
                    .setRequired(true);

                modal.addComponents(new ActionRowBuilder().addComponents(text));
                return interaction.showModal(modal);

            }


            if (customId.endsWith("_category_desc")) {
                const id = customId.split("_")[0]
                const modal = new ModalBuilder()
                    .setCustomId(`${id}_desc_modal`)
                    .setTitle("💢 - Nova Descrição");

                const text = new TextInputBuilder()
                    .setCustomId("text")
                    .setLabel("Qual será a nova descrição do seu ticket?")
                    .setStyle(1)
                    .setMaxLength(45)
                    .setRequired(true);

                modal.addComponents(new ActionRowBuilder().addComponents(text));
                return interaction.showModal(modal);
            }


            if (customId.endsWith("_category_titulo")) {
                const id = customId.split("_")[0]
                const modal = new ModalBuilder()
                    .setCustomId(`${id}_titulo_modal`)
                    .setTitle("💢 - Novo Titulo");

                const text = new TextInputBuilder()
                    .setCustomId("text")
                    .setMaxLength(20)
                    .setLabel("Qual será o novo Titulo do seu ticket?")
                    .setStyle(1)
                    .setRequired(true);

                modal.addComponents(new ActionRowBuilder().addComponents(text));
                return interaction.showModal(modal);
            }
            if (customId.endsWith("_category_category")) {
                const id = customId.split("_")[0]
                interaction.update({
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ChannelSelectMenuBuilder()
                                    .setChannelTypes(ChannelType.GuildCategory)
                                    .setCustomId(`${id}_category_rs`)
                                    .setMaxValues(1)
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`${id}_voltar_categry_cate`)
                                    .setLabel("Voltar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056")
                            )
                    ]
                })

            }
            if (customId.endsWith("_voltar_categry_cate")) {
                const id = customId.split("_")[0]
                categoria_ticket(id)
            }
        }
        if (interaction.isModalSubmit()) {
            const customId = interaction.customId;


            if (customId.endsWith("_titulo_modal")) {
                const id = customId.split("_")[0];
                const text = interaction.fields.getTextInputValue("text")
                const butecosArray = db.get(`ticket`)
                const indexToModify = butecosArray.findIndex(buteco => buteco.type === id);


                if (indexToModify !== -1) {
                    butecosArray[indexToModify].type = text;
                    await db.set(`ticket`, butecosArray);
                    categoria_ticket(text)
                }
            }



            if (customId.endsWith("_desc_modal")) {
                const id = customId.split("_")[0];
                const text = interaction.fields.getTextInputValue("text")
                const butecosArray = db.get(`ticket`)
                const indexToModify = butecosArray.findIndex(buteco => buteco.type === id);


                if (indexToModify !== -1) {
                    butecosArray[indexToModify].description = text;
                    await db.set(`ticket`, butecosArray);
                    categoria_ticket(id)
                }
            }



            if (customId.endsWith("_emoji_modal")) {
                const id = customId.split("_")[0];
                const text = interaction.fields.getTextInputValue("text")
                const emojis = text

                const emojiverification = interaction.client.emojis.cache.find(emoji => `<:${emoji.name}:${emoji.id}>` === emojis) || interaction.client.emojis.cache.find(emoji => emoji.name === emojis) || interaction.client.emojis.cache.get(emojis);

                const customEmojiRegex = /<a?:\w+:\d+>/;
                const unicodeEmojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF]/;
                const animatedEmojiRegex = /<a:\w+:\d+>/;


                if (!emojiverification && !emojis.match(customEmojiRegex) &&
                    !emojis.match(unicodeEmojiRegex) &&
                    !emojis.match(animatedEmojiRegex)) {
                    interaction.reply({
                        ephemeral: true,
                        embeds: [
                            new EmbedBuilder()
                                .setColor("Red")
                                .setDescription(`**❌ - Não encontrei nenhum emoji que tenha nome  ou que tenha id , Use Emojis deste servidor!**`)
                        ]
                    });
                    return;
                }
                const butecosArray = db.get(`ticket`)
                const indexToModify = butecosArray.findIndex(buteco => buteco.type === id);


                if (indexToModify !== -1) {
                    butecosArray[indexToModify].emoji = text;
                    await db.set(`ticket`, butecosArray);
                    categoria_ticket(id)
                }
            }

        }
        if (interaction.isChannelSelectMenu()) {
            const customId = interaction.customId;
            if (customId.endsWith("_category_rs")) {
                const id = customId.split("_")[0];
                const us = interaction.values[0];

                const butecosArray = db.get(`ticket`)
                const indexToModify = butecosArray.findIndex(buteco => buteco.type === id);


                if (indexToModify !== -1) {
                    butecosArray[indexToModify].categoria = us;
                    await db.set(`ticket`, butecosArray);
                    categoria_ticket(id)
                }
            }
        }
        if (interaction.isButton() && interaction.customId === "voltar_logs") { gerenciar_select() }
        if (interaction.isButton() && interaction.customId === "voltar_role") { gerenciar_select() }
        if (interaction.isButton() && interaction.customId === "voltar_payments") { gerenciar_select() }
        if (interaction.isButton() && interaction.customId === "voltar_bot") {

            gerenciar_select()
        }
        if (interaction.isButton() && interaction.customId === "voltar_horario") {
            gerenciar_select()
        }
        if (interaction.isButton() && interaction.customId === "voltar_categoria") { gerenciar_select() }

        if (interaction.isButton() && interaction.customId === "24hrs") {
            await db.set(`24hrs`, !await db.get("24hrs"));
            config_bot();
        }

        if (interaction.isButton() && interaction.customId === "paymentsOnOff") {
            await db.set(`payments.sistema`, !await db.get("payments.sistema"));
            gerenciar_payments();
        }

        if (interaction.isButton() && interaction.customId === "configChavePix") {

            const modal = new ModalBuilder()
                .setCustomId(`modalChavePix`)
                .setTitle(`Alterar Chave Pix`)

            const option1 = new TextInputBuilder()
                .setCustomId(`chavePix`)
                .setLabel(`Coloque sua chave pix`)
                .setPlaceholder(`Chave pix aqui`)
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMaxLength(250)

            const optionx1 = new ActionRowBuilder().addComponents(option1)

            modal.addComponents(optionx1)
            await interaction.showModal(modal)
        }

        if (interaction.isModalSubmit() && interaction.customId === "modalChavePix") {

            const optionx1 = interaction.fields.getTextInputValue("chavePix")

            db.set("payments.pix", optionx1)

            gerenciar_payments()

        }

        if (interaction.isButton() && interaction.customId === "configQrCode") {

            const modal = new ModalBuilder()
                .setCustomId(`modalQrCode`)
                .setTitle(`Alterar Qr Code`)

            const option1 = new TextInputBuilder()
                .setCustomId(`qrCode`)
                .setLabel(`Coloque sua url qr code`)
                .setPlaceholder(`https://`)
                .setStyle(TextInputStyle.Short)
                .setMaxLength(250)
                .setRequired(true)

            const optionx1 = new ActionRowBuilder().addComponents(option1)

            modal.addComponents(optionx1)
            await interaction.showModal(modal)
        }

        if (interaction.isModalSubmit() && interaction.customId === "modalQrCode") {

            const optionx1 = interaction.fields.getTextInputValue("qrCode")

            function link(n) {
                const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
                return urlRegex.test(n)
            }

            if (!link(optionx1)) return interaction.reply({ content: `⚠️ | Isso não é uma URL válida, tente novamente usando uma URL válida!`, ephemeral: true })

            db.set("payments.qrcode", optionx1)

            gerenciar_payments()

        }

        if (interaction.isButton() && interaction.customId === "resetConfigsPayment") {

            const modal = new ModalBuilder()
            .setCustomId(`modalReset`)
            .setTitle(`Resetar Configs`)

            const option1 = new TextInputBuilder()
            .setCustomId(`resetConfigs`)
            .setLabel(`Digite "SIM" para confirmar`)
            .setPlaceholder(`SIM`)
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            .setMinLength(3)
            .setMaxLength(3)

            const optionx1 = new ActionRowBuilder().addComponents(option1)
            
            modal.addComponents(optionx1)
            await interaction.showModal(modal)
        }

        if (interaction.isModalSubmit() && interaction.customId === "modalReset") {

            const optionx1 = interaction.fields.getTextInputValue("resetConfigs").toLowerCase()

            if (optionx1 == "sim") {

                db.delete("payments.pix")
                db.delete("payments.qrcode")

                gerenciar_payments()
            } else {

                interaction.reply({ content: `❌ | Você não escreveu "SIM" corretamente, tente novamente!`, ephemeral: true })

            }

        }

        function gerenciar_select() {

            interaction.update({
                embeds: [
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
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                                .addOptions(
                                    {
                                        label: `${db.get("sistema") != false ? "Desativar Sistema" : "Ativar Sistema"}`,
                                        value: "ticketonoff",
                                        emoji: `${db.get("sistema") != false ? "1203416568021782568" : "1203424989173514321"}`,
                                        description: "Deixe o sistema Ativado ou Desativado"
                                    },
                                    {
                                        label: "Configurar Canais",
                                        value: "config_canais",
                                        emoji: "1203415970803220550",
                                        description: "Configure os canais"
                                    },
                                    {
                                        label: "Configurar Cargos",
                                        value: "config_roles",
                                        emoji: "1203415832936448023",
                                        description: "Configure os cargos"
                                    },
                                    {
                                        label: "Configurar Pagamentos",
                                        value: "config_payments",
                                        emoji: "1212460533186302044",
                                        description: "Configure o sistema de pagamentos"
                                    },
                                    {
                                        label: "Configurar Bot",
                                        value: "config_bot",
                                        emoji: "1207876800462585887",
                                        description: "Configure o bot (Status, Foto, Nome, Embeds)"
                                    },
                                    {
                                        label: "Gerenciar Ticket",
                                        value: "gerenciar_ticket",
                                        emoji: "1207877256861589514",
                                        description: "Adicione ou remova categorias do ticket"
                                    },
                                    {
                                        label: "Configurar Categorias",
                                        value: "config_categorias",
                                        emoji: "1203416928278945843",
                                        description: "Configure as categorias"
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
                ],
                ephemeral: true
            })
        };
        function gerenciar_payments() {
            interaction.update({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${interaction.guild.name} | Pagamentos`)
                        .setDescription(`- Olá ${interaction.user}, aqui você pode gerenciar os botão de **PAGAMENTO** do seu ticket`)
                        .addFields(
                            {
                                name: `Sistema`, value: `${db.get("payments.sistema") !== false ? "\`🟢 Ativado\`" : "\`🔴 Desativado\`"}`, inline: true
                            },
                            {
                                name: `Chave Pix`, value: `${db.get("payments.pix") !== null ? `\`${db.get("payments.pix")}\`` : "\`Não definido.\`"}`, inline: true
                            },
                            {
                                name: `Qr Code`, value: `${db.get("payments.qrcode") !== null ? `**[Clique Aqui](${db.get("payments.qrcode")})**` : "\`Não definido.\`"}`, inline: true
                            }
                        )
                ],
                components: [
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`paymentsOnOff`)
                            .setLabel(`${db.get("payments.sistema") !== false ? "Desativar Sistema" : "Ativar Sistema"}`)
                            .setEmoji(`${db.get("payments.sistema") !== false ? "1203416568021782568" : "1203424989173514321"}`)
                            .setStyle(`${db.get("payments.sistema") !== false ? 4 : 3}`),
                        new ButtonBuilder()
                            .setCustomId("configChavePix")
                            .setLabel("Chave Pix")
                            .setStyle(1)
                            .setEmoji("1203416831730131036"),
                        new ButtonBuilder()
                            .setCustomId("configQrCode")
                            .setLabel("Qr Code")
                            .setStyle(1)
                            .setEmoji("1203416264836648970"),
                        new ButtonBuilder()
                            .setCustomId("resetConfigsPayment")
                            .setLabel("Resetar Configs")
                            .setStyle(4)
                            .setEmoji("1203416068966850653")
                    ),
                new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("voltar_payments")
                            .setLabel("Voltar")
                            .setStyle(2)
                            .setEmoji("1217286326064255056")
                    )
                ]
            })
        };
        function categoria_ticket(text) {
            let emoji = "";
            let desc = "";
            let titulo = "";
            let category = "";
            db.get(`ticket`).map((asd) => {
                if (asd.type === text) {
                    emoji = asd.emoji
                    desc = asd.description;
                    titulo = asd.type;
                    category = interaction.guild.channels.cache.get(`${asd.categoria}`)
                }
            })
            interaction.update({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${interaction.guild.name} | Configuração Ticket`)
                        .setDescription(`💬 Emoji Selecionado: ${emoji} \n 👥 Descrição Atual: \`${desc}\`\n 📥 Titlo Atual: \`${titulo}\` \n 📋 Categoria: ${category ?? "`Sem Categoria`"}`)
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`${text}_category_emoji`)
                                .setLabel("Alterar Emoji")
                                .setStyle(2)
                                .setEmoji("1203415908605886564"),
                            new ButtonBuilder()
                                .setCustomId(`${text}_category_desc`)
                                .setLabel("Alterar Descrição")
                                .setStyle(2)
                                .setEmoji("1203415908605886564"),
                            new ButtonBuilder()
                                .setCustomId(`${text}_category_titulo`)
                                .setLabel("Alterar Titulo")
                                .setStyle(2)
                                .setEmoji("1203415908605886564"),
                            new ButtonBuilder()
                                .setCustomId(`${text}_category_category`)
                                .setLabel("Alterar Categoria")
                                .setStyle(2)
                                .setEmoji("1203415908605886564"),
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("voltarconfigticket")
                                .setLabel("Voltar")
                                .setStyle(2)
                                .setEmoji("1217286326064255056")
                        )
                ]

            })
        }

        function button_select() {
            interaction.update({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${interaction.guild.name} | Emoji Buttons`)
                        .setDescription(`- ${interaction.user}, abaixo você pode selecionar qual emoji você deseja alterar:`)
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                                .addOptions(
                                    {
                                        label: "Sair do Ticket",
                                        description: "Caso queira mudar o EMOJI, clique aqui",
                                        value: "sair_emoji",
                                        emoji: `${db.get(`emojis.sair`)}`
                                    },
                                    {
                                        label: "Assumir Ticket",
                                        description: "Caso queira mudar o EMOJI, clique aqui",
                                        value: "assumir_emoji",
                                        emoji: `${db.get(`emojis.assumir`)}`
                                    },
                                    {
                                        label: "Renomear Sala",
                                        description: "Caso queira mudar o EMOJI, clique aqui",
                                        value: "renomear_sala",
                                        emoji: `${db.get(`emojis.renomear`)}`
                                    },
                                    {
                                        label: "Notificar Membro",
                                        description: "Caso queira mudar o EMOJI, clique aqui",
                                        value: "notify_emoji",
                                        emoji: `${db.get(`emojis.notify_member`)}`
                                    },
                                    {
                                        label: "Adicionar Membro",
                                        description: "Caso queira mudar o EMOJI, clique aqui",
                                        value: "addmember_emoji",
                                        emoji: `${db.get(`emojis.addmember`)}`
                                    },
                                    {
                                        label: "Remover Membro",
                                        description: "Caso queira mudar o EMOJI, clique aqui",
                                        value: "removemember_emoji",
                                        emoji: `${db.get(`emojis.removemember`)}`
                                    },
                                    {
                                        label: "Pagamento",
                                        description: "Caso queira mudar o EMOJI, clique aqui",
                                        value: "payments_emoji",
                                        emoji: `${db.get(`emojis.payments`)}`
                                    },
                                    {
                                        label: "Criar Call",
                                        description: "Caso queira mudar o EMOJI, clique aqui",
                                        value: "createcall_emoji",
                                        emoji: `${db.get(`emojis.criarcall`)}`
                                    },
                                    {
                                        label: "Fechar Ticket",
                                        description: "Caso queira mudar o EMOJI, clique aqui",
                                        value: "fechar_emoji",
                                        emoji: `${db.get(`emojis.fechar`)}`
                                    },
                                )
                                .setCustomId("button_select_string")
                                .setPlaceholder("Selecione um Emoji")
                                .setMaxValues(1)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("voltar_mudar")
                                .setLabel("Voltar")
                                .setStyle(2)
                                .setEmoji("1217286326064255056"),
                        )
                ]
            })
        }

        function config_bot() {
            const ticket = db.get(`ticket`)

            if (ticket.length <= 0) {
                let a = "";
                const ts = db.get(`ticket_default`)
                ts.map((rs) => {
                    a += `\`type\` - ${rs.type} \n \`description\` - ${rs.description}\n\n`
                })
                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${interaction.guild.name} | TICKET GESTÃO`)
                            .setDescription(`Segue abaixo a lista de Categorias De Tickets atual! \n\n ${a}`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("addcategory")
                                    .setLabel("Adicionar Nova Categoria")
                                    .setStyle(3)
                                    .setEmoji("1203415950414585977"),
                                new ButtonBuilder()
                                    .setCustomId("removecategory")
                                    .setLabel("Remover Uma Categoria")
                                    .setStyle(4)
                                    .setEmoji("1203416040638521424"),
                                new ButtonBuilder()
                                    .setCustomId("resetcategoria")
                                    .setLabel("Voltar as defalts")
                                    .setStyle(2)
                                    .setEmoji("1203416068966850653"),
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new StringSelectMenuBuilder()
                                    .setPlaceholder("Selecione o dia da semana")
                                    .addOptions(
                                        {
                                            label: "Domingo",
                                            description: `Aberto ás ${db.get(`horario.domingo.aberto`)} & Fechado ás: ${db.get(`horario.domingo.fechado`)}`,
                                            value: "domingo"
                                        },
                                        {
                                            label: "Segunda-Feira",
                                            description: `Aberto ás ${db.get(`horario.segunda.aberto`)} & Fechado ás: ${db.get(`horario.segunda.fechado`)}`,
                                            value: "segunda"
                                        },
                                        {
                                            label: "Terça-Feira",
                                            description: `Aberto ás ${db.get(`horario.terca.aberto`)} & Fechado ás: ${db.get(`horario.terca.fechado`)}`,
                                            value: "terca"
                                        },
                                        {
                                            label: "Quarta-Feira",
                                            description: `Aberto ás ${db.get(`horario.quarta.aberto`)} & Fechado ás: ${db.get(`horario.quarta.fechado`)}`,
                                            value: "quarta"
                                        },
                                        {
                                            label: "Quinta-Feita",
                                            description: `Aberto ás ${db.get(`horario.quinta.aberto`)} & Fechado ás: ${db.get(`horario.quinta.fechado`)}`,
                                            value: "quinta"
                                        },
                                        {
                                            label: "Sexta-Feita",
                                            description: `Aberto ás ${db.get(`horario.sexta.aberto`)} & Fechado ás: ${db.get(`horario.sexta.fechado`)}`,
                                            value: "sexta"
                                        },
                                        {
                                            label: "Sabado",
                                            description: `Aberto ás ${db.get(`horario.sabado.aberto`)} & Fechado ás: ${db.get(`horario.sabado.fechado`)}`,
                                            value: "sabado"
                                        },
                                    )
                                    .setCustomId("horario_select")
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("24hrs")
                                    .setLabel(db.get("24hrs") ? "24H Ativado" : "24H Desativado")
                                    .setEmoji("⏱️")
                                    .setStyle(db.get("24hrs") ? 3 : 4),
                                new ButtonBuilder()
                                    .setCustomId("voltar_horario")
                                    .setLabel("Voltar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056")
                            ),
                    ]
                })
            } else {
                let a = "";
                ticket.map((rs) => {
                    a += `\`type\` - ${rs.type} \n \`description\` - ${rs.description}\n\n`
                })
                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${interaction.guild.name} | TICKET GESTÃO`)
                            .setDescription(`Segue abaixo a lista de Categorias De Tickets atual! \n\n ${a}`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("addcategory")
                                    .setLabel("Adicionar Nova Categoria")
                                    .setStyle(3)
                                    .setEmoji("1203415950414585977"),
                                new ButtonBuilder()
                                    .setCustomId("removecategory")
                                    .setLabel("Remover Uma Categoria")
                                    .setStyle(4)
                                    .setEmoji("1203416040638521424"),
                                new ButtonBuilder()
                                    .setCustomId("resetcategoria")
                                    .setLabel("Voltar as defalts")
                                    .setStyle(2)
                                    .setEmoji("1203416068966850653"),
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new StringSelectMenuBuilder()
                                    .setPlaceholder("Selecione o dia da semana")
                                    .addOptions(
                                        {
                                            label: "Domingo",
                                            description: `Aberto ás ${db.get(`horario.domingo.aberto`)} & Fechado ás: ${db.get(`horario.domingo.fechado`)}`,
                                            value: "domingo"
                                        },
                                        {
                                            label: "Segunda-Feira",
                                            description: `Aberto ás ${db.get(`horario.segunda.aberto`)} & Fechado ás: ${db.get(`horario.segunda.fechado`)}`,
                                            value: "segunda"
                                        },
                                        {
                                            label: "Terça-Feira",
                                            description: `Aberto ás ${db.get(`horario.terca.aberto`)} & Fechado ás: ${db.get(`horario.terca.fechado`)}`,
                                            value: "terca"
                                        },
                                        {
                                            label: "Quarta-Feira",
                                            description: `Aberto ás ${db.get(`horario.quarta.aberto`)} & Fechado ás: ${db.get(`horario.quarta.fechado`)}`,
                                            value: "quarta"
                                        },
                                        {
                                            label: "Quinta-Feita",
                                            description: `Aberto ás ${db.get(`horario.quinta.aberto`)} & Fechado ás: ${db.get(`horario.quinta.fechado`)}`,
                                            value: "quinta"
                                        },
                                        {
                                            label: "Sexta-Feita",
                                            description: `Aberto ás ${db.get(`horario.sexta.aberto`)} & Fechado ás: ${db.get(`horario.sexta.fechado`)}`,
                                            value: "sexta"
                                        },
                                        {
                                            label: "Sabado",
                                            description: `Aberto ás ${db.get(`horario.sabado.aberto`)} & Fechado ás: ${db.get(`horario.sabado.fechado`)}`,
                                            value: "sabado"
                                        },
                                    )
                                    .setCustomId("horario_select")
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("24hrs")
                                    .setLabel(db.get("24hrs") ? "24H Ativado" : "24H Desativado")
                                    .setEmoji("⏱️")
                                    .setStyle(db.get("24hrs") ? 3 : 4),
                                new ButtonBuilder()
                                    .setCustomId("voltar_horario")
                                    .setLabel("Voltar")
                                    .setStyle(2)
                                    .setEmoji("1217286326064255056")
                            ),
                    ]
                })
            }
        }



        function validaFormatoHora(hora) {
            var regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
            return regex.test(hora);
        }

    }
}

