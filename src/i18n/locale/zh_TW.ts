import { LocaleType } from './localeType';

const zh_TW: LocaleType = {
    system: {
        message: {
            version: "版本",
            miss_translation: "查無翻譯",
            crash: "系統異常崩潰",
            try_again: "請點擊重新啟動按鈕",
            access_error: "系統存取錯誤",
            connecting: "CONNECTING",
            url_unsupported: "連結無效",
        },
        button: {
            confirm: "確定",
            cancel: "取消",
            reload: "重新整理",
            add: "新增",
            save: "存擋",
            login: "登入",
            logout: "登出",
        }
    },
    view: {
        intro: {
            production_title: "Demo產品",
            production_desc: "Demo描述，我只是個範例...",
        },
        home: {
            welcome: "Hello World 中文"
        },
    },
    component: {
        todo: {
            current_todo: "目前任務",
            none_todo: "沒有要做的事"
        }
    }
}

export default zh_TW;