module.exports = {
    name: "highlight",
    description: "Highlights a text with the embed",
    syntax: "{Message}",
    aliases: ['hl'],
    category: "Utility",
    execute(message, args) {
        const Discord = require('discord.js');
        
        let highlightedMessage = "";
        args.forEach(arg => {
            highlightedMessage += arg + " ";
        });

        let user = message.member.user.tag;
        user = user.toString();
        user = user.split("#", user.length - 4);
        let authorName = user[0];

        let highlightEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(highlightedMessage)
            .setFooter(authorName);

        message.channel.send(highlightEmbed);
        message.delete();
    }
}