const isSignedIn = require('../middleware/is-signed-in')
const router = require('express').Router()

const Entry = require('../models/Entry')

router.get('/', async (req, res)=>{
    const puplicEntries = await Entry.find({isPublic: true})
    res.render('entry/all-entries.ejs', {entries: puplicEntries})
})

router.get('/my-entries', isSignedIn, async (req, res)=>{
    const puplicEntries = await Entry.find({owner: req.session.user._id})
    res.render('entry/all-entries.ejs', {entries: puplicEntries})
})

router.get('/new', isSignedIn, (req, res)=>{
    res.render('entry/create-entry.ejs')
})

router.post('/new', isSignedIn, async (req, res)=>{
    req.body.isPublic = Boolean (req.body.isPublic)

    const createdEntry = await Entry.create({
        title: req.body.title,
        entryBody: req.body.entryBody,
        isPublic: req.body.isPublic,
        owner: req.session.user._id
    })

    res.redirect('/')
})

router.get('/:entryId', async (req, res)=>{
    const foundEntry = await Entry.findById(req.params.entryId).populate('owner')
    res.render('entry/entry-details.ejs', {entry: foundEntry})
})

module.exports = router