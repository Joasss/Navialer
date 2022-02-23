const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send("You do not have permission to unmute users.")
    message.delete({ timeout: 3000 });

    let UnmuteUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
    if (!UnmuteUser) return message.channel.send("Invalid User")

    const personunmute = message.mentions.users.first()
    const unmuteembed = new Discord.MessageEmbed()
        .setTitle(personunmute.username + " got unmuted by " + message.author.username)
        .setColor(`RANDOM`)
    message.channel.send(unmuteembed)
    
    var unmute = message.guild.roles.cache.find(role => role.name === "Muted");
    UnmuteUser.roles.remove(unmute)
}

module.exports.help = {
    name: "unmute",
    description: 'Unmute a user.',
    usage: 'unmute | !unmute <user>'
}