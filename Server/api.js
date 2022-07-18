module.exports = function (app, db) {

    app.post('/api/register/business', async function(req, res, next){
        try {
            
            const { businessName, owner_id, category, password, logo } = req.body
    
            await db.none(`INSERT into businesses (business_name, owner_id, category, password, logo) VALUES ($1, $2, $3, $4, $5)`, [businessName, owner_id, category, password, logo])
            res.json({
                message: 'success'
            })
        } catch (err) {
            console.log(err);
            next()
        }
    })

    app.post('/api/addLP', async function(req, res, next){
        try {
        const {business_id, stamps, reward, validFor } = req.body

        await db.none(`INSERT into loyalty_programmes (business_id, stamps, reward, valid_for) VALUES ($1, $2, $3, $4)`, [business_id, stamps, reward, validFor])
        res.json({
            message: 'added'
        })
    } catch (err) {
        console.log(err);
        next()
    }
    })

    app.get('/api/users', async function(req, res){

       const users = await db.many(`select * from users`)
       res.json({
        users
       })
    })

}