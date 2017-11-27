//DON'T DO AUTH ON THIS PROJECT EVEN THOUGH THE BONUS CHALLENGES SAY TO.
var express = require('express')
var bp = require('body-parser')
var dbConnect = require('./config/mlab/mlab-config')
var cors = require('cors')
var server = express()
var port = 5000

var songRoutes = require('./server-assets/routes/song-routes')
var playlistRoutes = require('./server-assets/routes/playlist-routes')

//MIDDLEWARE

server.use(cors({})) //ALLOWS THINGS TO TALK TO EACH OTHER ACROSS ORIGINS (SERVERS)
server.use(bp.json())
server.use(bp.urlencoded({ extended: true }))

server.use(songRoutes)
server.use(playlistRoutes)
//ROUTE VARIABLES

//REGISTER ROUTES


server.listen(port, () => { console.log('Serving on port: ', port) })