import { StorageHelper } from './storage.helper';
import { ApiHelper } from './api.helper';

const helper = {
    storage: StorageHelper.instance,
    api: ApiHelper.instance,
}

export default helper;