module.exports.run = async (client, message, args) => {
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
    if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send("You do not have permission to ban users.")

    message.delete({ timeout: 3000 });


    if (!user) return message.channel.send("Please specify a user.")

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No permission to ban this user.");

    let reason = args.join(" ").slice(22);
    if (!reason) {
        reason = "None"
    }

    const banned = message.mentions.users.first()
    const embed = new Discord.MessageEmbed()
        .setTitle(banned.username + " got permanently banned by " + message.author.username)
        .setColor(`RANDOM`)
    message.channel.send(embed)
    user.ban({ reason: reason })
}

module.exports.help = {
    name: "ban",
    description: 'Permanently ban a user.',
    usage: 'ban | !ban <user>'
}