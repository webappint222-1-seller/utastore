import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './assets/tailwind.css'
import Vuelidate from 'vuelidate'
// import Navbar from './components/Navbar.vue'

Vue.config.productionTip = false
Vue.use(Vuelidate)

const app = new Vue({
  router,
  vuetify,
  Vuelidate,
  
  render: h => h(App)
})
app.$mount('#app')
// app.$component('#nav-bar', Navbar)
  


  
