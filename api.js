const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const axios = require('axios');
const { json } = require('express');

module.exports = function (app, db) {

    app.post('/api/register/business', async function (req, res, next) {
        try {

            const { businessName, owner_id, category, logo } = req.body

            await db.none(`INSERT into businesses (business_name, owner_id, category, logo) VALUES ($1, $2, $3, $4)`, [businessName, owner_id, category, logo])

            const { id } = await db.one(`select id from businesses where business_name = $1`, [businessName])


            res.json({
                message: 'success',
                id: id

            })
        } catch (err) {
            console.log(err);
            next()
        }
    })

    app.post('/api/addLP', async function (req, res, next) {
        try {
            const { business_id, stamps, reward, validFor } = req.body

            await db.none(`INSERT into loyalty_programmes (business_id, stamps, reward, valid_for) VALUES ($1, $2, $3, $4)`, [business_id, stamps, reward, validFor])
            res.json({
                message: 'added'
            })
        } catch (err) {
            console.log(err);
            next()
        }
    })

    app.get('/api/LP', async function (req, res, next) {
        try {
            const { id } = req.query
            const lpData = await db.many(`select (stamps, reward, valid_for) from loyalty_programmes where business_id = $1`, [id])

            res.json({
                data: lpData
            })

        } catch (err) {
            console.log(err);
            next()
        }
    })

    app.get('/api/business', async function (req, res, next) {
        try {
            const { id } = req.query
            const businessData = await db.many(`select (business_name, owner_id, category, logo) from businesses where id = $1`, [id]);

            res.json({
                data: businessData
            })

        } catch (err) {
            console.log(err);
            next()
        }
    })

    app.get('/api/users', async function (req, res) {

        const users = await db.many(`select * from users`)
        res.json({
            users
        })
    })

    //register a user
    app.post('/api/register/user', async function (req, res) {
        let message

        const { username, first_name, surname, email, password, profile_picture } = req.body

        // const checkDup = await db.oneOrNone('select username from users where username = $1', [username])
        bcrypt.hash(password, saltRounds).then(async function (hash) {
            await db.none('insert into users (username, first_name, surname, email, password, profile_picture) values ($1, $2, $3, $4, $5, $6)', [username, first_name, surname, email, hash, profile_picture, 0])
        });

        message = 'successfully registered'

            res.json({
                result: message
            });


        // if (checkDup == null) {
        //     bcrypt.hash(password, saltRounds).then(async function (hash) {
        //         await db.none('insert into users (username, first_name, surname, email, password, profile_picture) values ($1, $2, $3, $4, $5, $6)', [username, first_name, surname, email, hash, profile_picture, 0])
        //     });
        //     message = 'successfully registered'

        //     res.json({
        //         result: message
        //     });
        // }
        // else {
        //     message = 'user already exisis'
        //     res.json({
        //         result: message
        //     });
        // }


    })

    //login a user
    app.post('/api/login', async function (req, res) {

        try {
            let message
            const { username, password } = req.body
            const user = await db.oneOrNone('select * from users where username = $1', [username])
            const decrypt = await bcrypt.compare(password, user.password)            

            if (!decrypt) {
                message = "Wrong password"
            }
            else{
                message = 'logged in'
            }

            res.json({
                result: message

            });

        } catch (error) {
            res.json({
                message: error.message
            })

        }

    })


    //get stamps
    app.get('/api/stamps', async function(req, res){

    })

}