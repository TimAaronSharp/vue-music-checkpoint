var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var schema = new mongoose.Schema({
    title: { type: String, required: true },
    albumArt: { type: String, required: true },
    artist: { type: String, required: true },
    coll: { type: String, required: true },
    price: { type: Number, required: true },
    preview: { type: String, required: true },
    playlistId: { type: ObjectId, ref: 'Playlist', required: true },
    order: { type: Number, required: true }
})

module.exports = mongoose.model('Song', schema)