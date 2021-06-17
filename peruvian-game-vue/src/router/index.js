import Vue from "vue";
import Router from "vue-router";

import Home from "@/pages/Home.vue";
import Leaderboard from "@/pages/Leaderboard.vue";
import Profile from "@/pages/Profile.vue";
import Quiz from "@/pages/Quiz.vue";
import Nutrition from "@/pages/Nutrition.vue";
import AboutUs from "@/pages/AboutUs.vue";
import ContactUs from "@/pages/ContactUs.vue";
import i18n from "../i18n.js";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: `/${i18n.locale}`
    },
    {
      path: '/:lang',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home,
          alias: '/home'
        },
        {
          path: 'leaderboard',
          name: 'leaderboard',
          component: Leaderboard
        },
        {
          path: 'profile',
          name: 'profile',
          component: Profile
        },
        {
          path: 'quiz',
          name: 'quiz',
          component: Quiz
        },
        {
          path: 'nutrition',
          name: 'nutrition',
          component: Nutrition
        },
        {
          path: 'aboutus',
          name: 'aboutus',
          component: AboutUs
        },
        {
          path: 'contactus',
          name: 'contactus',
          component: ContactUs
        }
      ]
    }
  ]
});
