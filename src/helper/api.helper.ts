import axios, { AxiosInstance } from 'axios';
import { ApiConfig } from '../config/api.config';

const basicHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

export class ApiHelper {
    private static _instance: ApiHelper;
    static get instance() {
        return this._instance || (this._instance = new this());
    }

    /** AxiosInstance */
    mainInstance: AxiosInstance;

    constructor() {
        this.mainInstance = axios.create({
            baseURL: ApiConfig.baseUrl,
            headers: basicHeaders
        });
    }

    /** Header加入Authorization */
    setAuthorizationHeader(token: string): void {
        if (this.mainInstance) {
            this.mainInstance.defaults.headers.Authorization =`Bearer ${token}`;
        }
    }
}