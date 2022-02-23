const Discord = require('discord.js');
const moment = require('moment');
module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send("You do not have permission to clear messages.")
    message.delete();
    let msges = args.slice(0).join(" ");
    if (!msges) return message.channel.send('Please a valid amount of messages to delete.').then(m => m.delete({ timeout: 15000 }));
    if (isNaN(msges)) return message.channel.send('Please enter a valid number.');
    if (msges > 100) return message.channel.send('Please enter a number between 1-100.');
    if (msges < 1) return message.channel.send('Please enter a number between 1-100.');
    message.channel.bulkDelete(msges);

    console.info(`${message.author.username} issued the !clear command. (${msges})`)

}

module.exports.help = {
    name: "clear",
    description: 'Clear a specific amount of messages.',
    usage: 'clear | !clear <amount>'
}