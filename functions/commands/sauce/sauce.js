const { Message, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
require("dotenv").config();
const isImage = require('is-image')
const sagiri  = require("sagiri");
const sauceNao = sagiri(process.env.SAUCENAO_API);

module.exports = {
    name: "sauce",
    permissions : ["SEND_MESSAGES"],
    categories: "sauce",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     * @param {Integration} interaction
     */
    run: async (client, message, args) => {
        if(args[0] === "saucenao") {
            const embeds = []
            const pages = {}
            let sauceMsg
            let sauceResult

            const attachment = message.attachments.first();

            if(attachment !== undefined) {
                sauceMsg = attachment ? attachment.url : null;
            } else return message.channel.send('**Please attch a image/gif with the command.**')

            if (isImage(sauceMsg)) {
                sauceResult = await sauceNao(sauceMsg);
            } else return message.channel.send('**Please attch a image/gif with the command.**')

            for (let i = 0; i < sauceResult.length; ++i) {
                embeds.push(new MessageEmbed()
                    .setTitle(`Sauce Url`)
                    .setURL(sauceResult[i].url)
                    .setFooter({ text: `Sauce No. ${i + 1}`})
                    .setDescription(`Sauce Similarity: **${sauceResult[i].similarity}%**`)
                    .setImage(sauceResult[i].thumbnail)
                    )
            }

            const getRow = (id) => {
                const row = new MessageActionRow()

                row.addComponents(
                    new MessageButton()
                    .setCustomId('prev_page')
                    .setStyle('SECONDARY')
                    .setEmoji('◀️')
                    .setDisabled(pages[id] === 0)
                )

                row.addComponents(
                    new MessageButton()
                    .setCustomId('next_page') 
                    .setStyle('SECONDARY')
                    .setEmoji('▶️')
                    .setDisabled(pages[id] === embeds.length - 1)
                )
                return row
            }

            const id = client.user.id
            pages[id] = pages[id] || 0

            const embed = embeds[pages[id]]
            let reply
            let collector

            const filter = (i) => i.client.user.id === client.user.id
            const time = 1000 * 60 * 5 

            if (message) {
                reply = await message.reply({
                    embeds: [embed],
                    components: [getRow(id)],
                })
                collector = reply.createMessageComponentCollector({ filter, time})
            }
            
            collector.on('collect', (btnInt) => {
                if (!btnInt) {
                    return
                }

                btnInt.deferUpdate()

                if (btnInt.customId !== 'prev_page' && btnInt.customId !== 'next_page' && btnInt.customId !== 'close_page') {
                    return
                }

                if(btnInt.customId === 'prev_page' && pages[id] > 0) {
                    --pages[id]
                } else if (btnInt.customId === 'next_page' && pages[id] < embeds.length - 1) {
                    ++pages[id]
                }
                
                if(reply) {
                    reply.edit({
                        embeds: [embeds[pages[id]]],
                        components: [getRow(id)],
                    })
                }
            })
        }
    },
};