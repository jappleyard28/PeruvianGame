<template>
  <div>
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Score</th>
          <th scope="col">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, i) in leaderboardInfo" :key="i">
          <th scope="row">{{ ++i }}</th>
          <td>{{ entry.name }}</td>
          <td>{{ entry.score }}</td>
          <td>{{ entry.timestamp }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: "LeaderboardComponent",
  components: {} ,
  props: {leaderboardInfo: Array} ,
  data() {
    
  },
};

</script>

<style scoped></style>

