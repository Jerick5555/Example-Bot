module.exports = {
    name: "help",
    description: "Help command",
    syntax: "{Command to check}",
    category: "Utility",
    execute(message, args) {
        const Discord = require('discord.js');
        const client = require('../index.js').client;
        const { prefix } = require('./config.json');

        message.channel.send('type help + {command name for specific help on that command}');
        const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));

        // Check if command exists or if user inputted a command
        if (!command || args[0] == undefined) {
            let helpEmbed = new Discord.MessageEmbed()
                .setColor('#FF69B4')
                .setTitle(`All commands, To get help for each command do ${prefix}help {command name}`);
            let fieldsToAdd = [];

            // Finds all the categories of the commands
            for (let commandName of client.commands.keys()) {
                let categoryExists = false;
                let commandCategory = client.commands.get(commandName).category;
                for (let i = 0; i < fieldsToAdd.length; i++) {
                    if (commandCategory == fieldsToAdd[i][0]) {
                        fieldsToAdd[i][1].push(commandName);
                        categoryExists = true;
                    }
                }
                if (!categoryExists) {
                    fieldsToAdd.push([commandCategory, [commandName]]);
                }
            }
            let numCategory = fieldsToAdd.length;

            // Adds category fields to embed
            for (let i = 0; i < numCategory; i++) {
                let fieldValue = "";
                let numCommandsInCategory = fieldsToAdd[i][1].length;

                // Adds commands to its respective category
                for (let j = 0; j < numCommandsInCategory; j++) {
                    fieldValue += "`" + fieldsToAdd[i][1][j] + "` ";
                }
                helpEmbed.addField(fieldsToAdd[i][0], fieldValue);
            }
            message.channel.send(helpEmbed);
        }
        else {
            // Send embed of command's info
            helpEmbed = new Discord.MessageEmbed()
                .setColor('#FF69B4')
                .setTitle(`${command.name.charAt(0).toUpperCase() + command.name.slice(1)} help`)
                .addFields(
                    { name: command.description, value: `Syntax: ${prefix}${command.name} ${command.syntax||""}` },
                );
            message.channel.send(helpEmbed);
        }
    }
};