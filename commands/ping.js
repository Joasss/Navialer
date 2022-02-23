const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    message.delete({ timeout: 3000 });
    var ping = Date.now() - message.createdTimestamp + " ms";
    message.channel.send("Your ping is `" + `${Date.now() - message.createdTimestamp}` + " ms`");
}

module.exports.help = {
    name: "ping",
    description: 'Diplays your ping.',
    usage: 'ping | !ping'
}