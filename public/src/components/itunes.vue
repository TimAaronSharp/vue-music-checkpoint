<template>
    <div class="music">
        <form @submit.prevent="getMusicByArtist">
            <input type="text" name="" id="" placeholder="Search by Artist" v-model="search">
            <button type="submit">Search</button>
        </form>
        <div class="songs" v-for="result in results">
            <div class="col-sm-4 max-h m-tb-1 bc br border m-lr-1 overflow-h">
                <div class="move-left">
                    <p>{{result.trackName}} ----- {{result.artistName}}</p>
                </div>
                <div class="move-left overflow-h">
                    <p>{{result.collectionName}}</p>
                </div>
                <p>${{result.trackPrice}}</p>
                <audio type="audio/mpeg" controls :src=result.previewUrl></audio>
                <i class="fa fa-plus buttons" @click="addToMyTunes(result, myTunes)"></i>
                <img class="itunes-img" :src=result.artworkUrl100 alt="">
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

    .m-lr-1 {
        margin-left: 1rem;
        margin-right: 1rem;
    }

    .max-h {
        max-height: 199px;
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

    .buttons {
        font-size: 3rem;
    }

    p {
        font-weight: bold;
        margin-left: 10px;
    }

    .ilb {
        display: inline-block;
    }

    .itunes-img {
        position: relative;
        bottom: 8rem;
        right: 5.5rem;
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
</style>