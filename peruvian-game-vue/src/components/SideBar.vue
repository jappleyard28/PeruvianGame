<template>
    <div class="sidenav">
      <!-- change hrefs to take the user to each page -->
      <a href="Home page" id="navLogo">(Logo)</a>
      <a href="home page">Home</a>
      <a href="https://www.google.co.uk">Info</a>
      <a href="quiz page">Quiz</a>
      <a href="game page">Game</a>
      <!--<a href="#">Difficulty</a> remove as difficulty should be separate for the quiz and game-->
      <a href="leaderboard page">Leaderboard</a>
      <a href="about us page">About us</a>
      <a href="contact us page">Contact us</a>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods:{
    sideBar()
    {
      alert("test");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    font-family: "Lato", sans-serif;
  }

  .sidenav {
    height: 100%;
    width: 200px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: white;
    color: orange;
    overflow-x: hidden;
    padding-top: 20px;
  }

  .sidenav a {
    padding: 0px 0px 15px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
  }

  .sidenav a:hover {
    color: orange;
  }

  .main {
    margin-left: 200px; /* Same as the width of the sidenav */
  }

  #navLogo {
    padding: 50px;
    color: blue;
  }
</style>
