// const verify = (req, res, next) => {
//     const idToken =
//       req.headers.authorization && req.headers.authorization.split(' ')[1];
//     if (!req.headers.authorization || !idToken) {
//       res.sendStatus(401);
//       return;
//     }

//     getAuth()
//       .verifyIdToken(idToken)
//       .then((decodedToken) => {
//         const {uid} = decodedToken;
//         if (uid) {
//           next();
//         } else {
//           res.status(403).json({
//             message: 'unauthorized',
//           });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function (db) {
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
    if (!email || !password) res.sendStatus(400);
    try {
      const user = await db
        .oneOrNone('select * from users where email = $1', [email])
        .catch((err) => res.send(err));
      await bcrypt
        .compare(password, user.password)
        .then((decrypt) => {
          res.json({id: user.id});
        })
        .catch((err) => res.send(err));
    } catch (error) {
      res.send(error);
    }
  };
  return {
    registerUser,
    userLogin,
  };
};
