module.exports = {
	name: 'quickie',
	description: 'ask who\'s ready to game right now.',
	execute(message) {
        const attachment = new MessageAttachment('https://media.giphy.com/media/cCalRsU3yKZoQILEEI/giphy.gif');
        message.channel.send(attachment)
            .then(message => console.log(`Sent gif and quickie message to channel #${message.channel.name} at ${moment().format()}!`))
            .catch(error => console.error(error));
        message.channel.send("@everyone who's ready to game rn??");
	},
};