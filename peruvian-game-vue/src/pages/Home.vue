<template>
  <div>
    <h1>{{ $t('home.home1') }}</h1>

    <h2>{{ $t('home.home2') }}</h2>

    <p>{{ $t('home.home3') }}</p>

    <h2>{{ $t('home.home4') }}</h2>

    <p>{{ $t('home.home5') }}</p>

    <h2>{{ $t('home.home6') }}</h2>

    <h3>{{ $t('home.home7') }}</h3>

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

<style scoped>
</style>
