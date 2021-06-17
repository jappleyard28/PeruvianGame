<template>
  <article>
    <h2>Your score is: {{scoreStuff}}</h2>
    <h2>and you got {{scorePercent}} percent!</h2>
    <button @click="closeScore">Reset</button>
  </article>
</template>

<script>
export default {
  name: "ShowScore",
  components: {},
  props: {
      scoreStuff: {type : Number},
      scorePercent: {type : Number}
  },
  data: () => ({
  }),
  methods: {
      closeScore(){
          this.$emit('closeScore', false);
      }
  },
  mounted() {
    
  }
};
</script>

<style scoped>
</style>