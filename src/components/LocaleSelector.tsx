import React from 'react';
import { LocaleOptions } from '~/i18n';
import helper from '~/helper';
import '~/assets/scss/components/LocaleSelector.scss';

const LocaleSelector = () => (
    <select className="locale-selector" value={helper.i18n.getCurrentLocaleOption().key}
        onChange={(event) => { helper.i18n.changeLanguage(event.target.value); }}>
        {LocaleOptions.map((x, i) => (
            <option key={`locale-option_${i}`} value={x.key}>{x.value}</option>
        ))}
    </select>
);

export default LocaleSelector;