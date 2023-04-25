import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/my.css'
import 'ant-design-vue/dist/antd.css';
import 'swiper/css';
import 'swiper/css/navigation';
import Antd from 'ant-design-vue';
window.$http='http://192.168.150.129:100/shop/filter'
createApp(App).use(store).use(router).use(Antd).mount('#app')
