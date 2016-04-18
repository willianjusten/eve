'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const Wit = require('node-wit').Wit;
const settings = require('./settings.js');

// Webserver parameter
const PORT = process.env.PORT || 8445;

// Messenger Helper Functions
const fbMessage = require('./fb-connect.js').fbMessage;
const getFirstMessagingEntry = require('./parser.js').getFirstMessagingEntry;

// Bot Stuff
const findOrCreateSession = require('./sessions.js').findOrCreateSession;
const actions = require('./bot.js').actions;
const sessions = require('./sessions.js').sessions;
const wit = new Wit(settings.WIT_TOKEN, actions);

// Starting our webserver and putting it all together
const app = express();
app.set('port', PORT);
app.listen(app.get('port'));
app.use(bodyParser.json());

// Webhook setup
app.get('/fb', (req, res) => {
  if (!settings.FB_VERIFY_TOKEN) {
    throw new Error('missing FB_VERIFY_TOKEN');
  }

  if (req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === settings.FB_VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

// Message handler
app.post('/fb', (req, res) => {
  const messaging = getFirstMessagingEntry(req.body);

  if (messaging && messaging.message && messaging.recipient.id === settings.FB_PAGE_ID) {
    const sender = messaging.sender.id;
    const sessionId = findOrCreateSession(sender);
    const msg = messaging.message.text;
    const atts = messaging.message.attachments;

    if (atts) {
      fbMessage(sender, 'Sorry I can only process text messages for now.');
    } else if (msg) {
      wit.runActions(
        sessionId,
        msg,
        sessions[sessionId].context,
        (error, context) => {
          if (error) {
            console.log('Oops! Got an error from Wit:', error);
          } else {
            console.log('Waiting for futher messages.');
            sessions[sessionId].context = context;
          }
        }
      );
    }
  }

  res.sendStatus(200);
});
