const Discord = require('discord.js');
const moment = require('moment');
module.exports.run = async (client, message, args) => {
    message.delete({ timeout: 3000 });

    let user = message.mentions.users.first() || message.author;

    const joinDiscord = moment(user.createdAt).format('llll');
    const joinServer = moment(user.joinedAt).format('llll');

    let embed = new Discord.MessageEmbed()
        .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
        .setDescription(`${user}`)
        .setColor(`RANDOM`)
        .setImage(user.avatarURL())
        .addField(`${user.tag}`, `${user}`, true)
        .addField("ID:", `${user.id}`, true)
        .addField("Nickname:", `${Discord.GuildMember.nickname !== null ? `${Discord.GuildMember.nickname}` : 'None'}`, true)
        .addField("Status:", `${user.presence.status}`, true)
        .addField("In Server", message.guild.name, true)
        .addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
        .addField("Bot:", `${user.bot}`, true)
        .addField("Joined The Server On:", `${moment.utc(Discord.GuildMember.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
        .addField("Account Created On:", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true)
        .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
        .setFooter(`ID: ${user.id}`)
        .setTimestamp();

    message.channel.send({ embed: embed });

}

module.exports.help = {
    name: "userinfo",
    description: 'See cool statistics of other users.',
    usage: 'userinfo | !userinfo <user>'
}