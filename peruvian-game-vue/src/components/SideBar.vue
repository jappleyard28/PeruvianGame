<template>
    <div class="sidenav">
      <router-link to="Home" id="navLogo">(Logo)</router-link>
      <router-link to="Home">Home</router-link>
      <router-link to="Info">Info</router-link>
      <router-link to="Quiz">Quiz</router-link>
      <router-link to="Game">Game</router-link>
      <router-link to="Leaderboard">Leaderboard</router-link>
      <router-link to="AboutUs">About us</router-link>
      <router-link to="ContactUs">Contact us</router-link>
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
    height: 94.5%;
    width: 200px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: lightblue;
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
