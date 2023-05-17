// import Vue from 'vue';
// import VueI18n from 'vue-i18n';
// import {createI18n, useI18n} from "vue-i18n";
// import en from '/locales/en.json';
// import ru from '/locales/ru.json';
// import {createApp} from "vue";
// // import { defaultLocale } from "./i18n"
//
// const defaultLocale = 'en'
// const languages = {
//     en,
//     ru,
// }
//
// const messages = Object.assign(languages)
// const i18n = createI18n({
//     legacy: false,
//     locale: defaultLocale, // Используйте сохраненный язык или установите язык по умолчанию
//     fallbackLocale: 'en',
//     messages: {
//         en,
//         ru,
//     },
// });
//
// createApp(App, {
//     setup() {
//         const {t} = useI18n()
//         return(t)
//     }
// }).use(i18n).mount('#app')