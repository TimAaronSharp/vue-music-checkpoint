import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'

var production = !window.location.host.includes('localhost')
var baseUrl = production ? '//tas-vue-music.herokuapp.com' : '//localhost:5000'

vue.use(vuex)

var store = new vuex.Store({
  state: {
    activePlaylist: {},
    myPlaylists: [],
    myTunes: [],
    results: []
  },
  mutations: {
    setResults(state, results) {
      state.results = results
    },
    setMyPlaylists(state, playlist) {
      state.myPlaylists = playlist
      console.log(state.myPlaylists)
    },
    setMyTunes(state, data) {
      data.sort(function (a, b) {
        if (a.order < b.order) {
          return -1
        } else if (a.order > b.order) {
          return 1
        } else {
          return 0
        }
      })
      console.log(data)
      state.myTunes = data
    }
  },
  actions: {
    getMusicByArtist({ commit, dispatch }, artist) {
      var url = '//bcw-getter.herokuapp.com/?url=';
      var url2 = 'https://itunes.apple.com/search?term=' + artist;
      var apiUrl = url + encodeURIComponent(url2);
      $.get(url2).then(data => {
        data = JSON.parse(data)
        commit('setResults', data.results)
      })
    },
    getMyPlaylists({ commit, dispatch }) {
      var playlistUrl = `${baseUrl}/api/playlists`
      $.get(playlistUrl)
        .then(data => {
          // res.send(data)
          commit('setMyPlaylists', data)
        })
        .catch(err => {
          res.status(400).send(err)
        })
    },
    getMyTunes({ commit, dispatch }) {
      //this should send a get request to your server to return the list of saved tunes
      var songUrl = `${baseUrl}/api/songs`
      $.get(songUrl)
        .then(data => {
          commit('setMyTunes', data)
        })
        .catch(err => {
          res.status(400).send(err)
        })
    },
    addToMyTunes({ commit, dispatch }, payload) {

      function Song(config) {

        this.title = config.result.trackName,
          this.albumArt = config.result.artworkUrl100,
          this.artist = config.result.artistName,
          this.coll = config.result.collectionName,
          this.price = config.result.trackPrice,
          this.preview = config.result.previewUrl,
          this.playlistId = "5a17760d51c68d1d00dcc3b3",
          this.order = config.myTunes.length
      }

      var newTrack = new Song(payload)

      $.post(`${baseUrl}/api/songs`, newTrack)
        .then(res => {
          dispatch('getMyTunes')
        })
        .catch(err => {
          res.status(400).send(err)
        })
      //this will post to your server adding a new track to your tunes
    },
    removeTrack({ commit, dispatch }, payload) {
      //Removes track from the database with delete
      var deletedIndex = 0
      for (var i = 0; i < payload.myTunes.length; i++) {
        var myTune = payload.myTunes[i];
        if (myTune._id == payload.tune._id) {
          deletedIndex = i + 1
          break
        }
      }
      for (var j = deletedIndex; j < payload.myTunes.length; j++) {
        var element = payload.myTunes[j];
        $.ajax({
          method: "PUT",
          url: `${baseUrl}/api/songs/${element._id}`,
          data: { order: j - 1 }
        })
      }
      $.ajax({
        method: "DELETE",
        url: `${baseUrl}/api/songs/${payload.tune._id}`
      })
        .then(res => {
          dispatch('getMyTunes')
        })
        .catch(err => {
          res.status(400).send(err)
        })
    },
    promoteTrack({ commit, dispatch }, payload) {
      //this should increase the position / upvotes and downvotes on the track

      for (var i = 0; i < payload.myTunes.length; i++) {

        if (payload.myTunes[i]._id == payload.tune._id) {
          if (payload.myTunes[i - 1] == null) {
            console.log('too high brah!')
            break
          }
          $.ajax({
            method: "PUT",
            url: `${baseUrl}/api/songs/${payload.myTunes[i]._id}`,
            data: { order: payload.myTunes[i].order - 1 }
          })
            .then($.ajax({
              method: "PUT",
              url: `${baseUrl}/api/songs/${payload.myTunes[i - 1]._id}`,
              data: { order: payload.myTunes[i - 1].order + 1 }
            }))
            .then(res => { dispatch('getMyTunes') })
            .catch(err => {
              res.status(400).send(err)
            })
          break
        }
      }
    },
    demoteTrack({ commit, dispatch }, payload) {
      //this should decrease the position / upvotes and downvotes on the track
      for (var i = 0; i < payload.myTunes.length; i++) {

        if (payload.myTunes[i]._id == payload.tune._id) {
          if (payload.myTunes[i + 1] == null) {
            console.log('too low brah!')
            break
          }
          $.ajax({
            method: "PUT",
            url: `${baseUrl}/api/songs/${payload.myTunes[i]._id}`,
            data: { order: payload.myTunes[i].order + 1 }
          })
            .then($.ajax({
              method: "PUT",
              url: `${baseUrl}/api/songs/${payload.myTunes[i + 1]._id}`,
              data: { order: payload.myTunes[i + 1].order - 1 }
            }))
            .then(res => { dispatch('getMyTunes') })
            .catch(err => {
              res.status(400).send(err)
            })
          break
        }
      }
    }
  }
})

export default store


//LOOK AT .FIND({}) STUFF AND MAYBE NESTED .THENS FOR PROMOTING/DEMOTING