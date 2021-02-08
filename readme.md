# TCG React Starter
專案用途：以react hooks、typescript環境，整合常用套件與配置，快速開發react web app。
建立新專案時可直接複製本專案內容，另外建立新的git repo。

## 文章列表
* [Domain](#Domain)
* [View](#View)
* [Component](#Component)
* [i18n](#i18n)
* [style](#Style)
* [Redux](#Redux)
* [Api](#Api)
* [Hooks](#Hooks)

---
## Domain
存放interfaces與types等typescript特殊定義，開發時方便偵錯。
### interface
為確保使用到的物件格式皆相同，可於src/domain內自定義interface。若有建立新檔案，記得於src/domain/index/ts內export。
```
export interface IMyInterface {
    // 自訂物件屬性
    name: string;
    age: number;
}
```
使用interface
```
import { IMyInterface } from '~/domain';
const obj: IMyInterface = { name: "", age: 0 }
```

### types
定義單一屬性可接受的值，確保該屬性不會在開發過程中誤植例外狀況。
```
export type GenderType = 'male' | 'female';
```

---
## View
擁有一個URL的頁面組件，存放於src/views底下，命名規則：[name]View，如HomeView。

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
請參考src/components/TodoListSet.tsx

---
## i18n
多國語系以[i18next](https://react.i18next.com/)實作

### 新增語系
目前實作繁中與英文，若要新增其他語系，請依照步驟
1. 在src/i18n/index.ts內，仿照原有內容新增語系設定
2. 在src/i18n/locale底下新增語系檔
```
import { LocaleType } from './localeType';
const en_US: LocaleType = {
    ...補充文字
}
```
### 新增翻譯內容
先修改src/i18n/locale底下的localeType.ts，再修改同資料夾底下其他檔案
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
請參考LocaleSelector.tsx

---
## Style
以sass實作，scss檔案存放於src/assets/scss底下，依照使用範圍存放於各子資料夾(views: 頁面, components: 組件, shared: 全域共用)。其中shared內的scss由src/assets/scss/shared.scss統一引入，其他scss要使用shared內容時只需引入此檔案即可。
| shared | 目標 |
| :-- | :-- |
| color | 統一管理整個專案使用到的顏色 |
| animation | 自定義動畫庫與呼叫方式 |

### 建立scss
每一個組件或頁面的tsx搭配一個同名scss檔，注意每個class的上下階層關係
```
.header-navigator {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .page-link {
        padding: 0 5px;
    }
}

```
### 將scss使用至頁面或組件
```
import '~/assets/scss/components/HeaderNavigator.scss';
```
### 建立動畫
於src/assets/scss/shared/animation.scss內新增動畫
```
@keyframes example {
    from {
        color: rgb(100, 120, 120);
    }
    to {
        color: rgb(120, 80, 100);
    }
}
```
### 套用動畫
scss內引用shared.scss後，使用anim method
```
@import '../shared.scss';
.home {
    padding: 10px;
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
1. src/store/ducks/index.ts內必須export
2. src/store/rootReducer.ts內引用該duck的reducer

### sagas
當duck內定義的action有需要執行非同步作業、或延伸執行其他action時才需定義。
請直接參考專案內現有saga檔案。

新增檔案後再執行下列事項
1. src/store/sagas/index.ts內必須export
2. src/store/rootSaga.ts內引用該saga

---
## Api
本專案使用axios，src/lib/api.ts統一管理實體與定義路徑
### 定義Api
於src/lib/api.ts內，將同一類型或後端url相同分類的api集中在同一物件中，並於export的api物件中定義
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
可參考src/hooks/useI18n.ts