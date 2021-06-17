<template>
  <article>
    <span id="back-arrow">
      <img src="../assets/left-arrow.png" style="width:25px;height:25px;">
    </span>
    <h3  v-if= "quiz.questions[currentQuestion].type == 'text'">Quiz</h3>
    <p>{{quiz.questions[currentQuestion].type}}</p> 
    <questionText
      v-if= "quiz.questions[currentQuestion].type == 'text'"
      :question = 'quiz.questions[currentQuestion]' :count = 'currentQuestion'
      @answer= "qAnswerSubmitted"
    />
    <questionMultipleChoice
      v-if= "quiz.questions[currentQuestion].type == 'multiple-choice'"
      :question= "quiz.questions[currentQuestion]" :count = 'currentQuestion'
      @answer= "qAnswerSubmitted"
    />
    <questionMaths
      v-if= "quiz.questions[currentQuestion].type == 'math'"
      :question= "quiz.questions[currentQuestion]" :count = 'currentQuestion'
      @answer= "qAnswerSubmitted"
    />

    <button v-if= "currentQuestion == 10">done</button>

  </article>
</template>

<script>
//import { getQuiz } from '@/API.js'
import quizData from "../assets/quiz.json"
import questionText from "../components/Question-text.vue"
import questionMultipleChoice from "../components/Question-multiple-choice.vue"
export default {
  
  name: 'Quiz',
  components: {
    questionText,
    questionMultipleChoice
  },
  props: {},
  data: ()=>({
    //quiz: ({}),
    quiz: quizData,
    currentQuestion: 0,
    answers: [],
    SESSION_TOKEN: ''
  }),
  methods: {
    qAnswerSubmitted(ans) {
      this.answers.push(ans);
      this.currentQuestion++;
    },
    // submitQuizAnswers() {
    //   this.postData('/api/answers', ({
    //     type: 'nutrition',// could also be math
    //     answers: this.answers,
    //     // if it is math game then also
    //     //SESSION_TOKEN: SESSION_TOKEN
    //   }));
    // },
    // fetchQuiz: async (type, difficulty) => {
    //   console.log();
    //   try {
    //     let response = await getQuiz({type: type, difficulty: difficulty});
    //     this.quiz = response || {};
    //     throw new Error("hi");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    
  },
  mounted() {

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