import { AreaCodeType, RankTypeType, ILottBettingRequest, IAuthRegisterRequest, IPhoneVerifyRequest } from '../domain';
import { ApiHelper } from '../helper/api.helper';

// ===範例===
// const auth = {
//     demoGet: () => ApiHelper.instance.authInstance.get('SomeApiPath'),
//     demoGetParams: (data: any) => ApiHelper.instance.authInstance.get('SomeApiPath', { params: data }), // 範例：GET帶有query params
//     demoGetParamsHeader: (data: any) => ApiHelper.instance.authInstance.get('SomeApiPath', { params: data, headers: { moduleId: 'GAMELO3' } }), // 範例：GET帶有query params且額外添加headers
//     demoPost: (data: any) => ApiHelper.instance.authInstance.post('SomeApiPath', data) // 範例：post帶有data
//     demoPostHeader: (data: any) => ApiHelper.instance.authInstance.post('SomeApiPath', data, { headers: {} }) // 範例：post帶有data及自訂header
// }

export const api = {
    // auth, // 將上方定義的物件透過此api物件統一對外
}