<template>
    <div class="music">
        <form @submit.prevent="getMusicByArtist">
            <input type="text" name="" id="" placeholder="Search by Artist" v-model="search">
            <button type="submit">Search</button>
        </form>
        <div class="songs" v-for="result in results">
            <div class="row">
                <div class="col-sm-12 m-tb-1 bc br border">
                    <p>{{result.trackName}}</p>
                    <p>Artist: {{result.artistName}}</p>
                    <p>{{result.collectionName}}</p>
                    <p>${{result.trackPrice}}</p>
                    <img :src=result.artworkUrl100 alt="">
                    <audio type="audio/mpeg" controls :src=result.previewUrl></audio>
                    <button @click="addToMyTunes(result, myTunes)">Add to Playlist</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Itunes',
        data() {
            return {
                search: "",
            }
        },
        methods: {
            getMusicByArtist() {
                this.$store.dispatch('getMusicByArtist', this.search)
            },
            addToMyTunes(result, myTunes) {
                this.$store.dispatch('addToMyTunes', { result, myTunes })
            },
        },
        computed: {
            results() {
                return this.$store.state.results
            },
            myTunes() {
                return this.$store.state.myTunes
            }
        }
    }

</script>

<style>
    .m-tb-1 {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .border {
        border: 5px solid black;
    }

    .bc {
        background: rgba(247, 245, 245, 0.5);
    }

    .br {
        border-radius: 10px;
    }
</style>