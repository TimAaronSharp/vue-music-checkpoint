var Songs = require('../models/song')
var router = require('express').Router()

router.get('/api/songs', (req, res, next) => {
    Songs.find({})
        .then(songs => {
            res.send(songs)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.get('/api/songs/:id', (req, res, next) => {
    Songs.findById(req.params.id)
        .then(song => {
            res.send(song)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.post('/api/songs', (req, res, next) => {
    Songs.create(req.body)
        .then(song => {
            var response = {
                data: song,
                message: 'Successfully created song!'
            }
            res.send(response)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.put('/api/songs/:id', (req,res,next) => {
    Songs.findByIdAndUpdate(req.params.id, req.body)
    .then(song => {
        // song.put()
        res.send({message: "You have updated ", song })
    })
    .catch(err => {
        res.status(400).send(err)
    })
})

router.delete('/api/songs/:id', (req, res, next) => {
    Songs.findByIdAndRemove(req.params.id)
        .then(song=>{
            console.log(song)
            res.send('You deleted song')
        })
        .catch(err => {
            res.status(400).send(err)
        })
})

module.exports = router