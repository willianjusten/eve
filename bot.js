'use strict';

const fbMessage = require('./fb-connect.js').fbMessage;
const sessions = require('./sessions.js').sessions;

exports.actions = {
  say: (sessionId, context, message, cb) => {
    const recipientId = sessions[sessionId].fbid;
    if (recipientId) {
      fbMessage(recipientId, message, (err, data) => {
        if (err) {
          console.log('Oops! An error occurred while forwarding the response to', recipientId, ':', err);
        }

        cb();
      });
    } else {
      console.log('Oops! Couldn\'t find user for session:', sessionId);
      cb();
    }
  },

  merge: (sessionId, context, entities, message, cb) => {
    cb(context);
  },

  error: (sessionId, context, error) => {
    console.log(error.message);
  }
};
