import { createPinia } from 'pinia'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import axios from 'axios'
import router from './router'

import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
//Primevue
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
//Primevue components
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Breadcrumb from 'primevue/breadcrumb';
import Sidebar from 'primevue/sidebar';
import PanelMenu from 'primevue/panelmenu';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import Toast from 'primevue/toast';

const app = createApp(App)

app.use(createPinia())
app.use(router, axios)
//app.use(PrimeVue);

//components
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('InputText', InputText);
app.component('Breadcrumb', Breadcrumb);
app.component('Sidebar', Sidebar);
app.component('PanelMenu', PanelMenu);
app.component('Avatar', Avatar);
app.component('Menu', Menu);
app.component('Toast', Toast);
app.component('InputNumber', InputNumber);
app.component('InputText', InputText);

app.use(PrimeVue, { ripple: true }); // ripple effect
app.mount('#app')