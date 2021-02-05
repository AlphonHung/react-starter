import i18next from 'i18next';
import { StorageHelper } from './storage.helper';
import { LocaleConfig } from '../config';
import { Resources, AvailableLocale, LocaleOptions } from '../i18n';

export class I18nHelper {
    private static _instance: I18nHelper;
    static get instance() {
        return this._instance || (this._instance = new this());
    }

    constructor() {
        const savedLocale = StorageHelper.instance.current.getItem(StorageHelper.instance.keys.System.Locale);
        i18next.init({
            lng: savedLocale || LocaleConfig.defaultLocale,
            fallbackLng: LocaleConfig.fallbackLocale,
            debug: LocaleConfig.debugMode,
            resources: Resources
        }).catch((error) => {
            console.log('i18n初始化失敗', error);
        });
    }

    /** 使用i18n翻譯 */
    t(key: string, options?: any) {
        return i18next.t([key, 'system.message.miss_translation'], options);
    }

    /** 取得目前使用的語系選項物件 */
    getCurrentLocaleOption() {
        return LocaleOptions.find(x => x.resource === i18next.language);
    }

    /** 改變語系 */
    changeLanguage(lang: AvailableLocale) {
        const storage = StorageHelper.instance.current;

        i18next.changeLanguage(lang)
            .then(() => { storage.setItem(StorageHelper.instance.keys.System.Locale, lang); })
            .catch((error) => { console.log('i18n切換語言失敗', error) });
    }
}