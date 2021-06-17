<template>
  <article>
    <div>
      <h4>{{question.question}}</h4>
      Answer: <input type="text" v-model="answerText" />
      <button v-if= "numCount < 10" @click="nextQuestion">Next Question</button>
    </div>
  </article>
</template>

<script>
export default {
  name: "QuestionText",
  components: {},
  props: {
    question : {type : Object, default : () => ({})},
    count : {type : Number}
  },
  data: () => ({
    answerText: ''
  }),
  methods: {
      nextQuestion() {
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