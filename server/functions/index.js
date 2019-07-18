const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors')();

admin.initializeApp(functions.config().firebase);

exports.start = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const db = admin.firestore();
    await db.collection('events').add({
      event: 'start',
      time: Date.now(),
    });

    res.send();
  });
});

exports.shutdown = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const db = admin.firestore();
    await db.collection('events').add({
      event: 'shutdown',
      time: Date.now(),
    });

    res.send();
  });
});

exports.history = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const url = req.body.url;
    const title = req.body.title;

    const db = admin.firestore();
    await db.collection('history').add({
      url,
      title,
      time: Date.now(),
    });

    res.send();
  });
});

exports.history_all = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const offset = req.query.offset;
    const limit = req.query.limit;

    const db = admin.firestore();
    const history = await db.collection('history')
      .orderBy('time', 'desc')
      .startAt(offset)
      .limit(limit);

    res.send(history);
  });
});

exports.uninstall = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const db = admin.firestore();
    await db.collection('events').add({
      event: 'uninstall',
      time: Date.now(),
    });

    res.send();
  });
});

exports.disabled = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const db = admin.firestore();
    await db.collection('events').add({
      event: 'disabled',
      time: Date.now(),
    });

    res.send();
  });
});

exports.events_all = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const offset = req.query.offset;
    const limit = req.query.limit;

    const db = admin.firestore();
    const events = await db.collection('events')
      .orderBy('time', 'desc')
      .startAt(offset)
      .limit(limit);

    res.send(events);
  });
});