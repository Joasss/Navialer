const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    message.delete({ timeout: 3000 });
    if (!args[0]) return message.channel.send("Please enter a nickname.");
    message.member.setNickname(args[0])
    message.channel.send("Changed your nickname!");
}

module.exports.help = {
    name: "nick",
    description: 'Nickname to change your displayname.',
    usage: 'nick | !nick <nickname>'
}