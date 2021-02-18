import { takeEvery, put, call, all } from 'redux-saga/effects';
import api from '~/lib/api';
import { AuthRegisterAction, AuthActionTypes, AuthActionCreators, SystemActionCreators, AuthLoginAction, AuthRefreshTokenAction, AuthPatchUserProfileAction, AuthCheckLoginAction, AuthGetUserProfileAction } from '../ducks';
import { StorageKeys } from '~/constants';

/** 檢查本地原先是否有驗證資料 */
function* checkLogin(action: AuthCheckLoginAction) {
    yield put(SystemActionCreators.addLoadingFlag(action.type));
    const authDataString = localStorage.getItem(StorageKeys.Auth.AuthData);
    if (authDataString !== null) {
        const authData = JSON.parse(authDataString);
        api.setAuthorizationHeader(authData.access_token); // 為api加上驗證資訊
        yield put(AuthActionCreators.refreshToken(authData));
    }
    yield put(SystemActionCreators.removeLoadingFlag(action.type));
}

/** 更新token，若失敗就以舊的驗證資料登入 */
function* refreshToken(action: AuthRefreshTokenAction) {
    yield put(SystemActionCreators.addLoadingFlag(action.type));
    // 待未來實作
    // const res = yield call(api.auth.refreshToken, { type: "token", token: action.data.refresh_token });
    // if (res?.data?.code === "00") {
    //     yield put(AuthActionCreators.login(res.data.data));
    // } else {
    //     yield put(AuthActionCreators.login(action.data));
    // }
    yield put(SystemActionCreators.removeLoadingFlag(action.type));
}

/** 初次登入時註冊 */
function* register(action: AuthRegisterAction) {
    yield put(SystemActionCreators.addLoadingFlag(action.type));
    // 待未來實作
    // const res = yield call(api.auth.register, action.data);
    // if (res?.data?.code === "00") {
    //     yield put(AuthActionCreators.login(res.data.data));
    // } else {
    // }
    yield put(SystemActionCreators.removeLoadingFlag(action.type));
}

/** 執行登入動作 */
function* login(action: AuthLoginAction) {
    yield put(SystemActionCreators.addLoadingFlag(action.type));
    const authData = action.data;
    api.setAuthorizationHeader(authData.access_token); // 為api加上驗證資訊
    localStorage.setItem(StorageKeys.Auth.AuthData, JSON.stringify(authData)); // 將驗證資訊紀錄至storage
    yield put(SystemActionCreators.initApp()); // 初始化APP
    yield put(AuthActionCreators.getUserProfile());
    yield put(SystemActionCreators.removeLoadingFlag(action.type));
}

/** 取得User Profile(目前profile內已含avatar相同資料) */
function* getProfile(action: AuthGetUserProfileAction) {
    yield put(SystemActionCreators.addLoadingFlag(action.type));
    // 待未來實作
    // const res = yield call(api.auth.getProfile);
    // if (res?.data?.code === "00") {
    //     yield put(AuthActionCreators.getUserProfileSuccess(res.data.data));
    // } else {
    // }
    yield put(SystemActionCreators.removeLoadingFlag(action.type));
}

/** 更新User profile */
function* patchProfile(action: AuthPatchUserProfileAction) {
    yield put(SystemActionCreators.addLoadingFlag(action.type));
    // 待未來實作
    // const res = yield call(api.auth.patchProfile, action.data);
    // if (res?.data?.code === "00") {
    //     yield put(AuthActionCreators.getUserProfile());
    //     action.callback?.();
    // } else {
    // }
    yield put(SystemActionCreators.removeLoadingFlag(action.type));
}

export function* AuthSaga() {
    yield all([
        takeEvery(AuthActionTypes.CHECK_LOGIN, checkLogin),
        takeEvery(AuthActionTypes.REFRESH_TOKEN, refreshToken),
        takeEvery(AuthActionTypes.REGISTER, register),
        takeEvery(AuthActionTypes.LOGIN, login),
        takeEvery(AuthActionTypes.GET_USER_PROFILE, getProfile),
        takeEvery(AuthActionTypes.PATCH_USER_PROFILE, patchProfile),
    ])
}