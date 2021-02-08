import { StorageHelper } from './storage.helper';
import { I18nHelper } from './i18n.helper';
import { ApiHelper } from './api.helper';

const helper = {
    storage: StorageHelper.instance,
    i18n: I18nHelper.instance,
    api: ApiHelper.instance,
}

export default helper;