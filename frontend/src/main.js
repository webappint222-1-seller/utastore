import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './assets/tailwind.css'
import Vuelidate from 'vuelidate'
import VueNumericInput from 'vue-numeric-input';
import VueNumberInput from '@chenfengyuan/vue-number-input';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import Swal from 'sweetalert2/src/sweetalert2.js'
import VueCookie from 'vue-cookie';
// import axios from 'axios';


// import Navbar from './components/Navbar.vue'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueNumericInput)
Vue.use(VueNumberInput.name, VueNumberInput)
Vue.use(VueSweetalert2,options)
Vue.use(VueCookie)
// Vue.use(axios )
// Vue.use(Swal)

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
  textColor: 'white'
};

const app = new Vue({
  router,
  vuetify,
  Vuelidate,
  VueNumericInput,
  VueNumberInput,
  VueSweetalert2,
  VueCookie,
  // axios,
  
  render: h => h(App)
})
app.$mount('#app')
// app.$component('#nav-bar', Navbar)
  


  
