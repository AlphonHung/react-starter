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
            add: "Add"
        }
    },
    todo: {
        message: {
            current_todo: "Current Todo",
            none_todo: "Nothing to be done."
        }
    }
}

export default en_US;
