const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    message.delete({ timeout: 3000 });

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!user) return message.channel.send('Please provide a user that you wish to report').then(m => m.delete({ timeout: 15000 }));

    let reason = args.slice(2).join(" ");
    if (!reason) return message.channel.send(`Please provide a reason for reporting **${user.user.username}**`).then(m => m.delete({ timeout: 15000 }));

    const ReportChannel = message.guild.channels.cache.get('787977995230511124');

    message.channel.send('Your report has been filed to the staff team. Thank you for reporting!').then(m => m.delete({ timeout: 15000 }));
    ReportChannel.send(`**${message.author.username}** has reported **${user.user.username}** for **${reason}**.`);
}

module.exports.help = {
    name: "report",
    description: 'Report a user with a reason.',
    usage: 'report | !report <user> <reason>'
}