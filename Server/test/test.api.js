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
  })
    it('should respond with a  status if a user is successfully registered', async () => {
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
  })

  });
  it('should have a route that returns all users', async () => {
    const result = await supertest(app).get('/api/users').expect(200);
    const {users} = result.body;
    assert.equal(21, users.length);
  });
  it('should have a route that returns a specific user', async () => {
    const user1 = {
      id: 1,
      username: 'efurbank0',
      first_name: 'Eustace',
      surname: 'Furbank',
      email: 'efurbank0@tamu.edu',
      password: null,
      profile_picture: null,
    };
    const result = await supertest(app)
      .get('/api/user/?username=efurbank0')
      .expect(200);
    const user = result.body;
    assert.deepEqual(user1, user);
  });
  it('should have a route that registers a business', async () => {
    const result = await supertest(app)
      .post('/api/register/business')
      .send({
        businessName: 'Realcube',
        owner_id: 2,
        category: 'Groceries',
      })
      .expect(201);
  });
  it('should have a route that returns the stamps for a specific user', async () => {
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


  after(() => {
    db.$pool.end();
  });
});
