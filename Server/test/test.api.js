const supertest = require('supertest');
const PgPromise = require("pg-promise")
const express = require('express');
const assert = require('assert');

require('dotenv').config()

const API = require('../api');
const { default: axios } = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const DATABASE_URL = 'https://gwi22-dramaticwire.herokuapp.com';
const pgp = PgPromise({});
const db = pgp(DATABASE_URL);

API(app, db);

describe('Loyalty App', function () {

    before(async function () {
        this.timeout(5000);
    });


    it('should have a test method', async  () => {

        const response = await supertest(app)
            .get('/api/users')
            .expect(200);
            
            console.log(response)
        const playlist = response.body.users
        assert.equal(1, playlist.length);

    });
})