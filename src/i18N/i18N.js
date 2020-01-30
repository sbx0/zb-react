import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import {zhCN} from "./i18N.zh-CN";
import {zhTW} from "./i18N.zh-TW";
import {en} from "./i18N.en";
import {jp} from "./i18N.jp";
import {de} from "./i18N.de";

i18n
    .use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        resources: {
            "zh-CN": {translation: zhCN},
            "zh-TW": {translation: zhTW},
            "en": {translation: en},
            "jp": {translation: jp},
            "de": {translation: de},
        },
        interpolation: {
            escapeValue: false,
        },
        react: {
            bindI18n: 'languageChanged',
            bindI18nStore: '',
            transEmptyNodeValue: '',
            transSupportBasicHtmlNodes: true,
            transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
            useSuspense: false,
        }
    }).then();

// i18n.changeLanguage("zh-CN").then();
// i18n.changeLanguage("zh-TW").then();
// i18n.changeLanguage("jp").then();
// i18n.changeLanguage("en").then();