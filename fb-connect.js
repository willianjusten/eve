'use strict';

const request = require('request');
const settings = require('./settings.js');

exports.fbMessage = (recipientId, msg, cb) => {
  const fbReq = request.defaults({
    uri: 'https://graph.facebook.com/me/messages',
    method: 'POST',
    json: true,
    qs: { access_token: settings.FB_PAGE_TOKEN },
    headers: { 'Content-Type': 'application/json' }
  });

  const opts = {
    form: {
      recipient: {
        id: recipientId,
      },
      message: {
        text: msg,
      },
    },
  };
  fbReq(opts, (err, resp, data) => {
    if (cb) {
      cb(err || data.error && data.error.message, data);
    }
  });
};
