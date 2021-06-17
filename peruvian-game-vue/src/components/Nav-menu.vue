<template>
  <div>
      {{currentQ}}
      <div> <nav aria-label="...">
  <ul class="pagination">
    <li :class="'page-item '+ (currentQ == 0) ? 'disabled' : '' ">
      <span v-if="currentQ == 0" class="page-link">Previous</span>
      <a v-if="currentQ != 0" class="page-link" href="#" @click="prevPage">Previous</a>
    </li>
    <li v-for="n in noQuest" :key="n" :class="'page-item '+ (currentQ == n) ? 'disabled' : '' ">
      <span v-if="currentQ == n - 1" class="page-link">
        {{n}}
        <span class="sr-only"></span>
      </span>
      <a v-if="currentQ != n - 1" class="page-link" href="#" @click="navTo(n)">{{n}}</a>
    </li>
    <li :class="'page-item '+ (noQuest == currentQ) ? 'disabled' : '' ">
      <span v-if="noQuest == currentQ" class="page-link">Next</span>
      <a v-if="noQuest != currentQ" class="page-link" href="#" @click="nextPage">Next</a>
    </li>
  </ul>
</nav></div>
    </div>


</template>

<script>
export default {
  name: 'NavMenu',
  components: {},
  props: {
    currentQ : {type : Number, default : () => 0 },
    noQuest : {type : Number, default : () => 0 },

  },
  methods: {
    prevPage() {
        this.$emit('back');
    },
    navTo(pageNo){
        this.$emit('navigateTo', pageNo - 1);
    },
    nextPage() {
        this.$emit('next');
    },
  },
}
</script>

<style scoped>

#answer{

  width:25%;
  height:150px;
  margin:1%;
}

#question{
  width:43.5%;
  height:70px;
  background-color: lightblue;
  margin-left:540px;
  
}

.pagination {

  margin-left: 63%;

}
</style>