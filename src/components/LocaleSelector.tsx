import React from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { LocaleOptions } from '~/i18n';
import '~/assets/scss/components/LocaleSelector.scss';

const LocaleSelector = () => {
    const { i18n } = useTranslation();
    return (
        <select className="locale-selector" value={i18next.language}
            onChange={(event) => { i18n.changeLanguage(event.target.value); }}>
            {LocaleOptions.map((x, i) => (
                <option key={`locale-option_${i}`} value={x.key}>{x.value}</option>
            ))}
        </select>
    )
};

export default LocaleSelector;