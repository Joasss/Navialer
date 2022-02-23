const Discord = require('discord.js'); // 1.0.0 is music and fixes and !help update
const config = require('./config.json');
const client = new Discord.Client();
const fs = require('fs');
const swearwords = require("./commands/data/swearwords.json");

client.commands = new Discord.Collection();

client.on('ready', () => {
	client.user.setActivity('!help', { type: 'PLAYING' });
	console.log("Navialer Bot - Made by Joas#0368")
});

fs.readdir("./commands", (err, files) => {

	if (err) console.log(err);

	var jsFiles = files.filter(f => f.split(".").pop() === "js");

	if (jsFiles.length <= 0) {
		console.log("No files were found.");
		return;
	}

	jsFiles.forEach((f, i) => {

		var fileGet = require(`./commands/${f}`);
		console.log(`The file ${f} has been loaded.`);

		client.commands.set(fileGet.help.name, fileGet);
	})
});

client.on("message", async message => {

	var msg = message.content.toLowerCase();
	for (let i = 0; i < swearwords["swearwords"].length; i++) {
		if (msg.includes(swearwords["swearwords"][i])) {
			message.delete();
			return message.channel.send("Please do not swear.").then(msg => msg.delete({ timeout: 3000 }));
		}
	}

	if (message.author.bot) return;
	if (message.channel.type === 'dm') return;

	var prefix = config.prefix;

	var messageArray = message.content.split(" ");
	var command = messageArray[0];
	var args = messageArray.slice(1);

	var commands = client.commands.get(command.slice(prefix.length));

	if (commands) commands.run(client, message, args);
});

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
		fs.writeFile("/data/levels.json", JSON.stringify(levelfile), err => {
			if (err) console.log(err);
		});
		var embedlevel = new Discord.MessageEmbed()
			.setDescription("Level up!")
			.setColor(`RANDOM`)
			.addField("New level: ", levelfile[idUser].level);
		message.channel.send(embedlevel)
	}
}

client.on('guildMemberAdd', member => {
	client.channels.cache.get('801400757676802058').send(`Welcome ${member} to the Discord!`);
})

client.on('guildMemberRemove', member => {
	client.channels.cache.get('801400757676802058').send(`${member} left the Discord!`);
})

client.on('messageDelete', message => {
	console.log(`A message saying "${message.cleanContent}" was deleted from channel: ${message.channel.name} by ${message.author} at ${new Date()}`);
	client.channels.cache.get('801421419120033812').send(`A message saying "${message.cleanContent}" was deleted from channel: ${message.channel.name} by ${message.author} at ${Date()}`);
  });

client.login(config.token)