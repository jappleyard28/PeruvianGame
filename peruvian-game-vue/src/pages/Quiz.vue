<template>
  <article>
    <difficulty v-if="!quizReceived" @selectedDiff="fetchQuiz" />

    <p>{{ type }}</p>
    <div v-if="quizReceived">
      <div v-for="(question, index) in quiz.questions" :key="index">
        <questionText
          :questionInfo="question"
          v-if="index == currentQuestion && type == 'nutrition' && question.type == 'text'"
          :count="currentQuestion"
          @answer="qAnswerSubmitted"
          :bob="index"
        />
        <questionMultipleChoice
          :questionInfo="question"
          v-if="index == currentQuestion && type == 'nutrition' && question.type == 'multiple-choice'"
          :count="currentQuestion"
          @answer="qAnswerSubmitted"
        />
        <questionMath
          :questionInfo="question"
          v-if="index == currentQuestion && type == 'math'"
          :count="currentQuestion"
          @answer="qAnswerSubmitted"
        />
      </div>


      <navMenu
        :currentQ="currentQuestion"
        :noQuest="quiz.questions.length"
        @navigateTo="navTo"
        @back="backQ"
        @next="next"
      />

        <showScore 
          :scoreStuff="score"
          :scorePercent="percent"
          v-if="receivedScore"
          @closeScore="displayScore"
        />  

        <button v-if="currentQuestion == quiz.questions.length - 1" @click="submitAnswers">Submit</button>
    </div>

  </article>
</template>

<script>
import { getQuiz, sendAnswers } from "@/API.js";
import questionText from "../components/Question-text.vue";
import questionMultipleChoice from "../components/Question-multiple-choice.vue";
import questionMath from "../components/Question-maths.vue";
import difficulty from "../components/Difficulty.vue";
import navMenu from "@/components/Nav-menu.vue";
import showScore from "@/components/Show-score.vue";

export default {
  name: "Quiz",
  components: {
    questionText,
    questionMultipleChoice,
    questionMath,
    difficulty,
    navMenu,
    showScore
  },
  props: {},
  data: () => ({
    quiz: ({}),
    currentQuestion: 0,
    answers: [],
    SESSION_TOKEN: "",
    quizReceived: false,
    percent: 0,
    score: 0,
    receivedScore: false,
  }),
  methods: {
    qAnswerSubmitted(ans) {
      if(this.type == "math"){
        this.answers[this.currentQuestion] = ans;
      }
      else if(this.type == "nutrition"){
        this.answers[this.currentQuestion].value = ans;
      }
      console.log(this.answers);
      
    },
    navTo(page) {
      this.currentQuestion = page;
    },
    next() {

      if(this.currentQuestion < this.quiz.questions.length - 1) this.currentQuestion++;

    },
    backQ() {
      if(this.currentQuestion > 0) this.currentQuestion--;
    },
    async fetchQuiz(mode) {
      const { type, difficulty } = mode;
      const response = await getQuiz({
        type: type,
        difficulty: difficulty,
      });
      this.quiz = response;
      this.quizReceived = true;
      this.type = type;
      if(this.type == "nutrition"){
        for(let question in response.questions){
          this.answers.push({
            question : response.questions[question].id,
            value : ""
          })
        }
      }
      else if(this.type == "math"){
        response.questions.forEach(() => {
          this.answers.push("");
        });
        
      }
    },

    async submitAnswers() {
      let quizAnswers;
      if (this.type == "math") {
        quizAnswers = {
          session_token: this.quiz.session_token,
          type: this.type,
          answers: this.answers,
        };
        console.log(quizAnswers)
      }else if(this.type== "nutrition"){

        quizAnswers = {
          type: this.type,
          answers: this.answers,
        };
      }
      else{
        return;
      }

      if (this.name) quizAnswers["name"] = this.name;
      const response = await sendAnswers(quizAnswers);
      console.log(response);
      this.percent = this.calculatePercentage(response.results);
      this.score = response.score;
      this.receivedScore = true;
    },
    calculatePercentage(arrayThing){
      let percent = arrayThing.reduce((acc, val)=>(val) ? acc + 1 : acc) / arrayThing.length * 100;
      return percent;
    },
    displayScore(){
      this.receivedScore = false;
      this.quizReceived = false;
      this.currentQuestion = 0;
    }
  },
  mounted() {
    
  }
};
</script>

<style scoped>
#back-arrow {
  position: fixed;
  left: 30px;
  top: 30px;
}
</style>