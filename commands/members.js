const Discord = require('discord.js');
const moment = require('moment');
module.exports.run = async (client, message, args) => {
    message.delete({ timeout: 3000 });
    let myGuild = client.guilds.cache.get("787977994382868500");
    let memberCount = myGuild.memberCount;
    message.channel.send("This server has:  `" + `${memberCount}` + " members.`")

}

module.exports.help = {
    name: "members",
    description: 'See the current amount of members.',
    usage: 'members | !members'
}