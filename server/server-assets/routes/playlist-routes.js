var Playlists = require('../models/playlist')
var router = require('express').Router()

router.get('/api/playlists', (req, res, next) => {
    Playlists.find({})
        .then(playlists => {
            res.send(playlists)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.get('api/playlists/:id', (req, res, next) => {
    Playlists.findById(req.params.id)
        .then(playlist => {
            res.send(playlist)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.post('/api/playlists', (req, res, next) => {
    Playlists.create(req.body)
        .then(playlist => {
            var response = {
                data: playlist,
                message: 'Successfully created playlist!'
            }
            res.send(response)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.put('/api/playlists/:id', (req,res,next) => {
    Playlists.findById(req.params.id, req.body)
    .then(data => {
        playlist.put()
        res.send(data)
    })
    .catch(err => {
        res.status(400).send(err)
    })
})

router.delete('/api/playlists/:id', (req, res, next) => {
    Playlists.findOneAndRemove(req.params.id)
        .then(playlist=>{
            console.log(playlist)
            res.send('You deleted playlist')
        })
        .catch(err => {
            res.status(400).send(err)
        })
})


module.exports = router