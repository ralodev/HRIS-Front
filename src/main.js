import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import axios from 'axios'
import router from './router'

import './assets/main.css'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

// Bootstrap - Datatable
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'




const app = createApp(App)

library.add(fas)
app.use(createPinia())
app.use(router, axios)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')