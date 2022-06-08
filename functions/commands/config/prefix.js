const { Message, MessageEmbed, Client} = require("discord.js");
const Prefixes = require('../../../assets/schema/guild-prefix-schema')
const { globalPrefix } = require('../../../assets/config/config.json');

module.exports = {
    name: "prefix",
    permissions : ["ADMINISTRATOR"],
    categories: "config",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const newprefix = args[1]
        let prefixdata;

        prefixdata = await Prefixes.findOne({
                guildID: message.guild.id
            })

        if(args.length === 0) {
            if(!prefixdata) {
                const whatsPrefix = new MessageEmbed ()
                    .setDescription(`**The Prefix is ** ${globalPrefix}`)
                message.channel.send({ embeds: [whatsPrefix] })
                } else {
                    const whatsPrefix = new MessageEmbed ()
                    .setDescription(`**The Prefix is ** ${prefixdata.newPrefix}`)
                    message.channel.send({ embeds: [whatsPrefix] })
                }
            } else if(args[0] === "set"  && args[1].length > 0) {
                const prefixEmbed = new MessageEmbed ()
                    .setDescription(`**The Prefix has Been set to** ${newprefix}`)

                    if(!prefixdata) {
                        let newdata = await Prefixes.create({
                            guildID: message.guild.id,
                            newPrefix: newprefix
                        })
                            newdata.save()
                            message.channel.send({ embeds: [prefixEmbed] })
                        } else {
                            await Prefixes.findOneAndUpdate({
                                guildID: message.guild.id,
                                newPrefix: newprefix,
                            })
                            message.channel.send({ embeds: [prefixEmbed] })
                        }
                } else if(args[0] === "reset") {
                    if(!prefixdata) {
                        const prefixDel = new MessageEmbed ()
                            .setTitle(`**Usage**`)
                            .setDescription(`**Prefix has been reset to** ${globalPrefix}`)
                        message.channel.send({ embeds: [prefixDel] })
                    } else {
                        await Prefixes.deleteOne({
                            guildID: message.guild.id
                        })
                        const prefixDel = new MessageEmbed ()
                            .setTitle(`**Usage**`)
                            .setDescription(`**Prefix has been reset to** ${globalPrefix}`)
                        message.channel.send({ embeds: [prefixDel] })
                    }
                } else {
                    if(!prefixdata) {
                        const prefixusage = new MessageEmbed ()
                          .setTitle(`**Usage**`)
                          .setDescription(`\`\`${globalPrefix}prefix set [prefix]\`\`\n\`\`${globalPrefix}prefix reset\`\``)
                          message.channel.send({ embeds: [prefixusage] })
                    } else {
                        const prefixusage = new MessageEmbed ()
                          .setTitle(`**Usage**`)
                          .setDescription(`\`\`${prefixdata.newPrefix}prefix set [prefix]\`\`\n\`\`${prefixdata.newPrefix}prefix reset\`\``)
                          message.channel.send({ embeds: [prefixusage] })
                    }
                }
    },
};