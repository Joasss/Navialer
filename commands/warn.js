const Discord = require('discord.js');
const fs = require('fs')
const warnfile = require("./data/warns.json");
module.exports.run = async (client, message, args) => {
    message.delete({ timeout: 3000 });
    if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send("You do not have permission to warn users.")
    var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    var warnReason = args.slice(1).join(" ");
    if (!args[0]) return message.channel.send("Please give a user.");
    if (!warnUser) return message.channel.send("Cannot find this user.");
    if (!args[1]) return message.channel.send("Please give a reason.");
    if (warnUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No permission to warn this user.");
    if (!warnfile[warnUser.id]) {
        warnfile[warnUser.id] = {
            warns: 0,
        }
    }
    warnfile[warnUser.id].warns += 1;
    fs.writeFile("/data/warns.json", JSON.stringify(warnfile), err => {
        if (err) console.log(err);
    });
    const warnembed = new Discord.MessageEmbed()
        .setTitle(message.mentions.users.first() + " got warned by " + message.author.username)
        .setDescription("Warn reason: " + warnReason)
        .addField("Total warns", warnfile[warnUser.id].warns)
        .setColor(`RANDOM`);
    message.channel.send(warnembed)
    console.log(warnUser.username + " got warned by " + message.author.username);
    console.log("Reason: " + warnReason);
}

module.exports.help = {
    name: "warn",
    description: 'Warn a user.',
    usage: 'warn | !warn <user> <reason>'
}