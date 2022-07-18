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

    app.get('/api/LP', async function (req, res) {
        try {
            await db.many(`select (stamps, reward, valid_for) from `)
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

}