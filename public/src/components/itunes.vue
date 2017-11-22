<template>
    <div class="music">
        <form @submit.prevent="getMusicByArtist">
            <input type="text" name="" id="" placeholder="Search by Artist" v-model="search">
            <button type="submit">Search</button>
        </form>
        <div class="songs" v-for="result in results">
           
            <h4>{{result.trackName}}</h4>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'Itunes',
        data() {
            return {
                search: ""
            }
        },

        methods: {
            getMusicByArtist() {
                this.$store.dispatch('getMusicByArtist', this.search)
            }
        },
        computed: {
            results() {
                return this.$store.state.results
            }
        }
    }
</script>

<style>
</style>