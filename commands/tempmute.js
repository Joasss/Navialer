const Discord = require('discord.js');
const moment = require('moment');
module.exports.run = async (client, message, args) => {
    message.delete({ timeout: 3000 });
    if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send("You do not have permission to tempmute users.")
    var TempMuteUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No permission.");
    if (!args[1]) return message.channel.send("Please give a user.");
    if (!TempMuteUser) return message.channel.send("Cannot find this user.");
    if (TempMuteUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No permission to tempmute this user");
    var TempMuteRole = message.guild.roles.cache.get('787977994382868501');
    if (!TempMuteRole) return message.channel.send("No role called 'Muted' was found.");
    var TempMuteTime = args[2];
    if (!TempMuteTime) return message.channel.send("Please give an amount of time to mute this user.");
    await (TempMuteUser.roles.add(TempMuteRole.id));
    const PersonTempMute = message.mentions.users.first()
    const TempMuteEmbed = new Discord.MessageEmbed()
        .setTitle(PersonTempMute.username + " got tempmuted by " + message.author.username)
        .setDescription("Mute time: " + TempMuteTime)
        .setColor(`RANDOM`);
    message.channel.send(TempMuteEmbed)
    message.delete();
    setTimeout(() => {
        TempMuteUser.roles.remove(TempMuteRole.id);
        const TempMuteEndEmbed = new Discord.MessageEmbed()
            .setTitle(PersonTempMute.username + " was unmuted.")
            .setColor(`RANDOM`);
        message.channel.send(TempMuteEndEmbed)
    }, ms(TempMuteTime));

}

module.exports.help = {
    name: "tempmute",
    description: 'Mute a user for a period of time.',
    usage: 'tempmute | !tempmute <user> <time>'
}