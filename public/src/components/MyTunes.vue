<template>
    <div class="music row">
        <div class="col-sm-10 playlist-area border bc br fixed overflow" id="list" v-for="playlist in playlists">
            <p class="p-ilb playlist-font">{{playlist.name}}</p>
            <div class="song-area overflow-h" v-for="(tune, i) in myTunes">
                <div class="move-left">
                    <p>{{i+1}}. {{tune.title}} ----- {{tune.artist}}</p>
                </div>
                <audio type="audio/mpeg" controls :src=tune.preview></audio>
                <i class="fa fa-arrow-up buttons" @click="promoteMyTune(tune, myTunes)"></i>
                <i class="fa fa-arrow-down buttons" @click="demoteMyTune(tune, myTunes)"></i>
                <i class="fa fa-times buttons remove pull-right" @click="removeFromMyTunes(tune, myTunes)"></i class="fa fa-times order">
            </div>
        </div>
        <!-- <div class="col-sm-1 hide-buttons floater">
            <i class="fa fa-arrow-right pull-right buttons border bc br-5 m-l" @click="showPlaylist()"></i>
            <i class="fa fa-arrow-left pull-right buttons border bc br-5 m-l" @click="hidePlaylist()" id="playlist-panel"></i>
        </div> -->
    </div>
</template>

<script>
    export default {
        name: 'MyTunes',
        data() {
            return {
            }
        },
        mounted() {
            this.$store.dispatch('getMyPlaylists'),
                this.$store.dispatch('getMyTunes')
        },
        methods: {
            removeFromMyTunes(tune, myTunes) {
                this.$store.dispatch('removeTrack', { tune, myTunes })
            },
            promoteMyTune(tune, myTunes) {
                this.$store.dispatch('promoteTrack', { tune, myTunes })
            },
            demoteMyTune(tune, myTunes) {
                this.$store.dispatch('demoteTrack', { tune, myTunes })
            },
            hidePlaylist() {
                var d = document.getElementById('list')
                if (!d.className.includes(' hidden')) {
                    d.className += (' hidden')
                }
            },
            showPlaylist() {
                var d = document.getElementById('list')
                if (d.className.includes(' hidden')) {
                    d.className = ('col-sm-12 playlist-area border bc br fixed overflow')
                }
            }
        },
        computed: {
            playlists() {
                return this.$store.state.myPlaylists
            },
            myTunes() {
                return this.$store.state.myTunes
            }
        }
    }

</script>

<style>
    .border {
        border: 5px solid black;
    }

    .bc {
        background: rgba(247, 245, 245, 0.5);
    }

    .br {
        border-radius: 10px;
    }

    .br-5 {
        border-radius: 5px;
        position: relative;
        right: 9.5rem;
    }

    .buttons {
        font-size: 3rem;
    }

    .remove {
        color: red;
    }

    .p-ilb {
        display: inline-block;
    }

    .fixed {
        position: fixed;
    }

    .overflow {
        overflow: auto;
    }

    .overflow-h {
        overflow: hidden;
        white-space: nowrap;
        backface-visibility: hidden;
    }

    .move-left {
        position: relative;
        right: .5px;
        transition: right 10s linear;
    }

    .move-left:hover {
        right: 700px;
    }

    .playlist-area {
        max-height: 100vh;
        max-width: 25vw;
    }

    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
    }

    .playlist-font {
        font-size: 3rem;
    }

    .m-l {
        margin-left: 10rem;
    }

    .floater {
        float: right;
    }
</style>