const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send("You do not have permission to kick members.")
    message.delete({ timeout: 3000 });

    let User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!User) return message.channel.send("Please specify who to kick.");
    
    let kickReason = args.join(" ").slice(22);
    if (!kickReason) {
        kickReason = "None"
    }
    User.kick({ reason: kickReason })

    const person = message.mentions.users.first();

    const kickembed = new Discord.MessageEmbed()
        .setTitle(person.username + " got kicked by " + message.author.username)
    message.channel.send(kickembed)
}

module.exports.help = {
    name: "kick",
    description: 'Kick a user out of the discord.',
    usage: 'kick | !kick <user>'
}