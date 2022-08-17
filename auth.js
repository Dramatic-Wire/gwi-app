const admin = require('firebase-admin');
const {getAuth} = require('firebase-admin/auth');
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = function (db) {
  const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const uid = req.headers['uid'];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    getAuth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        if (uid == decodedToken.uid) {
          next();
        } else {
          res.sendStatus(403);
        }
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(403);
      });
  };

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
    const {email, password, idToken} = req.body;
    console.log(req.headers['uid']);
    getAuth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        console.log(decodedToken);
      })
      .catch((error) => {
        console.log(error);
      });

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
    verifyToken,
  };
};
