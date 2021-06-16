<template>
    <article>
        <p>Choose difficulty:</p>
        <input type="radio" value="Easy" v-model="picked">
        <label for="easy">Easy</label>
        <br>
        <input type="radio" value="Medium" v-model="picked">
        <label for="medium">Medium</label>
        <input type="radio" value="Hard" v-model="picked">
        <label for="hard">Hard</label>
        <br>
        <p>Choose Mode:</p>
        <input type="radio" value="Math" v-model="picked">
        <label for="math">Math</label>
        <br>
        <input type="radio" value="Nutrition" v-model="picked">
        <label for="Nutrition">Nutrition</label>
        <br>
        <input type="submit" value="Save Modes"/>
    </article>
</template>

<script>
export default {
  name: 'Difficulty',
  components: {}
}
</script>

<style scoped>

</style>