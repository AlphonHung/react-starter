import zh_TW from './locale/zh_TW';
import en_US from './locale/en_US';

/** 用來init i18next的resource */
export const Resources = {
    zh_TW: { translation: zh_TW },
    en_US: { translation: en_US },
}

/** 語系選單 */
export const LocaleOptions = [
    {key: 'zh', value: '中文', resource: 'zh_TW' },
    {key: 'en', value: 'English', resource: 'en_US' },
]

export type AvailableLocale = 'zh_TW' | 'en_US';