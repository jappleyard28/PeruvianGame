<template>
  <article>
    <div>
      <h4>{{question.question}}</h4>
      Answer: 
    <br>
    <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" v-model="answerText" value=1>
    <label class="btn btn-secondary" for="option1">1</label>

    <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off" v-model="answerText" value=2>
    <label class="btn btn-secondary" for="option2">2</label>

    <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off" v-model="answerText" value=3>
    <label class="btn btn-secondary" for="option3">3</label>

    <input type="radio" class="btn-check" name="options" id="option4" autocomplete="off" v-model="answerText" value=4>
    <label class="btn btn-secondary" for="option4">4</label>

    <input type="radio" class="btn-check" name="options" id="option5" autocomplete="off" v-model="answerText" value=5>
    <label class="btn btn-secondary" for="option5">5</label>

    <br>

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
    answerText: '',
    picked: 0
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

