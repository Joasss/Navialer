const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    message.delete({ timeout: 3000 });
    const catogoryID = "801749300496302111";
            var userName = message.author.username;
            var userDiscriminator = message.author.discriminator;
            var ticketExists = false;
            message.guild.channels.cache.forEach(channel => {
                if (channel.name === userName.toLowerCase() + "-" + userDiscriminator) {
                    ticketExists = true;
                    message.channel.send("You already have a ticket.");
                    return;
                }

            });
            if (ticketExists) return;
            var Ticketembed = new Discord.MessageEmbed()
                .setTitle("Hello " + message.author.username)
                .setColor(`RANDOM`)
                .setFooter("Your support ticket is being made...");
            message.channel.send(Ticketembed)
            message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, { type: 'text' }).then(
                (createdChannel) => {
                    createdChannel.setParent(catogoryID).then(
                        (settedParent) => {
                            settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                                SEND_MESSAGES: false,
                                VIEW_CHANNEL: false
                            });
                            settedParent.updateOverwrite(message.author.id, {
                                CREATE_INSTANT_INVITE: false,
                                READ_MESSAGE_HISTORY: true,
                                SEND_MESSAGES: true,
                                ATTACH_FILES: true,
                                CONNECT: true,
                                ADD_REACTIONS: true,
                                VIEW_CHANNEL: true
                            });
                            var embedParent = new Discord.MessageEmbed()
                                .setTitle(`Welcome ${message.author.username}`)
                                .setDescription("Ask your questions here, staff will be with you shortly.")
                                .setColor(`RANDOM`);
                            settedParent.send(embedParent);
                        }
                    ).catch(err => {
                        message.channel.send(err);
                    });
                }
            ).catch(err => {
                message.channel.send(err);
            });
}

module.exports.help = {
    name: "ticket",
    description: 'Create a ticket for support.',
    usage: 'ticket | !ticket'
}