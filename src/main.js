import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import axios from 'axios'
import router from './router'

import './assets/main.css'

// Bootstrap - Datatable
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'




const app = createApp(App)

app.use(createPinia())
app.use(router, axios)
app.mount('#app')