<template>
  <div>
    <h1>Welcome To Peruvian Game</h1>

    <h2>Our Goal</h2>

    <p>We want let people in Lobitos and Piedritas have fun while learning about nutrition and testing their maths skills.</p>

    <h2>How to play</h2>

    <p> Click on Quiz in the side bar, select a quiz to do and start thinking! </p>

    <h2>Our Top Scorers</h2>

    <h3>TOP 3</h3>

    <leaderboard-component :leaderboardInfo="boardList"/>

  </div>
</template>

<script>
import LeaderboardComponent from '@/components/LeaderboardComponent.vue';
import { getLeaderboard } from "@/API.js";

export default {
  name: "Home",
  components: {LeaderboardComponent},
  data: () => ({
    boardList: []
  }),
  methods: {
    async fetchLeaderboard() {
      let response = await getLeaderboard(3);
      console.log(await getLeaderboard(3));
      this.boardList = response.leaderboard;

    }
  },
  mounted() {
    this.fetchLeaderboard();
  }

};
</script>

<style scoped></style>
