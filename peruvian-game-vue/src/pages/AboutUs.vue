<template>
  <div class="main">
    <h1>About us</h1>
    <h2>Meet the team</h2> <!--make it so that when the user clicks on each picture (of that person) it will show some text underneath about them-->
    <p>We're a team of five people including:</p>
    <div class="row">
      <div class="column">
        <img src="../assets/jack.jpg" alt="Jack" style="width:100%" @click="showInfo('jack')">
        <b>Jack Appleyard</b>
        <p class="people" id="jack" style="visibility: hidden">
          Hi, I'm jack and I made thte language switcher and side navigation bar components, as well as making the 'About Us' and 'Contact Us' pages.
        </p>
      </div>
      <div class="column">
        <img src="../assets/usama.jpg" alt="Usama" style="width:100%" @click="showInfo('usama')">
        <b>Usama Imtiaz</b>
        <p class="people" id="usama" style="visibility: hidden">
          Hi, my name is Usama! I was responsible for some of the front end development including the quiz page, many of the nutritional questions and also the empathy maps in the design stage.
        </p>
      </div>
      <div class="column">
        <img src="../assets/yan.jpg" alt="Yan" style="width:100%" @click="showInfo('yan')">
        <b>Yan Pfister</b>
        <p class="people" id="yan" style="visibility: hidden">
          Hi, I'm Yan and I was reposnible mainly for the lo-fi designs during the intial stages of our project, working on the leaderboard page and helping with the research element that specialised in the nutrition side of things in Lobitos and Piedritas.
        </p>
      </div>
      <div class="column">
        <img src="../assets/tiger.jpg" alt="Kathapet" style="width:100%" @click="showInfo('kathapet')">
        <b>Kathapet Nawongs</b>
        <p class="people" id="kathapet" style="visibility: hidden">
          Hi, I'm Kathapet
        </p>
      </div>
      <div class="column">
        <img src="../assets/nathan.jpg" alt="Nathan" style="width:100%" @click="showInfo('nathan')">
        <b>Nathan Davis</b>
        <p class="people" id ="nathan" style="visibility: hidden">
          Hi, I'm Nathan
        </p>
      </div>
    </div><br><br>
    
    <h2>How we aim to help you</h2>
    <p>
      We've set up this website to help spread awareness of many of the issues in Lobitos and Piedritas, as well as inform you about what you can do to help make a change.
      Some of the main issues in Lobitos and Piedritas that we plan to help tackle are the food and digital aspects by informing you about nutritional information to help encourage you to take that into account.
      Our quiz also includes some educational questions to help make it fun and exciting for you to learn, which could help local schools use this for the children to use as part of their education.
    </p> 
    
    <br><br>  
    <h2>Find out more</h2>
    <p>There are many more resources you can look at if you would like to look further into this such as:</p>
    <a href="https://nutritionfacts.org/">Nutrition information</a><br>
    <a href="https://www.bbcgoodfood.com/recipes/collection/quick-and-healthy-recipes">Nutritious meals</a><br>
    <a href="https://www.nrdc.org/stories/renewable-energy-clean-facts">Renewable energy</a><br>
    <a href="https://www.bbc.co.uk/bitesize/examspecs/z9p3mnb">Maths topics</a><br>
    <a href="https://www.bbc.co.uk/bitesize/subjects/zpm6fg8">Physics topics</a><br>
    <a href="https://www.bbc.co.uk/bitesize/subjects/zs6hvcw">Chemistry topics</a><br> 
    <a href="https://www.bbc.co.uk/bitesize/examspecs/zpgcbk7">Biology topics</a><br>
    <a href="https://www.duolingo.com/courses/es">Language courses for spanish speakers</a><br>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
  components: {},
  methods:{
    changeVisibility:function(num)
    {
      const people = ["jack", "usama", "yan", "kathapet", "nathan"];
      var i;
      for (i = 0; i < 5; i++)
      {
        if (i == num)
        {
          document.getElementById(people[i]).style.visibility='visible';
        }
        else
        {
          document.getElementById(people[i]).style.visibility='hidden';
        }
      }
    },
    showInfo:function(e)
    {
      if (e == "jack")
      {
        this.changeVisibility(0);
      }
      else if (e == "usama")
      {
        this.changeVisibility(1);
      }
      else if (e == "yan")
      {
        this.changeVisibility(2);
      }
      else if (e == "kathapet")
      {
        this.changeVisibility(3);
      }
      else if (e == "nathan")
      {
        this.changeVisibility(4);
      }
    },
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

  .column {
    flex: 15%;
    padding: 5px;
  }

  .people {
    padding-left: 5%;
  }
</style>
