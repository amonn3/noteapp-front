import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { pinia } from '@/stores';

import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';


//icons
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount('#app');