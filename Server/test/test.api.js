const supertest = require('supertest');
const PgPromise = require('pg-promise');
const express = require('express');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const {default: axios} = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const DATABASE_URL = process.env.DATABASE_URL;
const pgp = PgPromise({});
const db = pgp(DATABASE_URL);

const routes = require('../routes');

routes(app, db);

describe('The Stampede API', function () {
  before(async function () {
    this.timeout(5000);
    await db.none(`TRUNCATE users RESTART IDENTITY CASCADE`);
    const commandText = fs.readFileSync('./sql/test_data.sql', 'utf-8');
    await db.none(commandText);
  });

  describe('Registering a user', () => {
    it('should respond with a 201 Created status if a user is successfully registered', async () => {
      await supertest(app)
        .post('/api/register/user')
        .send({
          username: 'sallysalamandar',
          first_name: 'Sally',
          surname: 'Salamandar',
          email: 'salamandar@aol.com',
          password: '1234',
          profile_picture: '/',
        })
        .expect(201);
      const result = await supertest(app).get('/api/users').expect(200);
      const {users} = result.body;
      assert.equal(21, users.length);
    });
    it('should not register a user if the username already exists', async () => {
      await supertest(app)
        .post('/api/register/user')
        .send({
          username: 'sallysalamandar',
          first_name: 'Sal',
          surname: 'Sala',
          email: 'salamandar@gmail.com',
          password: '1234',
          profile_picture: '/',
        })
        .expect(400);
      const result = await supertest(app).get('/api/users').expect(200);
      const {users} = result.body;
      assert.equal(21, users.length);
    });
    it('should not register a user if the email address already exists', async () => {
      await supertest(app)
        .post('/api/register/user')
        .send({
          username: 'sallysal',
          first_name: 'Sally',
          surname: 'Salamandar',
          email: 'salamandar@aol.com',
          password: '1234',
          profile_picture: '/',
        })
        .expect(400);
      const result = await supertest(app).get('/api/users').expect(200);
      const {users} = result.body;
      assert.equal(21, users.length);
    });
    it('should not register a user if required information is missing', async () => {
      await supertest(app)
        .post('/api/register/user')
        .send({
          first_name: 'Sally',
          surname: 'Salamandar',
          email: 'salamandar@aol.com',
          password: '1234',
          profile_picture: '/',
        })
        .expect(400);
      const result = await supertest(app).get('/api/users').expect(200);
      const {users} = result.body;
      assert.equal(21, users.length);
    });
    it('the new user should now appear in the list of all users', async () => {
      const result = await supertest(app).get('/api/users').expect(200);
      const {users} = result.body;
      assert.equal(
        true,
        users.some((user) => user.username == 'sallysalamandar'),
      );
    });

    it('login', async () => {
      const result = await supertest(app)
        .post('/api/login')
        .send({email: 'salamandar@aol.com', password: '1234'});
    });
  });

  describe('Registering a business and creating a loyalty programme', () => {
    it('should return the business id if a user successfully registers a business', async () => {
      const result = await supertest(app)
        .post('/api/register/business')
        .send({
          businessName: 'Realcube',
          owner_id: 2,
          category: 'Groceries',
        })
        .expect(201);
      assert.equal(11, result.body.id);
    });
    it('should not allow a user to register a business if the business name already exists', async () => {
      const result = await supertest(app)
        .post('/api/register/business')
        .send({
          businessName: 'Realcube',
          owner_id: 2,
          category: 'Groceries',
        })
        .expect(400);
    });
    it('should not allow a user to register a business if required info is missing', async () => {
      const result = await supertest(app)
        .post('/api/register/business')
        .send({
          businessName: 'Realy',
          category: 'Groceries',
        })
        .expect(400);
    });

    it('get business from user id', async () => {
      const result = await supertest(app).get('/api/business/1').expect(200);

      console.log(result.body);
    });

    it('should allow a user to create a loyalty programme for the business', async () => {
      await supertest(app)
        .post('/api/addLP')
        .send({
          business_id: 11,
          stamps: 10,
          reward: 'viverra diam vitae quam',
          validFor: '1 year',
        })
        .expect(201);
    });
    it('should not allow a user to create a loyalty programme for the business if required info is missing', async () => {
      await supertest(app)
        .post('/api/addLP')
        .send({
          business_id: 11,
          stamps: 10,
          validFor: '1 year',
        })
        .expect(400);
    });
    it('should allow a user to edit a loyalty programme and return the updated details', async () => {
      const result = await supertest(app)
        .post('/api/edit/LP')
        .send({
          business_id: 11,
          stamps: 15,
          reward: 'molestie lorem',
          valid_for: '6 months',
        })
        .expect(200);
      const editedLP = {
        id: 11,
        business_id: 11,
        stamps: '15',
        reward: 'molestie lorem',
        valid_for: '6 months',
      };
      assert.deepEqual(editedLP, result.body);
    });
    it('should allow a user to delete a loyalty programme', async () => {
      await supertest(app)
        .delete('/api/delete/LP/?businessID=3')
        .expect(200, 'deleted');
    });
    it('should return the number of users participating in the loyalty programme', async () => {
      const result = await supertest(app).get('/api/LP/4/users').expect(200);
      assert.equal(4, result.body.count);
    });
  });

  describe('Adding stamps and getting user stamps', () => {
    it('return the stamps from all the loyalty programmes a user participates in', async () => {
      const user9Stamps = [
        {
          business_name: 'Quimba',
          category: 'Groceries',
          lp_id: '2',
          reward: 'nisi volutpat',
          stamps: '4',
          stampsneeded: '1',
          valid_for: '1 year',
        },
        {
          business_name: 'Skyba',
          category: 'Resturant',
          lp_id: '1',
          reward: 'nam dui proin leo',
          stamps: '1',
          stampsneeded: '4',
          valid_for: '1 year',
        },
      ];
      const result = await supertest(app)
        .get('/api/stamps/?customer_id=9')
        .expect(200);
      assert.deepEqual(user9Stamps, result.body);
    });
    it(`should add a stamp to a user's loyalty programme card`, async () => {
      await supertest(app)
        .post('/api/add/stamp')
        .send({UserId: 9, LPid: 4})
        .expect(201);
      const user9Stamps = [
        {
          business_name: 'Pixope',
          category: 'Beauty',
          lp_id: 4,
          reward: 'nulla neque libero',
          stamps: '1',
          stampsneeded: '14',
          valid_for: '3 months',
        },
        {
          business_name: 'Quimba',
          category: 'Groceries',
          lp_id: 2,
          reward: 'nisi volutpat',
          stamps: '4',
          stampsneeded: '1',
          valid_for: '1 year',
        },
        {
          business_name: 'Skyba',
          category: 'Resturant',
          lp_id: 1,
          reward: 'nam dui proin leo',
          stamps: '1',
          stampsneeded: '4',
          valid_for: '1 year',
        },
      ];
      const result = await supertest(app)
        .get('/api/stamps/?customer_id=9')
        .expect(200);
      assert.deepEqual(user9Stamps, result.body);
    });
    it(`should mark a stamp as redeemed if a user has used it to get a reward`, async () => {
      await supertest(app).post('/api/LP/redeem/5/1').expect(200);
      const result = await supertest(app)
        .get('/api/stamps/?customer_id=5')
        .expect(200);
      user5Stamps = [
        {
          lp_id: 2,
          stamps: '1',
          reward: 'nisi volutpat',
          stampsneeded: '1',
          business_name: 'Quimba',
          category: 'Groceries',
        },
        {
          lp_id: 1,
          stamps: '1',
          reward: 'nam dui proin leo',
          stampsneeded: '4',
          business_name: 'Skyba',
          category: 'Resturant',
        },
        {
          lp_id: 3,
          stamps: '2',
          reward: 'blandit nam nulla',
          stampsneeded: '7',
          business_name: 'Youopia',
          category: 'Groceries',
        },
      ];
      assert.deepEqual(user5Stamps, result.body);
    });
  });

  ///should redeem oldest stamps first
  after(() => {
    db.$pool.end();
  });
});
