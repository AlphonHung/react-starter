import produce from 'immer';

const prefix = 'SYSTEM';

export const SystemActionTypes = {
    ADD_LOADING_FLAG: `${prefix}/ADD_LOADING_FLAG`,
    REMOVE_LOADING_FLAG: `${prefix}/REMOVE_LOADING_FLAG`,
    INIT_APP: `${prefix}/INIT_APP`,
}

export interface AddLoadingFlagAction {
    type: typeof SystemActionTypes.ADD_LOADING_FLAG;
    data: string;
}

export interface RemoveLoadingFlagAction {
    type: typeof SystemActionTypes.REMOVE_LOADING_FLAG;
    data: string;
}

export interface InitAppAction {
    type: typeof SystemActionTypes.INIT_APP;
}


type SystemAction
    = AddLoadingFlagAction
    | RemoveLoadingFlagAction
    | InitAppAction;

export const SystemActionCreators = {
    /** Loading Flags */
    addLoadingFlag: (data: string): SystemAction => ({ type: SystemActionTypes.ADD_LOADING_FLAG, data }),
    removeLoadingFlag: (data: string): SystemAction => ({ type: SystemActionTypes.REMOVE_LOADING_FLAG, data }),
    /** 初始化app */
    initApp: (): SystemAction => ({ type: SystemActionTypes.INIT_APP }),
}

interface IStateType {
    loadingFlags: string[]; // 全部非同步作業的進行中flag
}

const initState: IStateType = {
    loadingFlags: [],
}

export const SystemReducer = produce((draft: IStateType, action: SystemAction) => {
    switch (action.type) {
        case SystemActionTypes.ADD_LOADING_FLAG:
            draft.loadingFlags.push((action as AddLoadingFlagAction).data);
            return;
        case SystemActionTypes.REMOVE_LOADING_FLAG:
            draft.loadingFlags = draft.loadingFlags.filter(x => x !== (action as RemoveLoadingFlagAction).data);
            return;
    }
}, initState);