import { LocaleType } from './localeType';

const en_US: LocaleType = {
    system: {
        message: {
            version: "Version",
            miss_translation: "No Translation",
            crash: "System Crashed",
            try_again: "Please try again.",
            access_error: "Access Error",
            connecting: "CONNECTING",
            url_unsupported: "URL unsupported",
        },
        button: {
            confirm: "Confirm",
            cancel: "Cancel",
            reload: "Reload",
            add: "Add",
            save: "Save",
            login: "Login",
            logout: "Logout",
        }
    },
    view: {
        intro: {
            production_title: "Demo Production",
            production_desc: "Demo Description, this is a...",
        },
        home: {
            welcome: "Hello World English"
        },
    },
    component: {
        todo: {
            current_todo: "Current Todo",
            none_todo: "Nothing to be done."
        }
    }
}

export default en_US;
