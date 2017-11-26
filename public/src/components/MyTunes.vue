<template>
    <div class="music">
        <div class="playlist-area border bc br" v-for="playlist in playlists">
            <p class="p-ilb">{{playlist.name}}</p>
            <i class="fa fa-arrow-left pull-right buttons"></i>
            <div class="song-area playlist" v-for="tune in myTunes">
                <p>{{tune.title}}</p>
                <audio type="audio/mpeg" controls :src=tune.preview></audio>
                <button id="toggle-button">Toggle</button>
                <i class="fa fa-arrow-up buttons" @click="promoteMyTune(tune, myTunes)"></i>
                <i class="fa fa-arrow-down buttons" @click="demoteMyTune(tune, myTunes)"></i>
                <i class="fa fa-times buttons remove pull-right" @click="removeFromMyTunes(tune, myTunes)"></i class="fa fa-times order">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MyTunes',
        data() {
            return {
            }
            $(document).ready(function () {
                $("button").click(function () {
                    ("p").toggle()
                })
            })
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

    .buttons {
        font-size: 3rem;
    }

    .remove {
        color: red;
    }

    .p-ilb {
        display: inline-block;
    }
</style>