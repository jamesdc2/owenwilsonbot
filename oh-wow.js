require('dotenv').config();

const { Client, MessageAttachment, MessageEmbed} = require("discord.js");

const client = new Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', message => {
    // If the message is "oh wow"
    if (message.content.toLowerCase() === 'oh wow') {
        // Send the gif to the same channel
        const attachment = new MessageAttachment('https://media.giphy.com/media/ZsQSYaXdrZNm/giphy.gif');
        message.channel.send(attachment)
            .then(message => console.log(`Sent message!`))
            .catch(console.error);
    }
});

client.login(process.env.DISCORD_TOKEN);