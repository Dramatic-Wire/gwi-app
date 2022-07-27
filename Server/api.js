const bcrypt = require('bcrypt');
const saltRounds = 10;
const moment = require('moment');

module.exports = function (db) {
  //app.get('/api/users')
  const getAllUsers = async (req, res) => {
    const users = await db.many(`select * from users`);
    res.json({users});
  };
  //app.get('/api/user')
  const getUser = async (req, res) => {
    const {email} = req.query;
    if (!email) res.sendStatus(400);
    try {
      const user = await db.one('select * from users where email = $1', [
        email,
      ]);
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

  //app.post('/api/addLP')
  const addLoyaltyProgramme = async (req, res) => {
    try {
      const {business_id, stamps, reward, validFor} = req.body;

      await db.none(
        `INSERT into loyalty_programmes (business_id, stamps, reward, valid_for) VALUES ($1, $2, $3, $4)`,
        [business_id, stamps, reward, validFor],
      );
      res.sendStatus(201);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  //app.get('/api/LP')
  const getLoyaltyProgramme = async (req, res) => {
    try {
      const {id} = req.query;
      const lpData = await db.one(
        `select * from loyalty_programmes where business_id = $1`,
        [id],
      );
      res.json(lpData);
    } catch (err) {
      console.log(err);
    }
  };

  //app.get('/api/LP/:LP_id/users')
  const getLoyaltyProgrammeUsers = async (req, res) => {
    const {LP_id} = req.params;
    if (!LP_id) res.sendStatus(400);
    try {
      const users = await db.one(
        'SELECT COUNT(distinct customer_id) FROM stamps where lp_id = $1 GROUP BY lp_id',
        [LP_id],
      );
      res.json(users);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
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
  //app.post('/api/register/user')
  const registerUser = async (req, res) => {
    const {username, first_name, surname, email, password, profile_picture} =
      req.body;
    bcrypt.hash(password, saltRounds).then(async function (hash) {
      await db
        .none(
          'insert into users (username, first_name, surname, email, password, profile_picture) values ($1, $2, $3, $4, $5, $6)',
          [username, first_name, surname, email, hash, profile_picture],
        )
        .then(() => {
          res.sendStatus(201);
        })
        .catch((err) => {
          res.status(400).send(err.message);
        });
    });
  };
  //app.post('/api/login')
  const userLogin = async (req, res) => {
    try {
      let message;
      const {email, password} = req.body;
      const user = await db.oneOrNone('select * from users where email = $1', [
        email,
      ]);
      const decrypt = await bcrypt.compare(password, user.password);

      if (!decrypt) {
        message = 'Wrong password';
      } else {
        message = 'logged in';
      }

      res.json({
        result: message,
      });
    } catch (error) {
      res.json({
        message: error.message,
      });
    }
  };
  //app.post('/api/add/stamp')
  const addStamp = async (req, res) => {
    try {
      const {UserId, LPid, timestamp, redeemed} = req.body;
      //redeemed
      await db.none(
        'insert into stamps (customer_id, lp_id, timestamp, redeemed) values ($1, $2, $3, $4)',
        [UserId, LPid, timestamp, redeemed],
      );
      res.sendStatus(201);
    } catch (error) {
      res.send(error);
    }
  };
 //app.post('/api/edit/LP')
  const editLoyaltyProgramme = async (req, res) => {
    try {
      const {stamps, reward, valid_for, business_id} = req.body;

      const updatedDetails = await db.one(
        'update loyalty_programmes set stamps = $1, reward = $2, valid_for = $3 where business_id = $4 returning *',
        [stamps, reward, valid_for, business_id],
      );
      res.status(200);
      res.json(updatedDetails);
    } catch (err) {
      console.log(err);
      res.status(400).send(err.message);
    }
  };
  //app.delete('/api/delete/LP')
  const deleteLoyaltyProgramme = async (req, res) => {
    try {
      const {businessID} = req.query;
      db.none('delete from loyalty_programmes where business_id = $1', [
        businessID,
      ]);
      res.status(200).send('deleted');
    } catch (err) {
      console.log(err);
      res.status(400).send(err.message);
    }
  };
  //app.get('/api/stamps')
  const getCustomerStamps = async (req, res) => {
    const {customer_id} = req.query;
    if (!customer_id) res.sendStatus(400);
    try {

      const selectFromStamps = 'select stamps.timestamp, stamps.redeemed, stamps.lp_id'
      const selectFromLP = 'loyalty_programmes.stamps as stampsNeeded, loyalty_programmes.reward, loyalty_programmes.valid_for'
      const selectFromBusiness = 'businesses.business_name, businesses.category from stamps'
      const joinLP = 'join loyalty_programmes on stamps.lp_id=loyalty_programmes.id'
      const joinBusiness = 'join businesses on loyalty_programmes.business_id = businesses.id where stamps.customer_id = $1';
      const where = 'where stamps.customer_id = $1'

      const result = await db.many(`${selectFromStamps}, ${selectFromLP}, ${selectFromBusiness} ${joinLP} ${joinBusiness} ${where}`,[customer_id]);

      const notRedeemed = result.filter((stamp) => stamp.redeemed == 'false');
      const notExpired = notRedeemed.filter((stamp) => {
        const {timestamp, valid_for} = stamp;
        const now = moment();
        const expiration = moment(timestamp).add(
          moment.duration(valid_for[0], valid_for.split(' ')[1]),
        );
        return moment(expiration).isSameOrAfter(now);
      });

      const userStamps = notExpired.reduce((lpList, stamp) => {
        const {stampsneeded, business_name, category, reward, lp_id} = stamp;
        const lpIndex = lpList.findIndex((lp) => lp.lp_id == lp_id);
        if (lpIndex >= 0) {
          lpList[lpIndex].stamps++;
        } else {
          lpList = [
            ...lpList,
            {lp_id, stampsneeded, reward, business_name, category, stamps: 1},
          ];
        }

        return lpList;
      }, []);
      res.json(userStamps);
    } catch (error) {
      res.json({
        message: error,
      });
    }
  };

  return {
    getAllUsers,
    getUser,
    registerBusiness,
    addLoyaltyProgramme,
    getLoyaltyProgramme,
    getLoyaltyProgrammeUsers,
    getBusiness,
    registerUser,
    userLogin,
    addStamp,
    editLoyaltyProgramme,
    deleteLoyaltyProgramme,
    getCustomerStamps
  }
};
