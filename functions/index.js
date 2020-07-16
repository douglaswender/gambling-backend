const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gambling-club.firebaseio.com"
});

const db = admin.firestore();
const express = require('express');
const cors = require('cors');
const games = require('./routes/games')(db);
const match = require('./routes/match')(db);
const profile = require('./routes/profile')(db);
const standings = require('./routes/standings')(db);
const login = require('./routes/login')(db);

const app = express();

app.use(cors({ origin: true }));

app.use('/games', games);
app.use('/match', match);
app.use('/profile', profile);
app.use('/standings', standings);
app.use('/login', login);

app.get('/', (req, res) => {
  return res.status(200).send('Hello World');
})

// create
app.post('/api/create', (req, res) => {
  (async () => {
    try {
      await db.collection('items').doc('/' + req.body.id + '/')
        .create({ item: req.body.item });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});



exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
