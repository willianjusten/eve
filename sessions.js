'use strict';

const sessions = {};

exports.findOrCreateSession = (fbid) => {
  let sessionId;

  Object.keys(sessions).forEach(k => {
    if (sessions[k].fbid === fbid) {
      sessionId = k;
    }
  });

  if (!sessionId) {
    sessionId = new Date().toISOString();
    sessions[sessionId] = { fbid: fbid, context: {} };
  }

  return sessionId;
};

exports.sessions = sessions;
