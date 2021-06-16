<template>
  <div>
    <h4>THIS IS THE COMPONENT FOR question-text</h4>
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
      this.$emit('answer', this.answerText);
    }
  }
};
<script/>
