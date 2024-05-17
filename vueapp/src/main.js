import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import panZoom from 'vue-panzoom'


const app = createApp(App)
app.use(PrimeVue)
app.use(panZoom)
app.mount('#app')
