import produce from 'immer';
import moment from 'moment';
import { ILoginForm, IAuthData, IAuthRegisterRequest, IUserProfile } from '~/domain';

const prefix = 'AUTH';

export const AuthActionTypes = {
    CHECK_LOGIN: `${prefix}/CHECK_LOGIN`,
    REGISTER: `${prefix}/REGISTER`,
    REFRESH_TOKEN: `${prefix}/REFRESH_TOKEN`,
    TRY_LOGIN: `${prefix}/TRY_LOGIN`,
    LOGIN: `${prefix}/LOGIN`,
    FAKE_LOGIN: `${prefix}/FAKE_LOGIN`,
    LOGOUT: `${prefix}/LOGOUT`,
    GET_USER_PROFILE: `${prefix}/GET_USER_PROFILE`,
    GET_USER_PROFILE_SUCCESS: `${prefix}/GET_USER_PROFILE_SUCCESS`,
    PATCH_USER_PROFILE: `${prefix}/PATCH_USER_PROFILE`,
}

export interface AuthCheckLoginAction {
    type: typeof AuthActionTypes.CHECK_LOGIN;
}

export interface AuthRegisterAction {
    type: typeof AuthActionTypes.REGISTER;
    data: IAuthRegisterRequest;
}

export interface AuthRefreshTokenAction {
    type: typeof AuthActionTypes.REFRESH_TOKEN;
    data: IAuthData;
}

export interface AuthTryLoginAction {
    type: typeof AuthActionTypes.TRY_LOGIN;
    data: ILoginForm;
}
export interface AuthLoginAction {
    type: typeof AuthActionTypes.LOGIN;
    data: IAuthData;
}
export interface AuthFakeLoginAction {
    type: typeof AuthActionTypes.FAKE_LOGIN;
}
export interface AuthLogoutAction {
    type: typeof AuthActionTypes.LOGOUT;
}

export interface AuthGetUserProfileAction {
    type: typeof AuthActionTypes.GET_USER_PROFILE;
}
export interface AuthGetUserProfileSuccessAction {
    type: typeof AuthActionTypes.GET_USER_PROFILE_SUCCESS;
    data: any;
}

export interface AuthPatchUserProfileAction {
    type: typeof AuthActionTypes.PATCH_USER_PROFILE;
    data: any;
    callback?: () => void;
}

type AuthAction
    = AuthCheckLoginAction
    | AuthRegisterAction
    | AuthRefreshTokenAction
    | AuthTryLoginAction
    | AuthLoginAction
    | AuthFakeLoginAction
    | AuthLogoutAction
    | AuthGetUserProfileAction
    | AuthGetUserProfileSuccessAction
    | AuthPatchUserProfileAction;

export const AuthActionCreators = {
    /** 檢查本地登入資料 */
    checkLogin: (): AuthAction => ({ type: AuthActionTypes.CHECK_LOGIN }),
    /** 一鍵註冊 */
    register: (data: IAuthRegisterRequest): AuthAction => ({ type: AuthActionTypes.REGISTER, data }),
    /** 刷新Token */
    refreshToken: (data: IAuthData): AuthAction => ({ type: AuthActionTypes.REFRESH_TOKEN, data }),
    /** 輸入帳密嘗試登入 */
    tryLogin: (data: ILoginForm): AuthAction => ({ type: AuthActionTypes.TRY_LOGIN, data }),
    /** 驗證帳密成功，更新App全域驗證資料 */
    login: (data: IAuthData): AuthAction => ({ type: AuthActionTypes.LOGIN, data }),
    /** 開發用：直接塞入假的驗證資料 */
    fakeLogin: (): AuthAction => ({ type: AuthActionTypes.FAKE_LOGIN }),
    /** 登出 */
    logout: (): AuthAction => ({ type: AuthActionTypes.LOGOUT }),
    /** 取得登入者Profile */
    getUserProfile: (): AuthAction => ({ type: AuthActionTypes.GET_USER_PROFILE }),
    getUserProfileSuccess: (data: any): AuthAction => ({ type: AuthActionTypes.GET_USER_PROFILE_SUCCESS, data }),
    /** 更新使用者資訊 */
    patchUserProfile: (data: any, callback?: () => void): AuthAction => ({ type: AuthActionTypes.PATCH_USER_PROFILE, data, callback }),
}

interface IStateType {
    authData?: IAuthData;
    userProfile?: IUserProfile;
}

const initState: IStateType = {
    authData: undefined,
    userProfile: undefined,
}

export const AuthReducer = produce((draft: IStateType, action: AuthAction) => {
    switch (action.type) {
        case AuthActionTypes.LOGIN: {
            draft.authData = (action as AuthLoginAction).data;
            return;
        }
        case AuthActionTypes.FAKE_LOGIN: {
            const fakeAuth: IAuthData = {
                access_token: "QQ123",
                expired_at: Date.now() + (1000 * 60 * 60 * 24),
                refresh_token: "RR123",
                user: {
                    id: "Akjdfa15w",
                    userName: "develper",
                    displayName: "Developer R",
                    email: "dev@gmail.com"
                }
            }
            draft.authData = fakeAuth;
            return;
        }
        case AuthActionTypes.LOGOUT: {
            draft.authData = undefined;
            return;
        }
        case AuthActionTypes.GET_USER_PROFILE_SUCCESS: {
            draft.userProfile = (action as AuthGetUserProfileSuccessAction).data;
            return;
        }
    }
}, initState);

