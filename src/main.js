import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {createI18n, useI18n} from "vue-i18n";

import {languages} from "@/index";
import {defaultLocale} from "@/index";

const savedLanguage = localStorage.getItem('language');

const messages = Object.assign(languages)
const i18n = createI18n({
    legacy: false,
    locale: savedLanguage || defaultLocale, // Используйте сохраненный язык или установите язык по умолчанию
    fallbackLocale: 'en',
    messages
});

createApp(App, {
    setup() {
        const {t} = useI18n()
        return(t)
    }
}).use(store).use(router).use(i18n).mount('#app')
