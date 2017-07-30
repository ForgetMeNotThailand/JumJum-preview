"use strict";

var builder = require("botbuilder");
global.builder = builder;
var botbuilder_azure = require("botbuilder-azure");
var path = require('path');

var useEmulator = (process.env.NODE_ENV == 'development');

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

var bot = new builder.UniversalBot(connector, { localizerSettings: { defaultLocale: "th" } });
global.bot = bot;

bot.localePath(path.join(__dirname, './locale'));

// Helper function for sendTyping
function sendTextWithTyping (session, timeout, text, step = 0) {
    if (step == 1) {
        session.sendTyping();
    } 
    setTimeout(function () {
        session.send(text);
        if (step !== -1) { 
            session.sendTyping(); 
        }
    }, timeout);
}
global.sendTextWithTyping = sendTextWithTyping;

// All dialogs
require('./dialogs/welcome.js')();
require('./dialogs/thaiDementia.js')();
require('./dialogs/DKQ.js')();
require('./dialogs/randomFacts.js')();

// Entry point of the bot
bot.dialog('/', [
    function (session) {

        // Remove existing user data during development
        if (useEmulator) {
            session.userData = {}; 
        }
    
        // Less typing time during development
        global.SECOND = useEmulator ? 100 : 1000;

        session.beginDialog('/welcome');
    }
]);

if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpoint at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = { default: connector.listen() }
}
