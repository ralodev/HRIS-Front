import { createPinia } from 'pinia'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import { setAuthorizationHeader } from '@/assets/js/axiosConfig';
import Cookies from 'js-cookie';

import App from './App.vue'
import axios from 'axios'
import router from './router'

// Establecer la configuración global de Axios
const token = Cookies.get('token');
setAuthorizationHeader(token);

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
//Primeflex
import "primeflex/primeflex.css";
//Primevue
import "primevue/resources/themes/lara-light-blue/theme.css"; //theme
//import "primevue/resources/themes/viva-light/theme.css"; //theme
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import spanish from './assets/es.json'
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
import MultiSelect from 'primevue/multiselect';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import Tooltip from 'primevue/tooltip';
import Toolbar from 'primevue/toolbar';
import SplitButton from 'primevue/splitbutton';
import Menubar from 'primevue/menubar';
import RadioButton from 'primevue/radiobutton';
import ToggleButton from 'primevue/togglebutton';
import OverlayPanel from 'primevue/overlaypanel';
import BlockUI from 'primevue/blockui';
import Skeleton from 'primevue/skeleton';
import Checkbox from 'primevue/checkbox';
import InputMask from 'primevue/inputmask';
import Tag from 'primevue/tag';
import Panel from 'primevue/panel';
import Galleria from 'primevue/galleria';
import Divider from 'primevue/divider';
import Password from 'primevue/password';
import InputSwitch from 'primevue/inputswitch';

const app = createApp(App)

app.use(createPinia())
app.use(router, axios)

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
app.component('MultiSelect', MultiSelect);
app.component('Dropdown', Dropdown);
app.component('TextArea', Textarea);
app.component('Toolbar', Toolbar);
app.component('SplitButton', SplitButton);
app.component('Menubar', Menubar);
app.component('RadioButton', RadioButton);
app.component('ToggleButton', ToggleButton);
app.component('OverlayPanel', OverlayPanel);
app.component('BlockUI', BlockUI);
app.component('Skeleton', Skeleton);
app.component('Checkbox', Checkbox);
app.component('InputMask', InputMask);
app.component('Tag', Tag);
app.component('Panel', Panel);
app.component('Galleria', Galleria);
app.component('Divider', Divider);
app.component('Password', Password);
app.component('InputSwitch', InputSwitch);

app.use(PrimeVue, {
    ripple: true,
    locale: spanish
}); // ripple effect
app.directive('tooltip', Tooltip);
app.mount('#app')