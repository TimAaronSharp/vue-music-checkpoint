<template>
    <div class="music">
        <div class="playlist-area" v-for="playlist in playlists">
            <p>{{playlist.name}}</p>
            <div class="song-area" v-for="tune in myTunes">
                <p>{{tune.title}}</p>
                <button @click="removeFromMyTunes(tune, myTunes)">Remove Track</button>
                <button @click="promoteMyTune(tune, myTunes)">Up</button>
                <button @click="demoteMyTune(tune, myTunes)">Down</button>
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
</style>