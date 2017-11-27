<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row">
        <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
        <my-tunes class="my-tunes col-sm-4"></my-tunes>
        <itunes class="itunes col-sm-8"></itunes>
      </div>
    </div>
  </div>
</template>

<script>

  import MyTunes from './MyTunes'
  import Itunes from './itunes'

  export default {
    name: 'home',
    data() {
      return {

      }
    },
    components: {
      MyTunes,
      Itunes
    }
  }
</script>


<style>
  .container-fluid{
    background-image: url('../assets/music-page-background.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    min-height: 100vh;
  }
  .my-tunes {
    display: inline-block;
    /* background: green; */
  }

  .itunes {
    display: inline-block;
    /* background: red; */
  }
  i{
    cursor: pointer;
  }
</style>