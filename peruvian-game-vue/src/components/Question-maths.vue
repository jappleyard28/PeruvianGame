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
  name: "QuestionMath",
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
        if(isNaN(this.answerText)){
            alert("You did not give a number")
            return false
        }
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

