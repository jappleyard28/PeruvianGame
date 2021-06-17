import Vue from 'vue'
import router from './router'
import App from './App.vue'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false
Vue.use(VueI18n)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
