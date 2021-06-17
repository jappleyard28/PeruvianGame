<template>
  <article>
    <div>
      <h4>{{questionInfo.question}}</h4>
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
    questionInfo : {type : Object, default : () => ({})},
    count : {type : Number},
    bob : {type : Number},
  },
  data: () => ({
    answerText: ''
  }),
  methods: {
      answerQuestion() {
        this.$emit('answer', this.answerText);
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