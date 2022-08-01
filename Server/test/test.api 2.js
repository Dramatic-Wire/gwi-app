const supertest = require('supertest');
const PgPromise = require('pg-promise');
const express = require('express');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const API = require('../api');
const {default: axios} = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const DATABASE_URL = process.env.DATABASE_URL;
const pgp = PgPromise({});
const db = pgp(DATABASE_URL);

API(app, db);

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
    // it('should return the number of users participating in the loyalty programme', async () => {
    //   assert.equal(editedLP, result.body);
    // });
  });

  describe('Adding stamps and getting user stamps', () => {
    it('return the stamps from all the loyalty programmes a user participates in', async () => {
      const user9Stamps = [
        {
          lp_id: 2,
          stampsneeded: '1',
          reward: 'nisi volutpat',
          business_name: 'Quimba',
          category: 'Groceries',
          stamps: 4,
        },
        {
          lp_id: 1,
          stampsneeded: '4',
          reward: 'nam dui proin leo',
          business_name: 'Skyba',
          category: 'Resturant',
          stamps: 1,
        },
      ];
      const result = await supertest(app)
        .get('/api/stamps/?customer_id=9')
        .expect(200);
      assert.deepEqual(user9Stamps, result.body);
    });
  });
  // it('should have a route that returns all users', async () => {
  //   const result = await supertest(app).get('/api/users').expect(200);
  //   const {users} = result.body;
  //   assert.equal(21, users.length);
  // });
  // it('should have a route that returns a specific user', async () => {
  //   const user1 = {
  //     id: 1,
  //     username: 'efurbank0',
  //     first_name: 'Eustace',
  //     surname: 'Furbank',
  //     email: 'efurbank0@tamu.edu',
  //     password: null,
  //     profile_picture: null,
  //   };
  //   const result = await supertest(app)
  //     .get('/api/user/?username=efurbank0')
  //     .expect(200);
  //   const user = result.body;
  //   assert.deepEqual(user1, user);
  // });
  // it('should have a route that registers a business', async () => {
  //   const result = await supertest(app)
  //     .post('/api/register/business')
  //     .send({
  //       businessName: 'Realcube',
  //       owner_id: 2,
  //       category: 'Groceries',
  //     })
  //     .expect(201);
  // });
  // it('should have a route that returns the stamps for a specific user', async () => {
  //   const user9Stamps = [
  //     {
  //       lp_id: 2,
  //       stampsneeded: '1',
  //       reward: 'nisi volutpat',
  //       business_name: 'Quimba',
  //       category: 'Groceries',
  //       stamps: 4,
  //     },
  //     {
  //       lp_id: 1,
  //       stampsneeded: '4',
  //       reward: 'nam dui proin leo',
  //       business_name: 'Skyba',
  //       category: 'Resturant',
  //       stamps: 1,
  //     },
  //   ];
  //   const result = await supertest(app)
  //     .get('/api/stamps/?customer_id=9')
  //     .expect(200);
  //   assert.deepEqual(user9Stamps, result.body);
  // });

  after(() => {
    db.$pool.end();
  });
});