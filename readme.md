# TCG React Starter
專案用途：以react hooks、typescript環境，整合常用套件與配置，快速開發react web app。
前置知識：[React Function Component](https://zh-hant.reactjs.org/docs/components-and-props.html)、[React Hooks](https://zh-hant.reactjs.org/docs/hooks-intro.html)。
使用方式：建立新專案時可直接複製本專案內容，另外建立新的git repo。
本專案以node版本**v12.14.1**建立

## 文章列表
* [Domain](#Domain)
* [Router](#Router)
* [View](#View)
* [Component](#Component)
* [i18n](#i18n)
* [Image和Color](#Image和Color)
* [style](#Style)
* [Redux](#Redux)
* [Api](#Api)
* [Hooks](#Hooks)
* [SEO](#SEO)

---
## Domain
存放**interfaces**與**types**等typescript特殊定義，開發時方便偵錯。
### interface
用途：確保物件格式一致
為確保使用到的物件格式皆相同，可於```src/domain```內自定義interface。若有建立新檔案，記得於```src/domain/index/ts```內export。
```
export interface IDemoUser {
    // 自訂物件屬性
    name: string;
    age: number;
    gender: GenderType; // 請參考下方types說明
    remark?: string; // 屬性加上問號代表該屬性可為undefined
}
```

### types
用途：確保屬性值符合指定範圍
定義單一屬性可接受的值，讓該屬性不會在開發過程中誤植例外狀況。
```
export type GenderType = "male" | "female";
```
### 使用interface與type
```
import { IDemoUser } from '~/domain';
const demo: IDemoUser = {
    name: "John Doe",
    age: 20,
    gender: "male" // 若此處不為指定的"male"或"female"即報錯
}
```

---
## Router
網站導頁使用[React Router Dom](https://reactrouter.com/web/example/basic)
路由根節點```src/routers/MainRoute.tsx```
路由設定檔```src/routers/RouteConfig.ts```

### 路由驗證登入
實作於```src/routers/SingleRoute.tsx```，依據路由設定檔的**auth、authRedirect、noAuthRedirect**等屬性決定render頁面組件或redirect。

### 動態加載頁面
Router使用React提供的[code spliting](https://zh-hant.reactjs.org/docs/code-splitting.html)來動態載入組件，目標為**不常使用或較龐大易影響載入速度的組件**。
Suspense與lazy必須互相搭配，其中Suspense的fallback屬性為未載入完成前的顯示內容。可參考```src/routers/HeaderRoute.tsx```

### 路由共享組件
1. 在```src/routers/RouteConfig.ts```新增所有共享組件的路由。
2. 建立新的實作路由檔，引用1設定的路由並加入需共享的組件，可參考```src/routers/HeaderRoute.tsx```。
3. 將2的檔案引入根節點```src/routers/MainRoute.tsx```或其他子路由。

---
## View
擁有一個URL的頁面組件，存放於src/views底下，命名規則：**[name]View**，如HomeView。

### 建立方式(以TodoView為範例)
1. 在views folder下建立新的tsx
```
import React from 'react';
import TodoListSet from '~/components/TodoListSet'

/** 單純用來示範router的view */
const TodoView = () => (
    <div>
        <div className="display-3">展示Todo</div>
        <TodoListSet />
    </div>
)

export default TodoView;
```
2. 在```src/routers/RouteConfig.ts```內新增一條路由設定
```
{
    path: '/todo',
    component: lazy(() => import('~/views/TodoView')),
    auth: true,
},
```
3. 在想要顯示連結的地方(本範例為HeaderNavigator.tsx)，使用react-router-dom的Link組件，to屬性指定為第二點的path
```
import { Link } from 'react-router-dom';
<Link className="page-link" to="/todo">Todo</Link>
// 編譯後結果 <a class="page-link" href="#/todo">Todo</a>
```

---
## Component
參考檔案：```src/components/TodoListSet.tsx```
存放除了views以外的組件，相同類型或目的的組件可建置子資料夾方便管理。
1. 請盡量使每個組件目的單純化，保持每個檔案不超過300行程式碼為標準。
2. 組件若非特殊狀況(如ErrorBoundary)，否則請盡量使用React的**functional component**及**hooks**實作。
3. 在組件中盡量不使用render function的方式產生子組件，否則網站效能會受到影響。
>組件效能優化可適當使用React提供的memo, useMemo, useCallback

---
## i18n
多國語系以[i18next](https://react.i18next.com/)實作

### 初始化
請參考```src/hooks/useI18n.ts```

### 預設語系
可於```src/config/locale.config.ts```修改。

### 新增語系
目前實作繁中與英文，若要新增其他語系，請依照步驟
1. 在```src/i18n/index.ts```內，仿照原有內容新增語系設定
2. 在```src/i18n/locale```底下新增語系檔
```
import { LocaleType } from './localeType';
const en_US: LocaleType = {
    ...補充文字
}
```

### 新增翻譯內容
1. 在```src/i18n/locale/localeType.ts```內的物件新增字串屬性。
2. 修改```src/i18n/locale```資料夾底下其他檔案，依照1的定義調整內容。

### 使用翻譯文字
利用react-i18next提供的hooks，取得並使用翻譯method t，參數即為localeType.ts內定義的物件路徑
```
import { useTranslation } from 'react-i18next';
const DemoComponent = () => {
    const { t } = useTranslation();
    return (
        <div>{t("system.button.add")}</div>
    )
}
```
例外：無法使用hooks的場合，可參考```src/views/ErrorBoundary.tsx```
### 切換語系
請參考```/sr/components/LocaleSelector.tsx```

---
## Image&Color
圖片存放路徑：src/assets/img，圖片與顏色統一由```src/assets/scss/variable.scss```管理，請勿在組件和其他scss中直接指定靜態資源路徑或色碼。
[參考網站](https://medium.com/d-d-mag/%E4%BD%A0%E5%8F%AF%E8%83%BD%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84-sass-%E6%8A%80%E5%B7%A7-c97d4d5e0fc4)

### 新增圖片與顏色
```
---variable.scss---
$custom-colors: (
    text-demo: rgb(30, 30, 30),
);
$images: (
    icon-demo: url("../../img/icon/common/demo.png"),
);

```

### 調整bootstrap預設顏色
```
---variable.scss---
$theme-colors: (
    "primary": rgb(200, 150, 25),
);
```

### 圖片使用方式
在css設為背景
```
@import '../variable.scss';
.todo-demo {
    // 從variable.scss的$images中取得demo圖片
    background-image: map-get($images, demo); 
}
```
### 顏色使用方式
```
@import '../variable.scss';
.todo-demo {
    // 從variable.scss的$colors中取得demo文字色
    color: map-get($colors, text-demo);
}
```

---
## Style
以sass實作，在```src/assets/scss/App.scss```引入bootstrap style。
本專案已安裝套件[React-Bootstrap](https://react-bootstrap.github.io/components/alerts/)，可自行選擇使用組件。

scss檔案存放於```src/assets/scss```底下，依照使用範圍存放於各子資料夾
- views：頁面獨有scss。
- components：組件獨有scss。
- shared：scss共用的mixin，記載重複性高的css配置。
- global：全網站共用className。

shared內的scss由```src/assets/scss/shared.scss```統一引入，其他scss要使用shared內容時只需引入此檔案即可。
```
@import '../shared.scss';
.header-navigator {
    @include flex-row(()); // 使用shared內提供的mixin
}
```

### 判斷度量單位是否需隨螢幕大小變化
為使不同螢幕大小有相近的顯示效果，使用css調整度量屬性時先判斷是否需依螢幕大小而變，若為是則盡量以rem實作，減少使用px這種固定值。
rem的基礎值由```src/lib/rem.js```實作，會在html根節點設置font-style，以作為rem的參考值。

### 將scss使用至頁面或組件
```
import '~/assets/scss/components/HeaderNavigator.scss';
```
### 建立動畫
於```src/assets/scss/shared/animation.scss```內新增動畫
```
@keyframes example {
    from {
        color: map-get($colors, text-basic);
    }
    to {
        color: map-get($colors, text-sub);
    }
}
```
### 套用動畫
scss內引用shared.scss後，使用anim mixin method
```
@import '../shared.scss';
.home {
    padding: 0.1rem;
    @include anim(( name: example, duration: 1s, iteration-count: infinite, direction: alternate ))
    // 上面一行效果等同於
    // animation-name: example;
    // animation-duration: 1s;
    // animation-iteration-count: infinite;
    // animation-direction: alternate;
}
```

---
## Redux
本專案單向資料流以redux實作，所有redux相關程式存放於src/store內

### ducks
定義action type, action interface, reducer, initial state等資訊，提供給redux-saga或組件使用，可參考專案內現有的duck，確保每一項皆定義完成。

| duck內容 | 目標 |
| :-- | :-- |
| ActionTypes | 不重複字串，用以區分action類型 |
| Action interface | 定義每個action返回的type與參數 |
| ActionCreators | 讓組件或saga呼叫的method |
| initState | 初始資料 |
| reducer | 依據action.type決定如何修改資料 |

新增檔案後再執行下列事項
1. ```src/store/ducks/index.ts```內必須export
2. ```src/store/rootReducer.ts```內引用該duck的reducer

### sagas
當duck內定義的action有需要執行非同步作業、或延伸執行其他action時才需定義。
請直接參考專案內現有saga檔案。

新增檔案後再執行下列事項
1. ```src/store/sagas/index.ts```內必須export
2. ```src/store/rootSaga.ts```內引用該saga

### 範例登入驗證機制
參考檔案：```src/store/ducks/auth.duck.ts```與```src/store/sagas/auth.saga.ts```
1. 每次進入網站或重新整理頁面，觸發auth action的checkLogin方法。
2. 承1，若未登入，則auth state的authData保持undefined直到登入成功。
3. 輸入帳密送出，應觸發auth action的tryLogin方法，將帳密送給後端api驗證。
4. 承3，驗證成功後，觸發auth action的login方法執行下列事項，router將自動刷新。
    - 改變api的驗證資訊
    - 本地儲存驗證資料
    - 改變auth state的authData
5. 未登出狀態重新進入網站或重新整理，一樣觸發auth action的checkLogin方法，確認有驗證資料後直接觸發auth action的refresh token方法。
6. 依照更新token結果，決定使用新舊token，並進入4。

---
## Api
本專案使用套件[axios](https://www.npmjs.com/package/axios)呼叫api，由```src/lib/api.ts```統一管理實體與定義路徑
### 定義Api
於```src/lib/api.ts```內，將同一類型或後端url相同分類的api集中在同一物件中，並於export的api物件中定義
```
const auth = {
    login: (data: { account: string, password: string }) => mainInstance.post('some path', data),
    changePassword: (data: { newPsw: string }) => mainInstance.post('some path', data)
}
export const api = {
    auth,
}
```
### 呼叫Api
1. 在redux-saga內呼叫
使用時機：api的返回內容將影響到redux state
使用方式：搭配redux預先定義好的action使用，在xx.saga.ts內以redux-saga/effects提供的方法呼叫
```
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { AuthActionCreators, SystemActionCreators, AuthTryLoginAction } from '../ducks';
/** 驗證帳密嘗試登入 */
function* tryLogin(action: AuthLoginAction) {
    yield put(SystemActionCreators.addLoadingFlag(action.type));
    const res = yield call(api.auth.tryLogin, action.data); // 呼叫api並等待結果
    if (res?.data?.code === "00") {
        yield put(AuthActionCreators.login(res.data.data));
    } else {
        // 顯示錯誤訊息
    }
    yield put(SystemActionCreators.removeLoadingFlag(action.type));
}
export function* TodoSaga() {
    yield all([
        takeEvery(AuthActionTypes.TRY_LOGIN, tryLogin),
    ])
}
```
2. 直接在組件內呼叫
使用時機：api僅作為暫時資料呈現或其他功能，不影響redux state
使用方式：在組件內引用api.ts並直接執行該api
```
import React, { useState, useEffect } from 'react';
import api from '~/lib/api';
const demoComponent = () => {
    const [data, setData] = useState("");
    useEffect(() => {
        api.auth.demoGet()
            .then((res) => { setData(res); })
            .catch((err) => { do something })
            .finally(() => { do something })
    }, [])
    return (
        <div>{data}</div>
    )
}
```

---
## Hooks
以[Custom Hook Pattern](https://www.morrisctech.com/content/2019/11/30/react_custom_hook_test/)撰寫可自帶狀態、可獨立執行的邏輯。每次使用該自訂hook時，皆為獨立個體。
使用時機：無畫面需求，可被重複使用的純邏輯。
可參考```src/hooks/useI18n.ts```

---
## SEO
[參考網站](https://yakimhsu.com/project/project_w6_HTML_SEO.html)
網站開發完成後，在```src/assets/index.html```裡面加上title, description, og標籤等內容