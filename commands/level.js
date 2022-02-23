const Discord = require('discord.js');
const levelfile = require('./data/levels.json');
const fs = require('fs');
module.exports.run = async (client, message, args) => {
    message.delete({ timeout: 3000 });
    RandomXP(message);
    var idUser = message.author.id;
    const levelembed = new Discord.MessageEmbed()
        .addField("Current XP: ", levelfile[idUser].xp)
        .addField("Current level: ", levelfile[idUser].level)
        .setColor(`RANDOM`)
    message.channel.send(levelembed);
}

function RandomXP(message) {

    var randomNumber = Math.floor(Math.random() * 15) + 1;
    var idUser = message.author.id;
    if (!levelfile[idUser]) {
        levelfile[idUser] = {
            xp: 0,
            level: 0
        }
    }
    levelfile[idUser].xp += randomNumber;
    var leveluser = levelfile[idUser].level;
    var xpuser = levelfile[idUser].xp;
    var nextLevelXp = leveluser * 300;

    if (nextLevelXp === 0) nextLevelXp = 100;
    if (xpuser >= nextLevelXp) {
        levelfile[idUser].level += 1;
        fs.writeFile("./data/levels.json", JSON.stringify(levelfile), err => {
            if (err) console.log(err);
        });
        var embedlevel = new Discord.MessageEmbed()
            .setDescription("Level up!")
            .setColor(`RANDOM`)
            .addField("New level: ", levelfile[idUser].level);
        message.channel.send(embedlevel)
    }
}

module.exports.help = {
    name: "level",
    description: 'Displays your XP and Level.',
    usage: 'level | !level'
}