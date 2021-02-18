import React, { ReactNode } from 'react';
import { Translation } from 'react-i18next';
import '~/assets/scss/views/ErrorBoundary.scss';

interface Props {
    children: ReactNode;
}
interface State {
    hasError: boolean;
}

/** 錯誤邊界，仍不支援hooks，放在ThemeProvider之外故不可使用styled components theme相關方法 */
class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    /** 偵測到錯誤時外部呼叫此method */
    static getDerivedStateFromError(error: Error): State {
        return { hasError: true };
    }

    /** 額外的Error log流程 */
    componentDidCatch(error: Error, info: React.ErrorInfo): void {
        // this.reportError(error); // 若需要，可將錯誤訊息紀錄到後端
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return (
                <Translation>
                    {(t, { i18n }) => (
                        <div className="error-boundary">
                            <div className="error-boundary-content">
                                <p>{t('system.message.crash')}</p>
                                <p>{t('system.message.try_again')}</p>
                                <button onClick={() => { this.setState({ hasError: false }) }}>{t('system.button.reload')}</button>
                            </div>
                        </div>
                    )}
                </Translation>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;