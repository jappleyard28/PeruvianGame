<template>
  <div class="main">
    <h1>About us</h1>
    <h2>Meet the team</h2> <!--make it so that when the user clicks on each picture (of that person) it will show some text underneath about them-->
    <p>We're a team of five people including:</p>
    <div class="row"> <!--theDude-->
      <div class="column">
        <img src="../assets/jack.jpg" alt="Jack" style="width:100%" v-on:click="showInfo()" id="jack">
        <button v-on:click="showInfo()" id="testButton">test</button>
        <b>Jack Appleyard</b>
      </div>
      <div class="column">
        <img src="../assets/usama.jpg" alt="Usama" style="width:100%" v-on:click="showUsamaInfo()" id="usama">
        <b>Usama Imtiaz</b>
      </div>
      <div class="column">
        <img src="../assets/yan.jpg" alt="Yan" style="width:100%" v-on:click="showYanInfo()" id="yan">
        <b>Yan Pfister</b>
      </div>
      <div class="column">
        <img src="../assets/tiger.jpg" alt="Kathapet" style="width:100%" v-on:click="showKathapetInfo()" id="kathapet">
        <b>Kathapet Nawongs</b>
      </div>
      <div class="column">
        <img src="../assets/owl.jpg" alt="Nathan" style="width:100%" v-on:click="showNathanInfo()" id="nathan">
        <b>Nathan Davis</b>
      </div>
    </div><br><br>
    
    <h2>How we aim to help you</h2>
    <p>We've set up this website to help spread awareness of many of the issues in Lobitos and Piedritas, as well as inform you about what you can do to help make a change.</p><br><br>  
    <h2>Find out more</h2>
    <p>There are many more resources you can look at if you would like to look further into this such as:</p>
    <a href="www.google.co.uk">Google</a><br>
    <a href="www.google.co.uk">Google</a><br>
    <a href="www.google.co.uk">Google</a><br>
    <a href="www.google.co.uk">Google</a><br>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
  components: {},
  methods:{
    showInfo()
    {
      if()
      alert(document.getElementById());
    }
  }
}
</script>
<style scoped>
  img {
    text-align: center;
    width: 200px;
    height: 200px;
  }

  .row {
    display: flex;
  }

  /* Create three equal columns that sit next to each other */
  .column {
    flex: 15%;
    padding: 5px;
  }
</style>
