module.exports = function (db) {
  //app.get('/api/users')
  const getAllUsers = async (req, res) => {
    const users = await db.many(`select * from users`);
    res.json({users});
  };
  //app.get('/api/user')
  const getUser = async (req, res) => {
    const {email, user_id} = req.query;
    if (!email && !user_id) res.sendStatus(400);
    try {
      let user;
      if (email) {
        user = await db.one('select * from users where email = $1', [email]);
      } else {
        user = await db.one('select * from users where id = $1', [user_id]);
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.sendStatus(401);
    }
  };
  //app.post('/api/register/business')
  const registerBusiness = async (req, res) => {
    const {businessName, owner_id, category, logo} = req.body;
    if (!businessName || !owner_id || !category) {
       res.sendStatus(400);
    }
    await db
      .one(
        `INSERT into businesses (business_name, owner_id, category, logo) VALUES ($1, $2, $3, $4) RETURNING id`,
        [businessName, owner_id, category, logo],
      )
      .then((result) => {
        res.status(201).json(result);
        next(); 
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  };

  //app.get('/api/business')
  const getBusiness = async (req, res) => {

    try {
      const {id} = req.query;
      const checkForOwnerId = await db.oneOrNone(
        `select * from businesses where owner_id = $1`,
        [id],
      );
      if (checkForOwnerId.length > 0) {
        const businessData = await db.many(
          `select (business_name, owner_id, category, logo) from businesses where owner_id = $1`,
          [id],
        );
        res.json(businessData);
      }
      next();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getAllUsers,
    getUser,
    registerBusiness,
    getBusiness,
  };
};
