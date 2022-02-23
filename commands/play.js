const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const Discord = require('discord.js');
const { OpusEncoder } = require('@discordjs/opus');
module.exports.run = async (client, message, args) =>{
    const voiceChannel = message.member.voice.channel.members;
    if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel.");
    if (!args.length) return message.channel.send("You need to provide a second argument.");

    const connection = await message.member.voice.channel.join();
    const videoFinder = async (query) => {
        const videoResult = await ytSearch(query);

        return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    }

    const video = await videoFinder(args.join(' '));

    if (video) {
        const stream = ytdl(video.url, { filter: 'audioonly' });
        connection.play(stream, { seek: 0, volume: 1 });

        await message.channel.send(`:thumbsup: Now playing: **${video.title}**`)
    } else {
        message.channel.send("No videos were found.")
    }
}

module.exports.help = {
    name: "play",
    description: 'Play music from youtube directly.',
    usage: 'play | !play <name>'
}