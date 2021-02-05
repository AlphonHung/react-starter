export const StorageKeys = {
    Auth: {
        AuthData: 'AUTH/AuthData', // User主要驗證資訊
        CurrentUser: 'AUTH/CURRENT_USER' // 已登入的user
    },
    System: {
        Locale: 'SYSTEM/LOCALE', // 目前語言
        MessagingToken: 'SYSTEM/MESSAGING_TOKEN' // FCM推播token
    }
}