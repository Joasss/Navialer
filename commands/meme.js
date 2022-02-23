const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
module.exports.run = async (client, message, args) => {
    message.delete({ timeout: 3000 });
    const subReddits = ["dankmeme", "memes"]
    const random = subReddits[Math.floor(Math.random() * subReddits.length)]

    const img = await randomPuppy(random);

    const embed = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        .setImage(img)
        .setTitle(`Your meme from r/${random}`)
        .setURL(`https://reddit.com/r/${random}`);
    message.channel.send(embed);
}

module.exports.help = {
    name: "meme",
    description: 'See a meme from r/memes or r/dankmemes.',
    usage: 'meme | !meme'
}