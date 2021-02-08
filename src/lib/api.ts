import axios from 'axios';
import { ApiConfig } from '~/config';

/** 基礎headers */
const basicHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

/** 自訂axios實體 */
const mainInstance = axios.create({
    baseURL: ApiConfig.baseUrl,
    headers: basicHeaders
});

/** 登入後呼叫，將驗證方式儲存於axios實體 */
const setAuthorizationHeader = (token: string) => {
    if (mainInstance) {
        mainInstance.defaults.headers.Authorization =`Bearer ${token}`;
    }
}

// ===範例===
const auth = {
    demoGet: () => mainInstance.get('SomeApiPath'),
    demoGetParams: (data: any) => mainInstance.get('SomeApiPath', { params: data }), // 範例：GET帶有query params
    demoGetParamsHeader: (data: any) => mainInstance.get('SomeApiPath', { params: data, headers: { moduleId: 'GAMELO3' } }), // 範例：GET帶有query params且額外添加headers
    demoPost: (data: any) => mainInstance.post('SomeApiPath', data), // 範例：post帶有data
    demoPostHeader: (data: any) => mainInstance.post('SomeApiPath', data, { headers: {} }) // 範例：post帶有data及自訂header
}

const api = {
    setAuthorizationHeader,
    auth, // 將上方定義的物件透過此api物件統一對外
}

export default api;