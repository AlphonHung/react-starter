import { StorageKeys } from '../constants';

export class StorageHelper {
    private static _instance: StorageHelper;
    static get instance() {
        return this._instance || (this._instance = new this());
    }

    /** 各應用的AsyncStorage實體 */
    current = localStorage;
    /** 給外部參考用的儲存key值 */
    keys = StorageKeys;
}