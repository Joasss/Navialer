const Discord = require('discord.js');
const moment = require('moment');
module.exports.run = async (client, message, args) => {
    message.delete({ timeout: 3000 });
    if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send("You do not have permission to unban users.")
    let userid = args.slice(0).join(" ");
    if (!userid) return message.channel.send('Please specify a user id.');
    if (isNaN(userid)) return message.channel.send('Please enter a valid user id.')
    message.guild.members.unban(userid)
    const unbanembed = new Discord.MessageEmbed()
        .setTitle(userid + " got unbanned by " + message.author.username)
        .setColor(`RANDOM`)
    message.channel.send(unbanembed)
    console.info(`${message.author.username} issued the !unban command.`)

}

module.exports.help = {
    name: "unban a user",
    description: 'Unban a user with their user-id.',
    usage: 'unban | !unban <userid>'
}