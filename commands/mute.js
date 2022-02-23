const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send("You do not have permission to mute users.")
    message.delete({ timeout: 3000 });

    let MuteUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if (!MuteUser) return message.channel.send("Invalid User");
    if (MuteUse.permissions.has("MANAGE_MESSAGES")) return message.channel.send("No permission to warn this user.");

    const personmute = message.mentions.users.first()
    const muteembed = new Discord.MessageEmbed()
        .setTitle(personmute.username + " got permanently muted by " + message.author.username)
        .setColor(`RANDOM`)
    message.channel.send(muteembed)

    var muted = message.guild.roles.cache.find(role => role.name === "Muted");
    MuteUser.roles.add(muted)
}

module.exports.help = {
    name: "mute",
    description: 'Mute a user from talking.',
    usage: 'mute | !mute <user> <time>'
}