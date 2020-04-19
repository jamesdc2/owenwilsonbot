if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

const { Client, MessageAttachment, MessageEmbed} = require("discord.js");

const client = new Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', message => {
    // If the message is "oh wow"
    if (message.content.toLowerCase().indexOf('oh wow') >= 0) {
        // Send the gif to the same channel
        const attachment = new MessageAttachment('https://media.giphy.com/media/ZsQSYaXdrZNm/giphy.gif');
        message.channel.send(attachment)
            .then(message => console.log(`Sent message!`))
            .catch(error => console.error(error));
    }
});

client.login(process.env.DISCORD_TOKEN);

process.on('beforeExit', code => {
// Can make asynchronous calls
    setTimeout(() => {
        console.log(`Process will exit with code: ${code}`)
        process.exit(code)
    }, 100)
});

process.on('exit', code => {
    // Only synchronous calls
    console.log(`Process exited with code: ${code}`)
});