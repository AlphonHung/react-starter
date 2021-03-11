import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AuthActionCreators } from '~/store';
import { Form, Button } from 'react-bootstrap';
import '~/assets/scss/views/LoginView.scss';

/** 單純用來示範router的view */
const LoginView = () => {
    const { t } = useTranslation(); // 所有文字皆應使用i18n，此頁純demo故
    const dispatch = useDispatch();
    return (
        <div className="login">
            {/** 直接從react-bootstrap複製範例 */}
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <div className="flex-row flex-justify-spbt">
                    <Button variant="primary" type="submit">{t('system.button.login')}</Button>
                    <Button variant="secondary" onClick={() => { dispatch(AuthActionCreators.fakeLogin()) }}>開發登入</Button>
                </div>
            </Form>
        </div>
    );
}

export default LoginView;