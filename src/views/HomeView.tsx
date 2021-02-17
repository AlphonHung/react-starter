import React from 'react';
import { useTranslation } from 'react-i18next';
import '~/assets/scss/views/HomeView.scss';
import { Button } from 'react-bootstrap';

const HomeView = () => {
    const { t } = useTranslation();
    return (
        <div className="home">
            <h1>{t("view.home.welcome")}</h1>
            <Button className="primary">Bootstrap Button</Button>
            <button>Normal Button</button>
        </div>
    );
}
export default HomeView;