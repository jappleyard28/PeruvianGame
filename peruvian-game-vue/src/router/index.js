import Vue from "vue";
import Router from "vue-router";

import Home from "@/pages/Home.vue";
import Leaderboard from "@/pages/Leaderboard.vue";
import Profile from "@/pages/Profile.vue";
import Quiz from "@/pages/Quiz.vue";
import Difficulty from "@/pages/Difficulty.vue"

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      alias: '/home'
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: Leaderboard
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz
    },
    {
      path: '/difficulty',
      name: 'difficulty',
      component: Difficulty
    },
  
  ]
});
