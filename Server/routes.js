const Users = require('./Logic/Users');
const LoyaltyProgrammes = require('./Logic/LoyaltyProgrammes');
const Auth = require('./auth');

module.exports = function (app, db) {
  const users = Users(db);
  const LP = LoyaltyProgrammes(db);
  const auth = Auth(db);

  //Public Routes
  app.post('/api/login', auth.userLogin);
  app.post('/api/register/user', auth.registerUser);

  //User Routes
  app.get('/api/user', users.getUser);
  app.post('/api/register/business', users.registerBusiness);
  app.get('/api/business/:id', users.getBusiness);

  //Customer Routes
  app.get('/api/stamps', LP.updateStamps, LP.getCustomerStamps);
  app.post('/api/add/stamp', LP.addStamp);

  //Business Owner Routes
  app.post('/api/addLP', LP.addLoyaltyProgramme);
  app.post('/api/edit/LP', LP.editLoyaltyProgramme);
  app.delete('/api/delete/LP', LP.deleteLoyaltyProgramme);
  app.get('/api/LP', LP.getLoyaltyProgramme);
  app.get('/api/LP/:LP_id/users', LP.getLoyaltyProgrammeUsers);
  app.post('/api/LP/redeem/:customer_id/:LP_id', LP.redeemReward);
  app.delete('/api/delete/business', users.deleteBusiness);
  app.post('/api/edit/business', users.editBusiness)

  //Developer Routes
  app.get('/api/users', users.getAllUsers);
};
