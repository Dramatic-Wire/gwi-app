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
    // await db.none(`delete from users`);
    //const commandText = fs.readFileSync('./sql/data.sql', 'utf-8');
    //await db.none(commandText);
  });

  it('should have a register user route', async () => {

   await supertest(app)
			.post('/api/register/user')
     .send({
       username: 'sallysalamandar',
       first_name: 'Sally',
       surname: 'Salamandar',
       email: 'salamandar@aol.com',
       password: '1234',
       profile_picture: '/'
     }).expect(201);
    
  });

  it('should have a route that returns all users', async () => {
    // await supertest(app)
		// .post('/api/register/user')
    //  .send({
    //    username: 'sallysalamandar',
    //    first_name: 'Sally',
    //    surname: 'Salamandar',
    //    email: 'salamandar@aol.com',
    //    password: '1234',
    //    profile_picture: '/'
    //  }).expect(201);
    // const response = await supertest(app).get('/api/users')
    // console.log(response)
    const users = await db.many(`select * from users`)
    console.log(users)
  })


  // it('should have a route that gets user details from their ID', async () => {

  //  await supertest(app)
	// 		.post('/api/register/user')
  //    .send({
  //      username: 'sallysalamandar',
  //      first_name: 'Sally',
  //      surname: 'Salamandar',
  //      email: 'salamandar@aol.com',
  //      password: '1234',
  //      profile_picture: '/'
  //    }).expect(201);
    
  // });

  after(() => {
    db.$pool.end();
  });
});