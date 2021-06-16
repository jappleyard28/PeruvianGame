<template>
  <form>
    <h4>THIS IS THE COMPONENT FOR question-multiple-choice</h4>
    <h4>{{question.question}}</h4>
    Answer: 
    <div style="position:relative;padding: 10px;margin: 1">
        <button style="background-color:green;color: #eeeeee; border: 4px double #cccccc;width: 90px;height:60px;display: inline-block;cursor: pointer;margin:20px">First Answer</button>
        <button style="background-color:green;color: #eeeeee; border: 4px double #cccccc;width: 90px;height:60px;display: inline-block;cursor: pointer;margin:20px">Second Answer</button>
        <button style="background-color:green;color: #eeeeee; border: 4px double #cccccc;width: 90px;height:60px;display: inline-block;cursor: pointer;margin:20px">Third Answer</button>
        <button style="background-color:green;color: #eeeeee; border: 4px double #cccccc;width: 90px;height:60px;display: inline-block;cursor: pointer;margin:20px">Fourth Answer</button>
        <button style="background-color:green;color: #eeeeee; border: 4px double #cccccc;width: 90px;height:60px;display: inline-block;cursor: pointer;margin:20px">Fifth Answer</button>
    </div>

    <button @click="nextQuestion">Next Question</button>
  </form>
</template>

<script>
export default {
  name: 'QuestionMultipleChoice',
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

