const initializeApp = require('firebase/app').initializeApp;
const {getAuth, signInWithEmailAndPassword} = require('firebase/auth');
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// const auth = require('firebase-admin');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const {initializeApp} = require('firebase-admin/app');
// // Initialize the default app
// const defaultApp = initializeApp(process.env.FIREBASE_CONFIG);

// // Retrieve services via the defaultApp variable...
// let defaultAuth = getAuth(defaultApp);
// let defaultDatabase = getDatabase(defaultApp);

module.exports = function (db) {
  // getAuth()
  //   .verifyIdToken(idToken)
  //   .then((decodedToken) => {
  //     const {uid} = decodedToken;
  //     if (uid) {
  //       next();
  //     } else {
  //       res.status(403).json({
  //         message: 'unauthorized',
  //       });
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  //app.post('/api/register/user')
  const registerUser = async (req, res) => {
    const {username, first_name, surname, email, password, profile_picture} =
      req.body;
    bcrypt.hash(password, saltRounds).then(async function (hash) {
      await db
        .one(
          'insert into users (username, first_name, surname, email, password, profile_picture) values ($1, $2, $3, $4, $5, $6) returning id',
          [username, first_name, surname, email, hash, profile_picture],
        )
        .then((result) => {
          res.status(201);
          res.json(result);
        })
        .catch((err) => {
          res.status(400).send(err.message);
        });
    });
  };

  //app.post('/api/login')
  const userLogin = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
      res.sendStatus(400);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredentials) => {
          const user = userCredentials.user;
          res.json(user);
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    }
  };

  return {
    registerUser,
    userLogin,
  };
};

const verify = (req, res, next) => {
  const idToken =
    req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!req.headers.authorization || !idToken) {
    res.sendStatus(401);
    return;
  }

  getAuth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const {uid} = decodedToken;
      if (uid) {
        next();
      } else {
        res.status(403).json({
          message: 'unauthorized',
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
