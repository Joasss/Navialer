const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    message.delete({ timeout: 3000 });
    let user = message.mentions.users.first() || message.author
    let avatar = user.displayAvatarURL({ size: 1024 })
    const embed = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s avatar`)
        .setImage(avatar)
        .setColor(`RANDOM`)
    message.channel.send(embed)
}

module.exports.help = {
    name: "avatar",
    description: 'Displays a users avatar.',
    usage: 'avatar | !avatar <user>'
}