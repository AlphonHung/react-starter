/** 定義語系檔應該有的文字 */
export interface LocaleType {
    // 系統相關
    system: {
        // 系統訊息
        message: {
            version: string; // 版本號
            miss_translation: string; // 查無翻譯
            crash: string; // 異常崩潰
            try_again: string; // 請重新啟動
            access_error: string; // 存取錯誤
            connecting: string; // 連線中(呼叫api)
            url_unsupported: string; // 連結無效
        };
        // 泛用按鈕
        button: {
            confirm: string;
            cancel: string;
            reload: string;
            add: string;
            save: string;
            login: string;
            logout: string;
        };
    };
    view: {
        intro: {
            production_title: string; // 產品名稱
            production_desc: string; // 產品描述
        };
        home: {
            welcome: string;
        };
    }
    component: {
        todo: {
            current_todo: string; // 第一順位任務
            none_todo: string; // 目前無任務
        }
    }
}