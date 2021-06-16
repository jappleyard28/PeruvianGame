<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assetlogo.pngs/">-->
    <router-view />
    <Language />
    <SideBar />
  </div>
</template>

<script>
import Language from './components/Language.vue'
import SideBar from './components/SideBar.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
//import Nutrition from './pages/Nutrition.vue'

export default {
  name: 'App',
  components: {
    Language,
    SideBar
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
</style>
