const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    message.delete({ timeout: 3000 });
    const catogoryID = "801749300496302111";
    if (!message.member.hasPermission("KICK_MEMBER")) return message.channel.send("You do not have the permission to do this.");
    if (message.channel.parentID === catogoryID) {
        message.channel.delete();
    } else {
        message.channel.send("Please use this command inside a ticket.");
    }
    var TicketClose = new Discord.MessageEmbed()
        .setTitle("Ticket " + message.channel.name)
        .setDescription("Ticket has now been marked as finished.")
        .setFooter("Ticket closed")
    var TicketChannel = message.member.guild.channels.cache.find(channel => channel.name === "📝»log");
    if (!TicketChannel) message.channel.send("Channel does not exist.")
    TicketChannel.send(TicketClose);
}

module.exports.help = {
    name: "close",
    description: 'Close a ticket and delete it.',
    usage: 'close | !close'
}