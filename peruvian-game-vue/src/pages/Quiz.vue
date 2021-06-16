<template>
  <article>
    <span id="back-arrow">
      <img src="../assets/left-arrow.png" style="width:25px;height:25px;">
    </span>
    <h3>QUIZ THING</h3>

    <question-text
      v-if="quiz.questions[currentQuestion].type == 'text'"
      :question="quiz.questions[currentQuestion]"
      @answer="qAnswerSubmitted"
    />
    <question-multiple-choice
      v-if="quiz.questions[currentQuestion].type == 'multiple-choice'"
      :question="quiz.questions[currentQuestion]"
      @answer="qAnswerSubmitted"
    />
    <question-maths
      v-if="quiz.questions[currentQuestion].type == 'math'"
      :question="quiz.questions[currentQuestion]"
      @answer="qAnswerSubmitted"
    />

    


  </article>
</template>

<script>
import { getQuiz } from '@/API.js'
export default {
  
  name: 'Quiz',
  components: {},
  props: {},
  data: ()=>({
    quiz: {},
    currentQuestion: 0,
    answers: [],
    SESSION_TOKEN: '',
  }),
  methods: {
    qAnswerSubmitted(ans) {
      this.answers.push(ans);
      this.currentQuestion++;
    },
    submitQuizAnswers() {
      this.postData('/api/answers', ({
        type: 'nutrition',// could also be math
        answers: this.answers,
        // if it is math game then also
        //SESSION_TOKEN: SESSION_TOKEN
      }));
    },
    fetchQuiz: async (type, difficulty) => {
      console.log();
      try {
        let response = await getQuiz({type: type, difficulty: difficulty});
        this.quiz = await response;
      } catch (error) {
        console.log({error: error});
      }
    }
    
  },
  mounted() {
    this.fetchQuiz('math', 1);
  },
}
</script>

<style scoped>

#back-arrow{
  position: fixed;
  left: 30px;
  top: 30px;
}

</style>