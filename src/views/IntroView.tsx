import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '~/assets/scss/views/IntroView.scss';

const IntroView = () => {
    const { t } = useTranslation(); // 所有文字皆應使用i18n，此頁純demo故
    return (
        <div className="intro">
            <div className="display-1">{t('view.intro.production_title')}</div>
            <p className="lead">{t('view.intro.production_desc')}</p>
            <Link to="/login">{t('system.button.login')}</Link>
        </div>
    );
}
export default IntroView;