import { useState, useEffect } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LocaleConfig } from '~/config';
import { StorageKeys } from '~/constants';
import { Resources } from '../i18n';

const init = () => {
    const [i18nInitialized, setI18nInitialized] = useState(false); // 自帶狀態: 是否已初始化
    const savedLocale = localStorage.getItem(StorageKeys.System.Locale);
    useEffect(() => {
        i18next
            .use(initReactI18next) // 讓其他組件可使用useTranslation
            .init({
                lng: savedLocale || LocaleConfig.defaultLocale,
                fallbackLng: LocaleConfig.fallbackLocale,
                debug: LocaleConfig.debugMode, // 生產環境記得改為false
                resources: Resources // resource內部包含所有語言的語系檔
            })
            .then(() => { setI18nInitialized(true); });
    }, [])

    return { i18nInitialized };
}

const useI18n = {
    init
}

export default useI18n;