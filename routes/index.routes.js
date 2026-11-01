const router = require("express").Router()


router.get('/',(req,res)=>{
    res.render('homepage.ejs')
})

router.get('/admin', async (req, res)=>{
    
})

module.exports = router;