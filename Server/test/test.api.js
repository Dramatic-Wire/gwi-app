const supertest = require('supertest');
const PgPromise = require("pg-promise")
const express = require('express');
const assert = require('assert');

require('dotenv').config()

const {default: axios} = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const DATABASE_URL = 'https://gwi22-dramaticwire.herokuapp.com';
const pgp = PgPromise({});
const db = pgp(DATABASE_URL);

const routes = require('../routes');

routes(app, db);

describe('Loyalty App', function () {

    before(async function () {
        this.timeout(5000);
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
    it('should return the number of users participating in the loyalty programme', async () => {
      const result = await supertest(app).get('/api/LP/4/users').expect(200);
      assert.equal(4, result.body.count);
    });
  });

  describe('Adding stamps and getting user stamps', () => {
    it('return the stamps from all the loyalty programmes a user participates in', async () => {
      const user9Stamps = [
        {
          lp_id: 1,
          stampsneeded: '4',
          reward: 'nam dui proin leo',
          business_name: 'Skyba',
          category: 'Resturant',
          stamps: 1,
        },
        {
          lp_id: 2,
          stampsneeded: '1',
          reward: 'nisi volutpat',
          business_name: 'Quimba',
          category: 'Groceries',
          stamps: 4,
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
          stamps: 1,
          stampsneeded: '14',
        },
        {
          business_name: 'Skyba',
          category: 'Resturant',
          lp_id: 1,
          reward: 'nam dui proin leo',
          stamps: 1,
          stampsneeded: '4',
        },
        {
          business_name: 'Quimba',
          category: 'Groceries',
          lp_id: 2,
          reward: 'nisi volutpat',
          stamps: 4,
          stampsneeded: '1',
        },
      ];
      const result = await supertest(app)
        .get('/api/stamps/?customer_id=9')
        .expect(200);
      assert.deepEqual(user9Stamps, result.body);
    });
  });
  after(() => {
    db.$pool.end();
  });
});
