const { EmbedBuilder, ChannelSelectMenuBuilder, ButtonBuilder, ActionRowBuilder, StringSelectMenuBuilder, RoleSelectMenuBuilder, ModalBuilder, TextInputBuilder, ChannelType} = require("discord.js");
const { JsonDatabase} = require("wio.db");
const db = new JsonDatabase({ databasePath:"./json/geral.json"})
const { QuickDB } = require("quick.db")
const db1 = new QuickDB()

module.exports = {
  name: "ticket",
  async execute(interaction, message) {

    if(interaction.isButton() && interaction.customId === "abrir_ticket") {

        if (db.get("sistema") != true) {
            interaction.reply({ content: `⚠️ | O sistema de atendimento se encontra desativado.`, ephemeral: true });
            return;
        }
        

        if (interaction.guild.channels.cache.find(c => c.topic === interaction.user.id)) {
            const channel = interaction.guild.channels.cache.find(c => c.topic === interaction.user.id);
            return interaction.reply({
              content: `Você já tem um Ticket criado!`,
              ephemeral: true,
              components: [
                new ActionRowBuilder().addComponents(
                  new ButtonBuilder()
                    .setStyle(5)
                    .setEmoji(`🎫`)
                    .setLabel('・Ir para o Ticket')
                    .setURL(`${channel.url}`)
                )
              ]
            });
          }   
          const horarios = db.get(`horario`)
          const diasDaSemana = {
            "0": "domingo",
            "1": "segunda",
            "2": "terca",
            "3": "quarta",
            "4": "quinta",
            "5": "sexta",
            "6": "sabado"
          }        

		
const agora = new Date();

		
const offsetBrasilia = -3; 
const agoraBrasilia = new Date(agora.getTime() + (offsetBrasilia * 60 * 60 * 1000));

		
const dia = diasDaSemana[agoraBrasilia.getUTCDay()];

		
const inicio = new Date(agoraBrasilia);
const fim = new Date(agoraBrasilia);

		
inicio.setUTCHours(horarios[dia].aberto.split(':')[0], horarios[dia].aberto.split(':')[1], 0, 0);
fim.setUTCHours(horarios[dia].fechado.split(':')[0], horarios[dia].fechado.split(':')[1], 0, 0);

		
if(db.get("24hrs")) {
    if (agoraBrasilia >= inicio && agoraBrasilia <= fim) {
        
        const ticket = db.get(`ticket`)
        if(ticket.length <= 0) {
            const ticket = db.get(`ticket_default`)
            const select = new StringSelectMenuBuilder().setCustomId("abrir-ticket").setPlaceholder("Selecionar categoria")
            ticket.map((rs) => {
                select.addOptions(
                    {
                        label:`${rs.type}`,
                        description:`${rs.description}`,
                        value:`${rs.type}_`,
                    }
                )
            })
            interaction.reply({
                embeds:[
                    new EmbedBuilder()
                    .setDescription(`- 👋 | Olá! Está preparado para um suporte aprimorado?\n - Clique no painel abaixo e escolha o motivo da abertura do ticket`)
                    .setFooter({ text:`${interaction.guild.name} - Todos os direitos reservados.` })
                ],
                components:[
                    new ActionRowBuilder()
                    .addComponents(select)
                ],
                ephemeral:true
            })

        } else {
            const select = new StringSelectMenuBuilder().setCustomId("abrir-ticket").setPlaceholder("Selecionar categoria")
            ticket.map((rs) => {
                let categoria = rs.categoria
                if(categoria === "Não Definido") {
                    categoria = interaction.channel.parent.id
                }
                select.addOptions(
                    {
                        label:`${rs.type}`,
                        description:`${rs.description}`,
                        value:`${rs.type}_${categoria}`,
                        emoji:`${rs.emoji}`
                    }
                )
            })

            interaction.reply({
                embeds:[
                    new EmbedBuilder()
                    .setDescription(`- 👋 | Olá! Está preparado para um suporte aprimorado?\n - Clique no painel abaixo e escolha o motivo da abertura do ticket`)
                    .setFooter({ text:`${interaction.guild.name} - Todos os direitos reservados.` })
                ],
                components:[
                    new ActionRowBuilder()
                    .addComponents(select)
                ],
                ephemeral:true
            })



        }
      } else {
        interaction.reply({
            content:"Está Fora do Horario de Atendimento!",
            ephemeral:true
        })
      }
} else {
    const ticket = db.get(`ticket`)
    if(ticket.length <= 0) {
        const ticket = db.get(`ticket_default`)
        const select = new StringSelectMenuBuilder().setCustomId("abrir-ticket").setPlaceholder("Selecionar categoria")
        ticket.map((rs) => {
            select.addOptions(
                {
                    label:`${rs.type}`,
                    description:`${rs.description}`,
                    value:`${rs.type}_`,
                }
            )
        })
        interaction.reply({
            embeds:[
                new EmbedBuilder()
                .setDescription(`- 👋 | Olá! Está preparado para um suporte aprimorado?\n - Clique no painel abaixo e escolha o motivo da abertura do ticket`)
                .setFooter({ text:`${interaction.guild.name} - Todos os direitos reservados.` })
            ],
            components:[
                new ActionRowBuilder()
                .addComponents(select)
            ],
            ephemeral:true
        })

    } else {
        const select = new StringSelectMenuBuilder().setCustomId("abrir-ticket").setPlaceholder("Selecionar categoria")
        ticket.map((rs) => {
            let categoria = rs.categoria
            if(categoria === "Não Definido") {
                categoria = interaction.channel.parent.id
            }
            select.addOptions(
                {
                    label:`${rs.type}`,
                    description:`${rs.description}`,
                    value:`${rs.type}_${categoria}`,
                    emoji:`${rs.emoji}`
                }
            )
        })

        interaction.reply({
            embeds:[
                new EmbedBuilder()
                .setDescription(`- 👋 | Olá! Está preparado para um suporte aprimorado?\n - Clique no painel abaixo e escolha o motivo da abertura do ticket`)
                .setFooter({ text:`${interaction.guild.name} - Todos os direitos reservados.` })
            ],
            components:[
                new ActionRowBuilder()
                .addComponents(select)
            ],
            ephemeral:true
        })



    }
}


    }

    if(interaction.isStringSelectMenu() && interaction.customId === "abrir-ticket") {
        const type = interaction.values[0].split("_")[0]
        const categoria = interaction.values[0].split("_")[1]

        const modal = new ModalBuilder()
        .setTitle("Motivo Coerente Ticket")
        .setCustomId(`${type}_${categoria}_abrirticketmodal`);

        const text = new TextInputBuilder()
        .setCustomId("motivo")
        .setLabel("MOTIVO DO CONTATO:")
        .setStyle(1)
        .setRequired(true)
        .setPlaceholder("Ex: Ajuda com...");

        modal.addComponents(new ActionRowBuilder().addComponents(text));
        return interaction.showModal(modal)


    }

    if(interaction.isModalSubmit()) {
        const customId = interaction.customId;

        if(customId.endsWith("_abrirticketmodal")) {
            const type = customId.split("_")[0]
            const categoria = customId.split("_")[1]
            const text = interaction.fields.getTextInputValue("motivo")

            const permissionOverwrites = [
                {
                    id: interaction.user.id,
                    allow:["ViewChannel", "SendMessages"],
                },
                {
                    id:interaction.guild.id,
                    deny:["ViewChannel", "SendMessages"]
                }
            ]
            let msg = `${interaction.user}`;
            db.get(`roles`).map((rls) => {
                const c = interaction.guild.roles.cache.get(rls);
                if(c) {
                    permissionOverwrites.push({
                        id: rls,
                        allow:["ViewChannel", "SendMessages"],
                    });
                    msg += ` || ${c}`;
                }
            })
            const cod = codigo()
				const cat = interaction.guild.channels.cache.get(categoria)
            interaction.guild.channels.create({
                name:`🎫・${interaction.user.displayName}-${cod}`,
                parent: cat||interaction.channel.parent,
                type: ChannelType.GuildText,
                topic: interaction.user.id,
                permissionOverwrites:permissionOverwrites, 
                }).then((channel) => {
                    interaction.update({
                        embeds:[
                            new EmbedBuilder()
                            .setDescription(`**✅ | Ticket aberto com sucesso no canal ${channel.url}**`)
                        ],
                        components:[
                            new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder().setEmoji(`🎫`).setLabel(`・Ir para meu ticket`).setStyle(`Link`).setURL(`${channel.url}`)
                            )
                        ]
                    });
                    let desc =  `${db.get(`embed_dentro.desc`)}`;
                    desc = desc.replace(`#ID`, `${cod}`)
                    desc = desc.replace(`#MOTIVO`, text)
                    desc = desc.replace(`#TIPO`, type)
                    
                    const embed = 
                    new EmbedBuilder()
                    .setTitle(`${db.get(`embed_dentro.titulo`)}`)
                    .setDescription(`${desc}`);
                    if(db.get(`embed_dentro.banner`) !== "remover") {
                        embed.setImage(`${db.get(`embed_dentro.banner`)}`)
                    }
                    if(db.get(`embed_dentro.imagem`) !== "remover") {
                        embed.setThumbnail(`${db.get(`embed_dentro.imagem`)}`)
                    }
                    channel.send({
                        content:`${msg}`,
                        embeds:[
                            embed
                        ],
                        components:[
                            new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setCustomId("sair_ticket")
                                .setLabel("Sair do ticket")
                                .setStyle(1)
                                .setEmoji(`${db.get(`emojis.sair`)}`),
                                new ButtonBuilder()
                                .setCustomId("assumir_ticket")
                                .setLabel("Assumir Ticket")
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
                                .setCustomId("create_call")
                                .setLabel("Criar Call")
                                .setStyle(2)
                                .setEmoji(`${db.get(`emojis.criarcall`)}`),
                                new ButtonBuilder()
                                .setCustomId("fechar_ticket")
                                .setLabel("Fechar Ticket")
                                .setStyle(4)
                                .setEmoji(`${db.get(`emojis.fechar`)}`),
                            )
                        ]
                    })
                    db1.set(`${channel.id}`, {
                        id: cod,
                        motivo: text,
                        tipo:type,
                        owner: interaction.user.id,
                        ass: "Ninguem Assumiu"
                    })
                })
        }

    }

  }}



  function codigo() {
    var gerados = "";
    var codigos = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
     for (var i = 0; i < 8; i++)
       gerados += codigos.charAt(Math.floor(Math.random() * codigos.length));
     return gerados;
   }