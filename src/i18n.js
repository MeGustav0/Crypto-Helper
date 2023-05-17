import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

// Импортируйте файлы с переводами
import en from '/locales/en.json';
import ru from '/locales/ru.json';

const savedLanguage = localStorage.getItem('language'); // Чтение сохраненного языка из localStorage

const i18n = new VueI18n({
    locale: savedLanguage || 'en', // Используйте сохраненный язык или установите язык по умолчанию
    fallbackLocale: 'en',
    messages: {
        en,
        ru,
    },
});

export default i18n;