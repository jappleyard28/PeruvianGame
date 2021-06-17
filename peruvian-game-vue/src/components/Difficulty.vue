<template>
    <article>
        <p>Choose difficulty:</p>
        <input type="radio" value=1 v-model="pickedDif" name="picked1">
        <label for="easy">Easy</label>
        <br>
        <input type="radio" value=2 v-model="pickedDif" name="picked1">
        <label for="medium">Medium</label>
        <input type="radio" value=3 v-model="pickedDif" name="picked1">
        <label for="hard">Hard</label>
        <br>
        <p>Choose Mode:</p>
        <input type="radio" value="math" v-model="pickedMode" name="picked2">
        <label for="math">Math</label>
        <br>
        <input type="radio" value="nutrition" v-model="pickedMode" name="picked2">
        <label for="Nutrition">Nutrition</label>
        <br>
        <input type="button" @click="submitMode" value="Save Modes"/>
    </article>
</template>

<script>
export default {
  name: 'Difficulty',
  components: {},
  data: () => ({
    pickedDif : " ",
    pickedMode : " "
  }),
  methods: {
      submitMode() {
        this.$emit('selectedDiff', {difficulty : this.pickedDif, type : this.pickedMode});
    }
  },
}
</script>

<style scoped>

</style>