<template>
  <div>
    <h4>THIS IS THE COMPONENT FOR question-maths</h4>
    <h4>{{question.question}}</h4>
    Answer: <input type="text" v-model="answerText" />
    <button @click="nextQuestion">Next Question</button>
  </div>
</template>

<script>
export default {
  name: 'QuestionText',
  components: {},
  props: {
    question
  },
  data: ()=>({
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
  }
};
<script/>

