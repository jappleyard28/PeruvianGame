<template>
  <article>
    <div>
      <h4>{{questionInfo}}</h4>
      {{bob}}
      Answer: <input type="text" v-model="answerText" />
      <button @click="answerQuestion">Answer</button>
    </div>
  </article>
</template>

<script>
export default {
  name: "QuestionText",
  components: {},
  props: {
    questionInfo : {type : String},
    count : {type : Number},
    bob : {type : Number},
  },
  data: () => ({
    answerText: ''
  }),
  methods: {
      answerQuestion() {
        if(isNaN(parseInt(this.answerText))){
            alert("You did not give a number")
            return false
        }
        this.$emit('answer', parseInt(this.answerText));
    },
    print(sth){
      console.log(sth)
    }
  },
  mounted() {
    
  },
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