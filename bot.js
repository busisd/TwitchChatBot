const tmi = require('tmi.js');
const oauthToken = require("../secrets").twitchBotOauth;

// Define configuration options
const opts = {
    identity: {
        username: 'mydan123',
        password: oauthToken
    },
    channels: [
        'mydan123'
    ]
};
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    console.log(target);
    console.log(context);
    console.log(msg);
    console.log(self);

    // Remove whitespace from chat message
    const commandName = msg.trim();

    // If the command is known, let's execute it
    switch(commandName) {
        case ('!dice'):
            const num = rollDice();
            client.say(target, `You rolled a ${num}`);
            console.log(`* Executed ${commandName} command`);
            break;
        case ('!gnome'):
            client.say(target, gnomeText);
            console.log(`* Executed ${commandName} command`);
            break;
        default:
            console.log(`* Unknown command ${commandName}`);
            break;
    }
}
// Function called when the "dice" command is issued
function rollDice () {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
}
const gnomeText = `
⣿⣿⣿⣿⠏⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠙⢿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⡏⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢿⣿⣿⣿⣿⣿⣿
⣿⣿⡿⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢸⣿⣿⣿⣿⣿
⣿⣿⣤⣀⢠⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣾⣿⣿⣿⣿⣿
⣿⣿⣿⡟⣻⣿⣿⣿⣿⣿⣟⠉⠙⢹⣿⣏⠉⢹⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢿⡿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⠟⠋⠄⣿⣿⣿⣿⣿⣿⣿⣟⡛⠛⢛⣛⣿⣿⣿⣿⣿⣿⣿⣿⣿
⡟⠁⠄⠄⠄⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⡇⠄⠄⠄⠄⠄⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠛⠿⠛⠻⣿
⡇⠄⠄⠄⠄⠄⠄⠘⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠄⠄⠄⠄⣠⣽
⣇⣀⠄⣀⡀⢀⠄⠄⠄⠄⠙⠛⠛⠿⣿⢿⠿⠟⠛⠄⠄⠄⠄⠈⢿⣿
`
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
