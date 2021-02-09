import React from 'react';
import { useTranslation } from 'react-i18next';
import '~/assets/scss/views/HomeView.scss';

const HomeView = () => {
    const { t } = useTranslation();
    return (
        <div className="home">
            <h1>{t("view.home.welcome")}</h1>
        </div>
    );
}
export default HomeView;