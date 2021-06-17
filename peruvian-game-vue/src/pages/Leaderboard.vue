<template>
  <div id="app">

<leaderboard-component :leaderboardInfo="boardList"/>
   
  </div>
</template>

<script>
import LeaderboardComponent from '@/components/LeaderboardComponent.vue'
import { getLeaderboard } from "@/API.js";

export default {
  name: "App",
  components: {
    LeaderboardComponent
  },
  data: () => ({
    boardList: []
  }),
  methods: {
    async fetchLeaderboard() {
      let response = await getLeaderboard();
      this.boardList = response.leaderboard;
      console.log(await getLeaderboard());

    }
  },
  mounted() {
    this.fetchLeaderboard();
  }
}
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

