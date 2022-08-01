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
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  };

  //app.get('/api/business')
  const getBusiness = async (req, res) => {
    const {id} = req.params;
    if (!id) res.sendStatus(400);
    try {
      const businessData = await db.one(
        `select business_name, owner_id, category, logo from businesses where owner_id = $1`,
        [id],
      );
      res.json(businessData);
    } catch (err) {
      console.log(err);
    }
  };

  //app.delete('/api/delete/business')
  const deleteBusiness= async (req, res) => {
    try {
      const {ownerID} = req.query;
      db.none(`delete from businesses where owner_id = $1`, [
        ownerID,
      ]);
      res.status(200).send('deleted');
    } catch (err) {
      console.log(err);
      res.status(400).send(err.message);
    }
  };

  //app.post('/api/edit/business')
  const editBusiness = async (req, res) => {
    try {
      const {businessName, category, logo, owner_id} = req.body;

      const updatedDetails = await db.one(
        `update businesses set business_name = $1, category = $2, logo = $3 
         where owner_id = $4 returning *`,
        [businessName, category, logo, owner_id],
      );
      res.status(200);
      res.json(updatedDetails);
    } catch (err) {
      console.log(err);
      res.status(400).send(err.message);
    }
  };


  return {
    getAllUsers,
    getUser,
    registerBusiness,
    getBusiness,
    deleteBusiness,
    editBusiness,
  };
};
