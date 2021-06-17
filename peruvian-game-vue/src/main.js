import Vue from 'vue'
import router from './router'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import i18n from './i18n'

Vue.config.productionTip = false
Vue.use(VueI18n)

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
