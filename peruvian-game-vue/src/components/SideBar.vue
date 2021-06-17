<template>
    <div class="sidenav">
      <router-link to="Home" id="navLogo"><img src="@/assets/logo.png"></router-link>
      <router-link to="Home">{{ $t('nav.home')}}</router-link>
      <router-link to="Leaderboard">{{ $t('nav.leaderboard')}}</router-link>
      <router-link to="Profile">{{ $t('nav.profile')}}</router-link>
      <router-link to="Quiz">{{ $t('nav.quiz')}}</router-link>
      <router-link to="Nutrition">{{ $t('nav.nutrition')}}</router-link>
      <router-link to="AboutUs">{{ $t('nav.aboutUs')}}</router-link>
      <router-link to="ContactUs">{{ $t('nav.contactUs')}}</router-link>
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

  #navLogo {
    padding: 50px;
  }
</style>
