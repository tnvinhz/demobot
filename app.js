"use strict";
var restify = require('restify');
var builder = require('botbuilder');
var https = require('https');
var rp = require('request-promise');
var motivation = require("motivation");

var MICROSOFT_APP_ID = '85827e55-6e1b-41e8-aadf-1048971067be';
var MICROSOFT_APP_PASSWORD = 'lE(Rr?aEa&v1&B=w';

var header = {'Content-Type':'application/json', 'Ocp-Apim-Subscription-Key':'6fb7959510a84e389985fd3343705e6b'}
var requestUrl = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment';
var task;
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3477, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: MICROSOFT_APP_ID,
    appPassword: MICROSOFT_APP_PASSWORD
});

// Listen for messages from users  
server.post('/api/messages', connector.listen());  
// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:') 
var bot = new builder.UniversalBot(connector, function (session) {     
session.send("hello", session.message.text); 
});