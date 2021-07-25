import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVueIcons } from 'bootstrap-vue'
import firebase from 'firebase'
import axios from 'axios'

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyAISucH8T-fl9i4r_5hF7xKXAACi-PpSDI",
  authDomain: "kffw-6edfe.firebaseapp.com",
  projectId: "kffw-6edfe",
  storageBucket: "kffw-6edfe.appspot.com",
  messagingSenderId: "899502933511",
  appId: "1:899502933511:web:8cac5ff262fdc60e030ca2"
});

Vue.use(BootstrapVueIcons);
Vue.use(axios);

new Vue({
  router,
  store,
  firebase,
  render: h => h(App)
}).$mount('#app')
