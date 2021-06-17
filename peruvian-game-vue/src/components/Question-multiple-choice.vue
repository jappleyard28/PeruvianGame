<template>
  <article>
    <div>
      <h4>{{questionInfo.question}}</h4>
      Answer: 
    </div>
    <br>

    <div v-for="(option, index) in questionInfo.options" :key="index">
      <input type="radio" class="btn-check" name="options" :id="'option' + index" autocomplete="off" v-model="answerText" value= index>
      <label class="btn btn-secondary" for="option1">{{option}}</label>
    <br>
    </div>
    <button @click="answerQuestion">Answer</button>
  </article>
</template>

<script>
export default {
  name: "QuestionText",
  components: {},
  props: {
    questionInfo : {type : Object, default : () => ({})},
    count : {type : Number}
  },
  data: () => ({
    answerText: '',
    picked: 0
  }),
  methods: {
      answerQuestion() {
        this.$emit('answer', this.answerText);
    }
  },
  mounted() {},
  computed: {
    numCount: function(){
      console.log(this.count)
        return parseInt(this.count)
    }
  }
};
</script>

<style scoped>
</style>

