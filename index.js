const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES']});
const { prefix } = require('./config.json');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config(); //Build the process.env object.
client.commands = new Discord.Collection();

// Gets all commands in commands folder
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    exports.client = client;
});

setInterval(botStatus, 60000);
function botStatus() {
    client.user.setActivity(client.guilds.cache.size + " servers| -help for help");
}

client.login(process.env.token);

client.on('message', message => {
    // Check if the message was sent by the bot
    if (message.author.bot) return;

    // Check if message starts with the prefix
    if (!message.content.startsWith(prefix)) return;

    // Removes prefix and seperates 
    const args = message.content.slice(prefix.length).match(/\S+/g);
    const commandName = args.shift().toLowerCase();
    // Gets command
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) {
        message.channel.send(`Invalid command. Type ${prefix}help for commands to use.`);
    }
    else {
        command.execute(message, args);
    }
});