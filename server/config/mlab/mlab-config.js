var mongoose = require('mongoose')
var connectionString = 'mongodb://test:test@ds036079.mlab.com:36079/my-music-playlist'
var connection = mongoose.connection

mongoose.connect(connectionString, {
    useMongoClient: true,
    keepAlive: { socketOptions: {
        keepAlive: 300000, connectionTimeoutMS: 30000
    }}
})
connection.on('error', console.error.bind(console, 'Connection Error: '))
connection.once('open', () => {
    console.log('Connected to DB')
})