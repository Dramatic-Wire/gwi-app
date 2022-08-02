const moment = require('moment');

module.exports = function (db) {
  const updateStamps = async (req, res, next) => {
    const {customer_id} = req.query;
    if (!customer_id) {
      res.sendStatus(400);
    }
    const query = `update stamps set expired = timestamp < CURRENT_TIMESTAMP - INTERVAL $1 
       from loyalty_programmes where stamps.LP_id = loyalty_programmes.id
       and valid_for = $1 and customer_id = $2`;

    await db.none(query, ['1 month', customer_id]).catch((err) => {
      console.log(err);
      res.send(err);
    });
    await db.none(query, ['3 months', customer_id]).catch((err) => {
      console.log(err);
      res.send(err);
    });
    await db.none(query, ['6 months', customer_id]).catch((err) => {
      console.log(err);
      res.send(err);
    });
    await db.none(query, ['1 year', customer_id]).catch((err) => {
      console.log(err);
      res.send(err);
    });
    next();
  };

  //app.post('/api/addLP')

  const addLoyaltyProgramme = async (req, res) => {
    // businessID, stampCount, reward, validFor
    try {
      const {business_id, stamps, reward, validFor} = req.body;
      await db.none(
        `INSERT into loyalty_programmes 
        (business_id, stamps, reward, valid_for) VALUES ($1, $2, $3, $4)`,
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
        `SELECT COUNT(distinct customer_id) FROM stamps 
         where lp_id = $1 GROUP BY lp_id`,
        [LP_id],
      );
      res.json(users);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  };

  //app.post('/api/add/stamp')
  const addStamp = async (req, res) => {
    const {UserId, LPid} = req.body;
    if (!UserId || !LPid) res.sendStatus(400);
    try {
      await db.none(
        `insert into stamps (customer_id, lp_id, timestamp, redeemed) 
         values ($1, $2, $3, $4)`,
        [UserId, LPid, moment().toISOString(), false],
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
        `update loyalty_programmes set stamps = $1, reward = $2, valid_for = $3 
         where business_id = $4 returning *`,
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
      db.none(`delete from loyalty_programmes where business_id = $1`, [
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
      const query = `
      SELECT lp_id, stampCount as stamps, reward, stamps as stampsNeeded, business_name, valid_for, category FROM (
      SELECT loyalty_programmes.id as lp_id, COUNT(*) as stampCount FROM stamps 
      INNER JOIN loyalty_programmes ON stamps.lp_id=loyalty_programmes.id
      WHERE stamps.customer_id = $1 AND stamps.redeemed = 'false' AND stamps.expired = 'false'
      GROUP BY loyalty_programmes.id ) count
      JOIN loyalty_programmes ON lp_id =loyalty_programmes.id
      JOIN businesses ON loyalty_programmes.business_id = businesses.id
      ORDER BY business_name`;

      await db
        .many(query, [customer_id])
        .then((result) => res.json(result))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  //app.post('/api/LP/redeem/:customer_id/:LP_id');
  const redeemReward = async (req, res) => {
    const {customer_id, LP_id} = req.params;
    if (!customer_id || !LP_id) {
      res.sendStatus(400);
    }
    try {
      const {stamps_needed} = await db.one(
        `select stamps as stamps_needed from loyalty_programmes where id = $1`,
        [LP_id],
      );
      const {active_stamps} = await db.one(
        `select COUNT(id) as active_stamps FROM stamps WHERE lp_id = $1 AND customer_id = $2 AND redeemed = 'false' AND expired = 'false'`,
        [LP_id, customer_id],
      );
      if (active_stamps < stamps_needed) {
        res.sendStatus(400);
      } else {
        try {
          await db.any(
            `UPDATE stamps
            SET redeemed = 'true' WHERE id IN
            (SELECT id FROM stamps
              WHERE lp_id = $1 AND customer_id = $2 AND redeemed = 'false' AND expired = 'false'
              ORDER BY timestamp ASC LIMIT $3)`,
            [LP_id, customer_id, stamps_needed],
          );
          res.sendStatus(200);
        } catch (err) {
          res.send(err);
        }
      }
    } catch (err) {
      res.send(err);
    }
  };

  return {
    addLoyaltyProgramme,
    getLoyaltyProgramme,
    getLoyaltyProgrammeUsers,
    addStamp,
    editLoyaltyProgramme,
    deleteLoyaltyProgramme,
    getCustomerStamps,
    updateStamps,
    redeemReward,
  };
};
