/** 登入帳密 */
export interface ILoginForm {
    account: string;
    password: string;
}

export interface IUser {
    id: string;
    userName: string;
    displayName: string;
    email: string;
}

/** 使用者驗證資訊 */
export interface IAuthData {
    access_token: string;
    expired_at: number;
    refresh_token: string;
    user: IUser;
}

/** 註冊帳號參數 */
export interface IAuthRegisterRequest {
    key?: string; //
    code?: string; // 邀請碼
}

/** 使用者Profile */
export interface IUserProfile {
    invited_codes: { code: string, type: string }[]; // 邀請碼
    oauth: any; // 綁定過的Oauth
    user: IUser;
}