<template>
  <div id="app">
    <router-view id="main"/>
    <Language />
    <SideBar />
    <Footer />
  </div>
</template>

<script>
import Language from './components/Language.vue'
import SideBar from './components/SideBar.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Language,
    SideBar,
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#main {
  margin-left: 200px;
}
</style>
