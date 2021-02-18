# TCG React Starter
專案用途：以react hooks、typescript環境，整合常用套件與配置，快速開發react web app。
建立新專案時可直接複製本專案內容，另外建立新的git repo。
本專案以node版本**v12.14.1**建立

## 文章列表
* [Domain](#Domain)
* [View](#View)
* [Component](#Component)
* [i18n](#i18n)
* [Image和Color](#Image和Color)
* [style](#Style)
* [Redux](#Redux)
* [Api](#Api)
* [Hooks](#Hooks)

---
## Domain
存放interfaces與types等typescript特殊定義，開發時方便偵錯。
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
## View
擁有一個URL的頁面組件，存放於src/views底下，命名規則：```[name]View```，如HomeView。

### 建立方式
1. 在views folder下建立新的tsx
```
import React from 'react';

const HomeView = () => {
    return (
        <div className="home">
            <h1>Hello World</h1>
        </div>
    );
}
export default HomeView;
```
2. 在routers folder下的routes.tsx內新增一條route，自定義path
```
import HomeView from '~/views/HomeView';
<Route path="/home" component={HomeView} />
```
3. 在想要顯示連結的地方(本範例為HeaderNavigator.tsx)，使用react-router-dom的Link組件，to屬性指定為第二點的path
```
import { Link } from 'react-router-dom';
<Link className="page-link" to="/home">Home</Link>
```

---
## Component
存放除了views以外的組件，相同類型或目的的組件可建置子資料夾方便管理。開發組件時，請盡量使每個組件目的單純化，保持每個檔案不超過300行程式碼為標準。
請參考```src/components/TodoListSet.tsx```

---
## i18n
多國語系以[i18next](https://react.i18next.com/)實作

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
先修改```src/i18n/locale```底下的localeType.ts，再修改同資料夾底下其他檔案
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
以sass實作，並引入bootstrap。

scss檔案存放於```src/assets/scss```底下，依照使用範圍存放於各子資料夾(views: 頁面, components: 組件, shared: 全域共用)。其中shared內的scss由```src/assets/scss/shared.scss```統一引入，其他scss要使用shared內容時只需引入此檔案即可。

若遇重複性高的css配置，請盡量使用sass提供的mixin功能，可參考```src/assets/scss/shared/mixin.scss```。

### 判斷度量單位是否需隨螢幕大小變化
為使不同螢幕大小有相近的顯示效果，使用css調整度量屬性時先判斷是否需依螢幕大小而變，若為是則盡量以rem實作，減少使用px這種固定值。
rem的基礎值由```src/lib/rem.js```實作。

### 建立scss
每一個組件或頁面的tsx搭配一個同名scss檔，注意每個class的上下階層關係
```
.header-navigator {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .page-link {
        padding: 0 0.05rem;
    }
}

```
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

---
## Api
本專案使用axios，```src/lib/api.ts```統一管理實體與定義路徑
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
1. redux-saga
使用時機：api的返回內容將影響到redux state
使用方式：搭配redux預先定義好的action使用，在xx.saga.ts內以redux-saga/effects提供的方法呼叫
```
import { takeEvery, put, call, all } from 'redux-saga/effects';
function* login(action: LoginAction) {
    const res = yield call(api.auth.login, action.data);
    if (res.state === 200) { // 判斷方式依實際api為準
        // 登入成功
    } else {
        // 登入失敗
    }
}
export function* TodoSaga() {
    yield all([
        takeEvery(AuthActionTypes.LOGIN, login),
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