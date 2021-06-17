<template>
  <div id="app">

<leaderboard/>
   
  </div>
</template>

<script>
import Leaderboard from "@/pages/Leaderboard.vue";

export default {
  name: "App",
  components: {
    Leaderboard
    
     },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

