import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'

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
    // addToMyTunes(state, track) {
    //   myTunes.push(track)
    // },
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
      // state.myTunes = song
      console.log(data)
      // console.log(state.myTunes)
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
      var playlistUrl = '//localhost:5000/api/playlists'
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
      var songUrl = '//localhost:5000/api/songs'
      $.get(songUrl)
        .then(data => {
          // res.send(data)
          commit('setMyTunes', data)
        })
        .catch(err => {
          res.status(400).send(err)
        })
    },
    addToMyTunes({ commit, dispatch }, payload) {
      // debugger
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

      $.post('//localhost:5000/api/songs', newTrack) //THIS MAY NEED TO BE CHANGED/MOVED
        .then(res => {
          dispatch('getMyTunes')

          // data.create(newTrack)
          // res.send(data)
          // console.log(newTrack)
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
          url: "//localhost:5000/api/songs/" + element._id,
          data: { order: j - 1 }
        })
      }
      // console.log("DeletedIndex: ", deletedIndex)
      // for (let i = deletedIndex; i < payload.myTunes.length; i++) {
      //   const element = payload.myTunes[i];
      //   element.order--
      // }
      $.ajax({
        method: "DELETE",
        url: '//localhost:5000/api/songs/' + payload.tune._id
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
      // payload.tune.order++

      // var track = payload.myTunes[i];
      for (var i = 0; i < payload.myTunes.length; i++) {
        
        if (payload.myTunes[i]._id == payload.tune._id) {
          if (payload.myTunes[i - 1] == null) {
            console.log('too high brah!')
            break
          }
          // payload.myTunes[i].order++
          // payload.myTunes[i + 1].order--
          $.ajax({
            method: "PUT",
            url: "//localhost:5000/api/songs/" + payload.myTunes[i]._id,
            data: { order: payload.myTunes[i].order - 1 }
          })
            .then($.ajax({
              method: "PUT",
              url: "//localhost:5000/api/songs/" + payload.myTunes[i - 1]._id,
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
          // payload.myTunes[i].order++
          // payload.myTunes[i + 1].order--
          $.ajax({
            method: "PUT",
            url: "//localhost:5000/api/songs/" + payload.myTunes[i]._id,
            data: { order: payload.myTunes[i].order + 1 }
          })
            .then($.ajax({
              method: "PUT",
              url: "//localhost:5000/api/songs/" + payload.myTunes[i + 1]._id,
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