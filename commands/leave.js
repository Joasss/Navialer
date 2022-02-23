const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    const voiceChannel =  message.member.voice.channel;

    if (!voiceChannel) return message.channel.send("You need to be in a voice channel.")
    await voiceChannel.leave();
    await message.channel.send("Leaving voice channel.")
}

module.exports.help = {
    name: "leave",
    description: 'Leave the voice channel.',
    usage: 'leave | !leave'
}