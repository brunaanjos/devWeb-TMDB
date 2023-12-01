import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
import './plugins/axios'
import 'vue-loading-overlay/dist/css/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faMagnifyingGlass, faList, faChevronLeft, faChevronRight, faArrowRight } from '@fortawesome/free-solid-svg-icons'
     
import { faUser } from '@fortawesome/free-regular-svg-icons'

library.add(faMagnifyingGlass, faUser, faList, faChevronLeft, faChevronRight, faArrowRight)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
