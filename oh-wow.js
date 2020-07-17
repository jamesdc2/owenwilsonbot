if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

var moment = require('moment');

const { Client, MessageAttachment} = require("discord.js");

const client = new Client();

var keywords = require('./keywords.json');
keywords.forEach((item) => {
    console.log(`keyword: ${item.keyword}, gif: ${item.gif}`);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} at ${moment().format()}!`)
});

client.on('message', message => {
    
    // process keywords from the file
    keywords.forEach((item) => {
        if (message.content.toLowerCase().indexOf(item.keyword) >= 0) {
            const attachment = new MessageAttachment(item.gif);
            message.channel.send(attachment)
                .then(message => console.log(`Sent gif to channel #${message.channel.name} at ${moment().format()}!`))
                .catch(error => console.error(error));
        }
    });

    if (message.content.toLowerCase() === "!rollcall")
    {
        const attachment = new MessageAttachment('https://media.giphy.com/media/2YtTdoSEl4m4/giphy.gif');
        message.channel.send(attachment)
            .then(message => console.log(`Sent gif and roll call message to channel #${message.channel.name} at ${moment().format()}!`))
            .catch(error => console.error(error));
        message.channel.send("@everyone who's gaming tonight?");
    }

    if (message.member.roles.cache.find(r => r.name === "cone of shame"))
    {
        message.delete()
            .then(message => console.log(`${message.member.nickname} tried to say ${message.content} at ${moment().format()}!`))
            .catch(error => console.error(error));

        message.channel.send(`${message.author.toString()} tried to say something but the cone of shame prevents them from speaking!`)
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