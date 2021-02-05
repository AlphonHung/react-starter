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
    }
}