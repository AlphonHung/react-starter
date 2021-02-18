import React from 'react';
import { useTranslation } from 'react-i18next';
import '~/assets/scss/views/LoginView.scss';

/** 單純用來示範router的view */
const LoginView = () => {
    const { t } = useTranslation(); // 所有文字皆應使用i18n，此頁純demo故
    return (
        <div className="login">
            <label>Email</label>
            <input type="email" />
            <label>Password</label>
            <input type="password" />
            <button className="login-button">{t('system.button.login')}</button>
        </div>
    );
}

export default LoginView;