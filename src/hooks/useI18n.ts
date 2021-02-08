import { useState, useEffect } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LocaleConfig } from '~/config';
import { StorageKeys } from '~/constants';
import { Resources, LocaleOptions } from '../i18n';

const init = () => {
    const [i18nInitialized, setI18nInitialized] = useState(false);
    const savedLocale = localStorage.getItem(StorageKeys.System.Locale);
    useEffect(() => {
        i18next
            .use(initReactI18next)
            .init({
                lng: savedLocale || LocaleConfig.defaultLocale,
                fallbackLng: LocaleConfig.fallbackLocale,
                debug: LocaleConfig.debugMode,
                resources: Resources
            })
            .then(() => { setI18nInitialized(true); });
    }, [])

    return { i18nInitialized };
}

const useI18n = {
    init
}

export default useI18n;