
const { EmbedBuilder, ChannelSelectMenuBuilder, ButtonBuilder, ActionRowBuilder, StringSelectMenuBuilder, RoleSelectMenuBuilder, ModalBuilder, TextInputBuilder, ChannelType, WebhookClient } = require("discord.js");
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./json/geral.json" })
const db2 = new JsonDatabase({ databasePath: "./json/ass.json" })
const db3 = new JsonDatabase({ databasePath: "./json/vazio.json" })
const db4 = new JsonDatabase({ databasePath: "./json/logs.json" })
const { owner } = require("../config.json")
const { QuickDB } = require("quick.db")
const db1 = new QuickDB()

module.exports = {
    name: "ticket",
    async execute(interaction, message) {

        if (interaction.customId === "assumir_ticket") {
            const ticket = await db1.get(`${interaction.channel.id}`);
            const user = interaction.guild.members.cache.get(ticket.owner);
            const user1 = interaction.guild.members.cache.get(interaction.user.id);
            const roleIdToCheck = db.get(`roles`);

            const hasRequiredRole = roleIdToCheck.some(roleID => user1.roles.cache.has(roleID));

            if (interaction.user.id !== owner) {
                interaction.reply({ content: `⚠️ | Você não é owner para realizar está atividade.`, ephemeral: true });
                return;
            }

            user.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`***${user.displayName}** O seu **TICKET** foi assumido, clique no **BOTÃO** para ir ao **TICKET***`)
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setStyle(5)
                                .setEmoji(`🎫`)
                                .setLabel("・Ir para o Ticket")
                                .setURL(interaction.channel.url)
                        )
                ]
            }).catch(() => { console.log("Usuario está com o privado bloqueado") });
            const cau = interaction.guild.channels.cache.find(a => a.name === `📞・${user.user.username}`);
            await interaction.update({
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("sair_ticket")
                                .setLabel("Sair do ticket")
                                .setStyle(1)

                                .setEmoji(`${db.get(`emojis.sair`)}`),
                            new ButtonBuilder()
                                .setCustomId("assumir_ticket")
                                .setDisabled(true)
                                .setLabel("Este Ticket ja esta assumido")
                                .setStyle(2)

                                .setEmoji(`${db.get(`emojis.assumir`)}`),
                            new ButtonBuilder()
                                .setCustomId("renomear_ticket")
                                .setLabel("Renomear Sala")
                                .setStyle(2)

                                .setEmoji(`${db.get(`emojis.renomear`)}`),
                            new ButtonBuilder()
                                .setCustomId("notify_member")
                                .setLabel("Notificar Membro")
                                .setStyle(2)

                                .setEmoji(`${db.get(`emojis.notify_member`)}`),
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("addmember")
                                .setLabel("Adicionar Membro")
                                .setStyle(2)

                                .setEmoji(`${db.get(`emojis.addmember`)}`),
                            new ButtonBuilder()
                                .setCustomId("removemember")
                                .setLabel("Remover Membro")
                                .setStyle(2)

                                .setEmoji(`${db.get(`emojis.removemember`)}`),
                            new ButtonBuilder()
                                .setCustomId(`paymentTicket`)
                                .setLabel(`Pagamento`)
                                .setEmoji(`${db.get(`emojis.payments`)}`)
                                .setStyle(3)
                                .setDisabled(db.get("payments.sistema") !== false ? false : true),
                            new ButtonBuilder()
                                .setCustomId(cau ? "delete_call" : "create_call")
                                .setLabel(cau ? "Deletar Call" : "Criar Call")
                                .setStyle(2)

                                .setEmoji(`${db.get(`emojis.criarcall`)}`),
                            new ButtonBuilder()
                                .setCustomId("fechar_ticket")
                                .setLabel("Fechar Ticket")
                                .setStyle(4)
                                .setEmoji(`${db.get(`emojis.fechar`)}`)
                        )
                ]
            });
            db2.add(`${interaction.user.id}`, 1);
            db1.set(`${interaction.channel.id}.ass`, interaction.user.id);
        }
        if (interaction.customId === "create_call") {

            const user1 = interaction.guild.members.cache.get(interaction.user.id);
            const roleIdToCheck = db.get(`roles`);
            const ticket = await db1.get(`${interaction.channel.id}`);
            const user = interaction.guild.members.cache.get(ticket.owner);

            const hasRequiredRole = roleIdToCheck.some(roleID => user1.roles.cache.has(roleID));

            if (!hasRequiredRole) {
                await interaction.reply({ content: 'Você não tem permissão para usar este botão.', ephemeral: true });
                return;
            }

            const cau = interaction.guild.channels.cache.find(a => a.name === `📞・${user.user.username}`);
            if (cau) {
                await interaction.update({
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("sair_ticket")
                                    .setLabel("Sair do ticket")
                                    .setStyle(1)
                                    .setEmoji(`${db.get(`emojis.sair`)}`),
                                new ButtonBuilder()
                                    .setCustomId("assumir_ticket")
                                    .setLabel(ticket.ass === "Ninguem Assumiu" ? "Assumir Ticket" : "Ticket foi assumido")
                                    .setStyle(2)
                                    .setDisabled(ticket.ass === "Ninguem Assumiu" ? false : true)
                                    .setEmoji(`${db.get(`emojis.assumir`)}`),
                                new ButtonBuilder()
                                    .setCustomId("renomear_ticket")
                                    .setLabel("Renomear Sala")
                                    .setStyle(2)
                                    .setEmoji(`${db.get(`emojis.renomear`)}`),
                                new ButtonBuilder()
                                    .setCustomId("notify_member")
                                    .setLabel("Notificar Membro")
                                    .setStyle(2)
                                    .setEmoji(`${db.get(`emojis.notify_member`)}`),
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("addmember")
                                    .setLabel("Adicionar Membro")
                                    .setStyle(2)
                                    .setEmoji(`${db.get(`emojis.addmember`)}`),
                                new ButtonBuilder()
                                    .setCustomId("removemember")
                                    .setLabel("Remover Membro")
                                    .setStyle(2)
                                    .setEmoji(`${db.get(`emojis.removemember`)}`),
                                new ButtonBuilder()
                                    .setCustomId(`paymentTicket`)
                                    .setLabel(`Pagamento`)
                                    .setEmoji(`${db.get(`emojis.payments`)}`)
                                    .setStyle(3)
                                    .setDisabled(db.get("payments.sistema") !== false ? false : true),
                                new ButtonBuilder()
                                    .setCustomId(cau ? "delete_call" : "create_call")
                                    .setLabel(cau ? "Deletar Call" : "Criar Call")
                                    .setStyle(2)
                                    .setEmoji(`${db.get(`emojis.criarcall`)}`),
                                new ButtonBuilder()
                                    .setCustomId("fechar_ticket")
                                    .setLabel("Fechar Ticket")
                                    .setStyle(4)
                                    .setEmoji(`${db.get(`emojis.fechar`)}`),
                            )
                    ]
                });
                interaction.followUp({ content: `❌ | A Call já esta Criada!\n🔎 | Call: ${cau.url}`, ephemeral: true });
                return;
            }

            const permissionOverwrites = [
                {
                    id: user.id,
                    allow: ["SendMessages", "ViewChannel"]
                },
                {
                    id: interaction.guild.id,
                    deny: ["ViewChannel", "SendMessages"]
                }
            ]
            db.get(`roles`).map((rls) => {
                const role = interaction.guild.roles.cache.get(db.get("roles"))
                if (role) {
                    permissionOverwrites.push({
                        id: rls,
                        allow: ["ViewChannel", "SendMessages"],
                    })
                }
            });
            await interaction.reply({ content: `🔁 | Aguarde um momento estou criando seu Canal...`, ephemeral: true });
            const channel = await interaction.guild.channels.create({
                name: `📞・${user.user.username}`,
                type: 2,
                parent: interaction.channel.parent,
                permissionOverwrites: permissionOverwrites
            });
            interaction.editReply({ content: `✅ | Criada com sucesso!\n🔎 | Call: ${channel.url}` });

        }
        if (interaction.isButton() && interaction.customId === "delete_call") {
            const ticket = await db1.get(`${interaction.channel.id}`);
            const user = interaction.guild.members.cache.get(ticket.owner);

            const user1 = interaction.guild.members.cache.get(interaction.user.id);
            const roleIdToCheck = db.get(`roles`);

            const hasRequiredRole = roleIdToCheck.some(roleID => user1.roles.cache.has(roleID));

            if (!hasRequiredRole) {
                await interaction.reply({ content: 'Você não tem permissão para usar este botão.', ephemeral: true });
                return;
            }

            const cau = interaction.guild.channels.cache.find(a => a.name === `📞・${user.user.username}`);
            if (!cau) {
                await interaction.update({
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("sair_ticket")
                                    .setLabel("Sair do ticket")
                                    .setStyle(1)
                                    .setEmoji(`${db.get(`emojis.sair`)}`),
                                new ButtonBuilder()
                                    .setCustomId("assumir_ticket")
                                    .setLabel(ticket.ass === "Ninguem Assumiu" ? "Assumir Ticket" : "Ticket foi assumido")
                                    .setStyle(2)
                                    .setDisabled(ticket.ass === "Ninguem Assumiu" ? false : true)
                                    .setEmoji(`${db.get(`emojis.assumir`)}`),
                                new ButtonBuilder()
                                    .setCustomId("renomear_ticket")
                                    .setLabel("Renomear Sala")
                                    .setStyle(2)
                                    .setEmoji(`${db.get(`emojis.renomear`)}`),
                                new ButtonBuilder()
                                    .setCustomId("notify_member")
                                    .setLabel("Notificar Membro")
                                    .setStyle(2)
                                    .setEmoji(`${db.get(`emojis.notify_member`)}`),
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("addmember")
                                    .setLabel("Adicionar Membro")
                                    .setStyle(2)
                                    .setEmoji(`${db.get(`emojis.addmember`)}`),
                                new ButtonBuilder()
                                    .setCustomId("removemember")
                                    .setLabel("Remover Membro")
                                    .setStyle(2)
                                    .setEmoji(`${db.get(`emojis.removemember`)}`),
                                new ButtonBuilder()
                                    .setCustomId(`paymentTicket`)
                                    .setLabel(`Pagamento`)
                                    .setEmoji(`${db.get(`emojis.payments`)}`)
                                    .setStyle(3)
                                    .setDisabled(db.get("payments.sistema") !== false ? false : true),
                                new ButtonBuilder()
                                    .setCustomId(cau ? "delete_call" : "create_call")
                                    .setLabel(cau ? "Deletar Call" : "Criar Call")
                                    .setStyle(2)
                                    .setEmoji(`${db.get(`emojis.criarcall`)}`),
                                new ButtonBuilder()
                                    .setCustomId("fechar_ticket")
                                    .setLabel("Fechar Ticket")
                                    .setStyle(4)
                                    .setEmoji(`${db.get(`emojis.fechar`)}`),
                            )
                    ]
                });
                interaction.followUp({ content: `❌ | Não foi encontrado nenhum canal!`, ephemeral: true });
                return;
            }

            await interaction.reply({ content: `🔁 | Aguarde um momento estou Deletando seu Canal...`, ephemeral: true });
            await cau.delete();
            interaction.editReply({ content: `✅ | Deletada com sucesso!` });
        }

        if (interaction.isButton() && interaction.customId === "paymentTicket") {

            if (db.get("payments.qrcode") !== null) {
            interaction.reply({
                content: `${interaction.user}`,
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`Realizar Pagamento`)
                        .setDescription(`- **Para efetuar o pagamento, use a chave pix ou o qr code setado abaixo:**`)
                        .addFields(
                            {
                                name: `Chave Pix`, value: `${db.get("payments.pix") !== null ? `${db.get("payments.pix")}` : `\`⚠️ Não disponível\``}`
                            },
                            {
                                name: `Qr Code`, value: ` `
                            }
                        )
                        .setImage(`${db.get("payments.qrcode")}`)
                        .setTimestamp()
                ],
                ephemeral: true
            })
        } else {
            interaction.reply({
                content: `${interaction.user}`,
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`Realizar Pagamento`)
                        .setDescription(`- **Para efetuar o pagamento, use a chave pix ou o qr code setado abaixo:**`)
                        .addFields(
                            {
                                name: `Chave Pix`, value: `${db.get("payments.pix") !== null ? `\`${db.get("payments.pix")}\`` : `\`⚠️ Não disponível\``}`
                            },
                            {
                                name: `Qr Code`, value: `\`⚠️ Não disponível\``
                            }
                        )
                        .setTimestamp()
                ],
                ephemeral: true
            })
        }

        }

        if (interaction.isButton() && interaction.customId === "sair_ticket") {
            const ticket = await db1.get(`${interaction.channel.id}`);
            const user = interaction.guild.members.cache.get(ticket.owner);

            if (interaction.user.id !== user.id) {
                interaction.reply({
                    content: `Apenas o Usuario: ${user} pode sair do ticket!`,
                    ephemeral: true
                });
                return;
            }
            await interaction.channel.permissionOverwrites.edit(user, {
                ViewChannel: false,
                SendMessages: false
            });
            const cau = interaction.guild.channels.cache.find(a => a.name === `📞・${user.user.username}`);
            if (cau) {
                cau.delete();
            }
            await interaction.update({
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("sair_ticket")
                                .setLabel("Sair do ticket")
                                .setStyle(1)
                                .setDisabled(true)
                                .setEmoji(`${db.get(`emojis.sair`)}`),
                            new ButtonBuilder()
                                .setCustomId("assumir_ticket")
                                .setLabel("Este Ticket ja esta assumido")
                                .setStyle(2)
                                .setDisabled(true)
                                .setEmoji(`${db.get(`emojis.assumir`)}`),
                            new ButtonBuilder()
                                .setCustomId("renomear_ticket")
                                .setLabel("Renomear Sala")
                                .setStyle(2)
                                .setDisabled(true)
                                .setEmoji(`${db.get(`emojis.renomear`)}`),
                            new ButtonBuilder()
                                .setCustomId("notify_member")
                                .setLabel("Notificar Membro")
                                .setStyle(2)
                                .setDisabled(true)
                                .setEmoji(`${db.get(`emojis.notify_member`)}`),
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("addmember")
                                .setLabel("Adicionar Membro")
                                .setStyle(2)
                                .setDisabled(true)
                                .setEmoji(`${db.get(`emojis.addmember`)}`),
                            new ButtonBuilder()
                                .setCustomId("removemember")
                                .setLabel("Remover Membro")
                                .setStyle(2)
                                .setDisabled(true)
                                .setEmoji(`${db.get(`emojis.removemember`)}`),
                            new ButtonBuilder()
                                .setCustomId(`paymentTicket`)
                                .setLabel(`Pagamento`)
                                .setEmoji(`${db.get(`emojis.payments`)}`)
                                .setStyle(3)
                                .setDisabled(db.get("payments.sistema") !== false ? false : true),
                            new ButtonBuilder()
                                .setCustomId(cau ? "delete_call" : "create_call")
                                .setLabel(cau ? "Deletar Call" : "Criar Call")
                                .setStyle(2)
                                .setDisabled(true)
                                .setEmoji(`${db.get(`emojis.criarcall`)}`),
                            new ButtonBuilder()
                                .setCustomId("fechar_ticket")
                                .setLabel("Fechar Ticket")
                                .setStyle(4)
                                .setDisabled(true)
                                .setEmoji(`${db.get(`emojis.fechar`)}`),
                        )
                ]
            });
            interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`*${interaction.user.displayName} finalizou o seu **ATENDIMENTO** após clicar para sair do ticket*`)
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("fechar_ticket")
                                .setLabel("Deletar Ticket")
                                .setStyle(2)
                                .setEmoji("🗑"),
                            new ButtonBuilder()
                                .setCustomId("salv_msg")
                                .setLabel("Salvar Mensagens")
                                .setStyle(2)
                                .setEmoji("📁")
                        )
                ]
            })

        }

        if (interaction.isButton() && interaction.customId === "salv_msg") {
            await interaction.update({
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("fechar_ticket")
                                .setLabel("Deletar Ticket")
                                .setStyle(2)

                                .setEmoji("🗑"),
                            new ButtonBuilder()
                                .setCustomId("salv_msg")
                                .setLabel("Salvar Mensagens")

                                .setStyle(2)
                                .setEmoji("📁")
                        )
                ]
            });
            interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`📨 *Salvando mensagens e deletando canal*`)
                ]
            });
            const sourceChannel = interaction.channel;

            const lastMessage = sourceChannel.messages.cache.last();
            sourceChannel.messages.fetch({ before: lastMessage.id }).then(messages => {

                const messagesArray = Array.from(messages.values());

                for (let i = messagesArray.length - 1; i >= 0; i--) {
                    const msg = messagesArray[i];
                    db3.push(`${idgerado}_asd`, {
                        username: msg.author.displayName,
                        avatarURL: msg.author.displayAvatarURL(),
                        content: `<t:${Math.floor(msg.createdTimestamp / 1000)}:f>: ${msg.content}`
                    });
                }
            });
            const ticket = await db1.get(`${interaction.channel.id}`);
            const user = interaction.guild.members.cache.get(ticket.owner);
            const canal_logs = interaction.guild.channels.cache.get(db.get(`channel_logs`))
            const canal_feedbacks = interaction.guild.channels.cache.get(db.get(`channel_feedbacks`))
            const idgerado = ticket.id;
            const ass = interaction.guild.members.cache.get(`${ticket.ass}`) || "`Ninguem Assumiu`"
            const quantidadeAssumido = await db2.get(`${ass.id}`) || "0"
            const newUserLog = {
                dono_ticket: user.id,
                fechou_ticket: interaction.user.id,
                assumido: ass ?? 'Ninguem assumiu',
                motivo: ticket.motivo,
                tipo: ticket.tipo,
                codigo: ticket.id
            };
            db4.push(`${interaction.user.id}`, newUserLog);
            setTimeout(() => {
                interaction.channel.delete()
                db.delete(`${interaction.channel.id}`)
            }, 3500);

            if (user) {
                user.send({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: `${user.user.username}`, iconURL: `${user.user.displayAvatarURL()}` })
                            .setTitle(`Ticket encerrado`)
                            .setDescription(`- **ID Ticket**\n - \`${idgerado}\`\n\n👋 | Olá ${user.user.username}, você pode avaliar como foi seu atendimento com nossa equipe administradora no menu abaixo, por favor deixe seu **feedback**!`)
                            .setThumbnail(`${user.user.displayAvatarURL()}`)
                            .setTimestamp()
                            .setColor("#2b2d31")
                    ],
                    components: [
                        new ActionRowBuilder().addComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId("painel_avaliation")
                                .setPlaceholder("De o seu feedback!")
                                .addOptions(
                                    {
                                        label: "Ruim",
                                        description: "Caso seu atendimento não foi como esperado.",
                                        value: `${idgerado}_ruim`,
                                        emoji: "☹"
                                    },
                                    {
                                        label: "Regular",
                                        description: "Caso seu atendimento não foi ruim mas pode melhorar.",
                                        value: `${idgerado}_regular`,
                                        emoji: "😐"
                                    },
                                    {
                                        label: "Bom",
                                        description: "Caso o atendimento atende suas expectativas.",
                                        value: `${idgerado}_bom`,
                                        emoji: "😀"
                                    },
                                )
                        ),
                    ]
                });
            }

            if (canal_logs) {
                canal_logs.send({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`Logs | Ticket`)
                            .addFields(
                                {
                                    name: `**Quem fechou**`,
                                    value: `${interaction.user}`,
                                },
                                {
                                    name: `**Quem abriu**`,
                                    value: `${user.user}`,
                                },
                                {
                                    name: `**Quem assumiu**`,
                                    value: `${ass}`,
                                },
                                {
                                    name: `**Quantidade assumido**`,
                                    value: `\`${quantidadeAssumido}\``,
                                },
                                {
                                    name: `**ID Ticket**`,
                                    value: `\`${idgerado}\``,
                                },
                                {
                                    name: `**Horário Fechado**`,
                                    value: `<t:${Math.round(new Date().getTime() / 1000)}:R>`,
                                }
                            )
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder().setCustomId(`${idgerado}_slv`).setLabel(`Carregar transcript`).setStyle(2)
                            )
                    ]
                })
            }

        }

        if (interaction.isButton()) {
            const customId = `${interaction.customId}`;
            if (customId.endsWith("_slv")) {
                const id = customId.split("_")[0];
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`*🔄 O Transcript está sendo carregado, aguarde alguns segundos.*`)
                    ],
                    ephemeral: true
                })

                interaction.guild.channels.create({
                    name: `📑・transcript-${id}`,
                    parent: interaction.channel.parent,
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: ["ViewChannel", "SendMessages"],
                        },
                        {
                            id: interaction.guild.id,
                            deny: ["ViewChannel", "SendMessages"]
                        }
                    ],
                }).then(async (channel) => {
                    await channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle(`${id} | Logs Transcript`)
                                .setDescription(`- **Para analisar com mais precisão passe o mouse em cima da data para verificar o horário das mensagens!**\n - **Para finalizar este canal clique no botão final das mensagens!**\n   - **Id do transcript:** \`${id}\``)
                        ]
                    })
                    const webhook = channel.createWebhook({
                        name: interaction.user.displayName,
                    }).then(async (webhook) => {
                        const webhookClient = new WebhookClient({ url: webhook.url });


                        const messagesArray = await db3.get(`${id}_asd`);

                        for (let i = 0; i < messagesArray?.length; i++) {
                            const msg = messagesArray[i];
                            await webhookClient.send({
                                username: msg.username,
                                avatarURL: msg.avatarURL,
                                content: msg.content
                            });
                        }
                        interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`*O transcript de id \`${id}\` foi carregado com sucesso no ${channel.url}*`)
                            ],
                            components: [
                                new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                            .setEmoji(`🗒️`)
                                            .setLabel("・Ir até o transcript")
                                            .setStyle(5)
                                            .setURL(channel.url)
                                    )
                            ]
                        });
                        channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle(`Transcript Finalizado`)
                                    .setDescription(`Para apagar essa log transcript, apenas interaja com o botão abaixo:`)
                            ],
                            components: [
                                new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                            .setStyle(4)
                                            .setEmoji("1203416068966850653")
                                            .setCustomId("apagar_transcript")
                                    )
                            ]
                        })
                    })
                })
            }
        }
        if (interaction.isButton() && interaction.customId === "apagar_transcript") {
            interaction.channel.delete();
        }

        if (interaction.customId === "notify_member") {
            const ticket = await db1.get(`${interaction.channel.id}`);
            const user = interaction.guild.members.cache.get(ticket.owner);
            const user1 = interaction.guild.members.cache.get(interaction.user.id);
            const roleIdToCheck = db.get(`roles`);

            const hasRequiredRole = roleIdToCheck.some(roleID => user1.roles.cache.has(roleID));

            if (!hasRequiredRole) {
                await interaction.reply({ content: 'Você não tem permissão para usar este botão.', ephemeral: true });
                return;
            }

            user.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`***${user.displayName}** Um dos Staff está lhe chamando, para ir no **TICKET** Clique no **BOTÃO** abaixo!*`)
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setStyle(5)
                                .setEmoji(`🎫`)
                                .setLabel("・Ir para o Ticket")
                                .setURL(interaction.channel.url)
                        )
                ]
            }).then(() => {
                interaction.reply({
                    content: "✅ | Usuario notificado com sucesso!",
                    ephemeral: true
                })
            }).catch(() => {
                interaction.reply({
                    content: "⛔ | Usuario está com o privado bloqueado!",
                    ephemeral: true
                })
            })

        }
        if (interaction.customId === "renomear_ticket") {
            const ticket = await db1.get(`${interaction.channel.id}`);
            const user = interaction.guild.members.cache.get(ticket.owner);
            const user1 = interaction.guild.members.cache.get(interaction.user.id);
            const roleIdToCheck = db.get(`roles`);

            const hasRequiredRole = roleIdToCheck.some(roleID => user1.roles.cache.has(roleID));

            if (!hasRequiredRole) {
                await interaction.reply({ content: 'Você não tem permissão para usar este botão.', ephemeral: true });
                return;
            }

            const modal = new ModalBuilder()
                .setCustomId("renomear_channel")
                .setTitle("💢 - Renomear Sala");

            const text = new TextInputBuilder()
                .setCustomId("text")
                .setLabel("QUAL VAI SER O NOME DO TICKET?")
                .setStyle(1)
                .setRequired(true)
                .setPlaceholder("Coloque o nome que irá ser trocado");

            modal.addComponents(new ActionRowBuilder().addComponents(text));

            return interaction.showModal(modal)
        }

        if (interaction.isModalSubmit() && interaction.customId === "renomear_channel") {
            await interaction.channel.edit({
                name: `${interaction.fields.getTextInputValue("text")}`
            })
            interaction.reply({
                content: "Canal Renomeado com sucesso!",
                ephemeral: true
            })
        }

        if (interaction.customId === "addmember") {
            const ticket = await db1.get(`${interaction.channel.id}`);
            const user = interaction.guild.members.cache.get(ticket.owner);
            const user1 = interaction.guild.members.cache.get(interaction.user.id);
            const roleIdToCheck = db.get(`roles`);

            const hasRequiredRole = roleIdToCheck.some(roleID => user1.roles.cache.has(roleID));

            if (!hasRequiredRole) {
                await interaction.reply({ content: 'Você não tem permissão para usar este botão.', ephemeral: true });
                return;
            }
            const modal = new ModalBuilder()
                .setCustomId("addmember_modal")
                .setTitle("💢 - Adicionar Membro");

            const text = new TextInputBuilder()
                .setCustomId("text")
                .setLabel("Qual é o ID do usuario?")
                .setStyle(1)
                .setRequired(true)

            modal.addComponents(new ActionRowBuilder().addComponents(text));

            return interaction.showModal(modal);
        }
        if (interaction.isModalSubmit() && interaction.customId === "addmember_modal") {
            const ID = interaction.fields.getTextInputValue("text");
            const user = interaction.guild.members.cache.get(ID);
            const ticket = await db1.get(`${interaction.channel.id}`)
            const use1 = interaction.guild.members.cache.get(ticket.owner)
            if (!user) {
                interaction.reply({
                    content: "Não existe usuario ou você digitou o ID errado!",
                    ephemeral: true
                });
                return;
            }


            if (interaction.channel.permissionsFor(user.id).has("ViewChannel")) return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`❌ | O usuário ${user}(\`${user.id}\`) já possui acesso ao ticket!`)
                ],
                ephemeral: true
            });

            await interaction.channel.permissionOverwrites.edit(user.id, {
                ViewChannel: true,
                SendMessages: true
            });
            interaction.reply({
                content: "Membro Adicionado com sucesso!",
                ephemeral: true
            })


        }


        if (interaction.customId === "removemember") {
            const ticket = await db1.get(`${interaction.channel.id}`);
            const user = interaction.guild.members.cache.get(ticket.owner);
            const user1 = interaction.guild.members.cache.get(interaction.user.id);
            const roleIdToCheck = db.get(`roles`);

            const hasRequiredRole = roleIdToCheck.some(roleID => user1.roles.cache.has(roleID));

            if (!hasRequiredRole) {
                await interaction.reply({ content: 'Você não tem permissão para usar este botão.', ephemeral: true });
                return;
            }
            const modal = new ModalBuilder()
                .setCustomId("removemember_modal")
                .setTitle("💢 - Remover Membro");

            const text = new TextInputBuilder()
                .setCustomId("text")
                .setLabel("Qual é o ID do usuario?")
                .setStyle(1)
                .setRequired(true)

            modal.addComponents(new ActionRowBuilder().addComponents(text));

            return interaction.showModal(modal);
        }
        if (interaction.isModalSubmit() && interaction.customId === "removemember_modal") {
            const ID = interaction.fields.getTextInputValue("text");
            const user = interaction.guild.members.cache.get(ID);
            const ticket = await db1.get(`${interaction.channel.id}`)
            const use1 = interaction.guild.members.cache.get(ticket.owner)
            if (!user) {
                interaction.reply({
                    content: "Não existe usuario ou você digitou o ID errado!",
                    ephemeral: true
                });
                return;
            }


            if (!interaction.channel.permissionsFor(user.id).has("ViewChannel")) return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`❌ | O usuário ${user}(\`${user.id}\`) não possui acesso ao ticket!`)
                ],
                ephemeral: true
            })

            await interaction.channel.permissionOverwrites.edit(user.id, {
                ViewChannel: false,
                SendMessages: false
            });

            interaction.reply({
                content: "Membro Removido com sucesso!",
                ephemeral: true
            })



        }
        if (interaction.isButton() && interaction.customId === "fechar_ticket") {

            const user1 = interaction.guild.members.cache.get(interaction.user.id);
            const roleIdToCheck = db.get(`roles`);

            const hasRequiredRole = roleIdToCheck.some(roleID => user1.roles.cache.has(roleID));

            if (!hasRequiredRole) {
                await interaction.reply({ content: 'Você não tem permissão para usar este botão.', ephemeral: true });
                return;
            }
            const modalreport = new ModalBuilder()
                .setCustomId('modal_finalreport')
                .setTitle(`⚙ | Fechar Ticket`)

            const titlereport = new TextInputBuilder()
                .setCustomId('title_report')
                .setLabel('Motivo:')
                .setRequired(true)
                .setMinLength(5)
                .setMaxLength(150)
                .setStyle(1)

            modalreport.addComponents(
                new ActionRowBuilder().addComponents(titlereport),
            );

            return interaction.showModal(modalreport);

        }

        if (interaction.isModalSubmit() && interaction.customId === "modal_finalreport") {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`Este Canal será deletado dentro de alguns segundos...`)
                ],
                ephemeral: true
            })


            const sourceChannel = interaction.channel;

            const lastMessage = sourceChannel.messages.cache.last();
            sourceChannel.messages.fetch({ before: lastMessage.id }).then(messages => {

                const messagesArray = Array.from(messages.values());

                for (let i = messagesArray.length - 1; i >= 0; i--) {
                    const msg = messagesArray[i];
                    db3.push(`${idgerado}_asd`, {
                        username: msg.author.displayName,
                        avatarURL: msg.author.displayAvatarURL(),
                        content: `<t:${Math.floor(msg.createdTimestamp / 1000)}:f>: ${msg.content}`
                    });
                }
            });
            const ticket = await db1.get(`${interaction.channel.id}`);
            const user = interaction.guild.members.cache.get(ticket.owner);
            const canal_logs = interaction.guild.channels.cache.get(db.get(`channel_logs`))
            const idgerado = ticket.id;
            const ass = interaction.guild.members.cache.get(`${ticket.ass}`) || "`Ninguem Assumiu`"
            const quantidadeAssumido = await db2.get(`${ass.id}`) || "0"
            const newUserLog = {
                dono_ticket: user.id,
                fechou_ticket: interaction.user.id,
                assumido: ass ?? 'Ninguem assumiu',
                motivo: ticket.motivo,
                tipo: ticket.tipo,
                codigo: ticket.id
            };
            db4.push(`${interaction.user.id}`, newUserLog);
            setTimeout(() => {
                interaction.channel.delete()
                db.delete(`${interaction.channel.id}`)
            }, 3500);

            if (user) {
                user.send({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: `${user.user.username}`, iconURL: `${user.user.displayAvatarURL()}` })
                            .setTitle(`Ticket encerrado`)
                            .setDescription(`- **ID Ticket**\n - \`${idgerado}\`\n\n👋 | Olá ${user.user.username}, você pode avaliar como foi seu atendimento com nossa equipe administradora no menu abaixo, por favor deixe seu **feedback**!`)
                            .setThumbnail(`${user.user.displayAvatarURL()}`)
                            .setTimestamp()
                            .setColor("#2b2d31")
                    ],
                    components: [
                        new ActionRowBuilder().addComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId("painel_avaliation")
                                .setPlaceholder("De o seu feedback!")
                                .addOptions(
                                    {
                                        label: "Ruim",
                                        description: "Caso seu atendimento não foi como esperado.",
                                        value: `${idgerado}_ruim`,
                                        emoji: "☹"
                                    },
                                    {
                                        label: "Regular",
                                        description: "Caso seu atendimento não foi ruim mas pode melhorar.",
                                        value: `${idgerado}_regular`,
                                        emoji: "😐"
                                    },
                                    {
                                        label: "Bom",
                                        description: "Caso o atendimento atende suas expectativas.",
                                        value: `${idgerado}_bom`,
                                        emoji: "😀"
                                    },
                                )
                        ),
                    ]
                }).catch(() => { });
            }

            if (canal_logs) {
                canal_logs.send({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`Logs | Ticket`)
                            .addFields(
                                {
                                    name: `**Quem fechou**`,
                                    value: `${interaction.user}`,
                                },
                                {
                                    name: `**Quem abriu**`,
                                    value: `${user.user}`,
                                },
                                {
                                    name: `**Quem assumiu**`,
                                    value: `${ass}`,
                                },
                                {
                                    name: `**Quantidade assumido**`,
                                    value: `\`${quantidadeAssumido}\``,
                                },
                                {
                                    name: `**ID Ticket**`,
                                    value: `\`${idgerado}\``,
                                },
                                {
                                    name: `**Horário Fechado**`,
                                    value: `<t:${Math.round(new Date().getTime() / 1000)}:R>`,
                                }
                            )
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder().setCustomId(`${idgerado}_slv`).setLabel(`Carregar transcript`).setStyle(2)
                            )
                    ]
                })
            }
        }

        if (interaction.customId === "painel_avaliation") {
            const options = interaction.values[0];
            const canal = await db.get(`channel_logs`)
            const canal2 = await db.get(`channel_feedbacks`)
            const canal_logs = interaction.client.channels.cache.get(canal);
            const canal_feedbacks = interaction.client.channels.cache.get(canal2);

            if (options.endsWith("_ruim")) {

                const idgerado = options.split("_")[0]
                interaction.update({
                    components: [
                        new ActionRowBuilder().addComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId("painel_avaliation")
                                .setPlaceholder("💫 Obrigado pelo feedback")
                                .setDisabled(true)
                                .setOptions({ label: "Feedback realizado.", value: "Feedback realizado." })
                        ),
                    ]
                })

                canal_logs.send({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
                            .setDescription(`- **Feedback:**\n - \`😢\`\n\n- **Expressão:**\n - \`O atendimento não foi como esperado.\`\n\n- **ID Ticket**\n - \`${idgerado}\``)
                            .setThumbnail(`${interaction.user.displayAvatarURL()}`)
                            .setTimestamp()
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder().setCustomId(`buttonAvaliationSucces1`).setLabel(`Mensagem do sistema`).setStyle(2).setDisabled(true)
                            )
                    ]
                })


                if (canal_feedbacks) {
                    canal_feedbacks.send({
                        embeds: [
                            new EmbedBuilder()
                                .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
                                .setTitle(`💝 Log de Avaliação`)
                                .addFields(
                                    {
                                        name: `👥 | Usuário`,
                                        value: `${interaction.user} - \`${interaction.user.id}\``
                                    },
                                    {
                                        name: `⭐ | Nota`,
                                        value: `⭐ (1/3)`
                                    },
                                    {
                                        name: `✨ | Avaliação`,
                                        value: `\`😢\` \`O atendimento não foi como esperado.\``
                                    },
                                    {
                                        name: `⏰ | Data/Horário`,
                                        value: `<t:${Math.round(new Date().getTime() / 1000)}:R>`
                                    },
                                )
                                .setThumbnail(`${interaction.user.displayAvatarURL()}`)
                                .setTimestamp()
                        ],
                        components: [
                            new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId(`atendimento_automatic_button`)
                                        .setLabel("Avaliação Atendimento")
                                        .setStyle(2)
                                        .setDisabled(true)
                                )
                        ]
                    })
                }
            }

            if (options.endsWith("_regular")) {

                const idgerado = options.split("_")[0]

                interaction.update({
                    components: [
                        new ActionRowBuilder().addComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId("painel_avaliation")
                                .setPlaceholder("💫 Obrigado pelo feedback")
                                .setDisabled(true)
                                .setOptions({ label: "Feedback realizado.", value: "Feedback realizado." })
                        ),
                    ]
                })

                canal_logs.send({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
                            .setDescription(`- **Feedback:**\n - \`😐\`\n\n- **Expressão:**\n - \`Atendimento não foi ruim mas pode melhorar.\`\n\n- **ID Ticket**\n - \`${idgerado}\``)
                            .setThumbnail(`${interaction.user.displayAvatarURL()}`)
                            .setTimestamp()
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder().setCustomId(`buttonAvaliationSucces2`).setLabel(`Mensagem do sistema`).setStyle(2).setDisabled(true)
                            )
                    ]
                })

                if (canal_feedbacks) {
                    canal_feedbacks.send({
                        embeds: [
                            new EmbedBuilder()
                                .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
                                .setTitle(`💝 Log de Avaliação`)
                                .addFields(
                                    {
                                        name: `👥 | Usuário`,
                                        value: `${interaction.user} - \`${interaction.user.id}\``
                                    },
                                    {
                                        name: `⭐ | Nota`,
                                        value: `⭐⭐ (2/3)`
                                    },
                                    {
                                        name: `✨ | Avaliação`,
                                        value: `\`😐\` \`Atendimento não foi ruim mas pode melhorar.\``
                                    },
                                    {
                                        name: `⏰ | Data/Horário`,
                                        value: `<t:${Math.round(new Date().getTime() / 1000)}:R>`
                                    },
                                )
                                .setThumbnail(`${interaction.user.displayAvatarURL()}`)
                                .setTimestamp()
                        ],
                        components: [
                            new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId(`atendimento_automatic_button`)
                                        .setLabel("Avaliação Atendimento")
                                        .setStyle(2)
                                        .setDisabled(true)
                                )
                        ]
                    })
                }
            }

            if (options.endsWith("_bom")) {

                const idgerado = options.split("_")[0]

                interaction.update({
                    components: [
                        new ActionRowBuilder().addComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId("painel_avaliation")
                                .setPlaceholder("💫 Obrigado pelo feedback")
                                .setDisabled(true)
                                .setOptions({ label: "Feedback realizado.", value: "Feedback realizado." })
                        ),
                    ]
                })

                canal_logs.send({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
                            .setDescription(`- **Feedback:**\n - \`😀\`\n\n- **Expressão:**\n - \`Atendimento atende suas expectativas.\`\n\n- **ID Ticket**\n - \`${idgerado}\``)
                            .setThumbnail(`${interaction.user.displayAvatarURL()}`)
                            .setTimestamp()
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder().setCustomId(`buttonAvaliationSucces3`).setLabel(`Mensagem do sistema`).setStyle(2).setDisabled(true)
                            )
                    ]
                })

                if (canal_feedbacks) {
                    canal_feedbacks.send({
                        embeds: [
                            new EmbedBuilder()
                                .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
                                .setTitle(`💝 Log de Avaliação`)
                                .addFields(
                                    {
                                        name: `👥 | Usuário`,
                                        value: `${interaction.user} - \`${interaction.user.id}\``
                                    },
                                    {
                                        name: `⭐ | Nota`,
                                        value: `⭐⭐⭐ (3/3)`
                                    },
                                    {
                                        name: `✨ | Avaliação`,
                                        value: `\`😀\` \`Atendimento atende suas expectativas.\``
                                    },
                                    {
                                        name: `⏰ | Data/Horário`,
                                        value: `<t:${Math.round(new Date().getTime() / 1000)}:R>`
                                    },
                                )
                                .setThumbnail(`${interaction.user.displayAvatarURL()}`)
                                .setTimestamp()
                        ],
                        components: [
                            new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId(`atendimento_automatic_button`)
                                        .setLabel("Avaliação Atendimento")
                                        .setStyle(2)
                                        .setDisabled(true)
                                )
                        ]
                    })
                }
            }

        }



    }
}

