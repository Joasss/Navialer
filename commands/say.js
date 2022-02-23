const Discord = require('discord.js');
const moment = require('moment');
module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send("You do not have permission to annnounce a message.")
    message.delete({ timeout: 3000 });
    let channel = message.mentions.channels.first();
    if (!channel) return message.channel.send("Please provide a channel.")

    let msg = args.slice(1).join(" ");
    if (!msg) return message.channel.send(`Please give a message to send to **${channel}**`).then(m => m.delete({ timeout: 15000 }));
    message.channel.send('Your message has been sent.').then(m => m.delete({ timeout: 15000 }));
    channel.send(`${msg}`);

}

module.exports.help = {
    name: "say",
    description: 'Send a message to a channel.',
    usage: 'say | !say <channel> <msg>'
}