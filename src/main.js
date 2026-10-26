import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import './assets/css/main.css'
import './assets/css/themes.css'

import i18n from './i18n'

createApp(App)
  .use(router)
  .use(i18n)
  .mount('#app')