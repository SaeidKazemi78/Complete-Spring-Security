import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http/src/headers';
import {HttpParams} from '@angular/common/http/src/params';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpResponse} from '@angular/common/http';
import * as c from 'crypto';

@Injectable()
export class HttpCacheService {

    constructor(private http: HttpClient) {
    }

    get<T>(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }, timerType?: 'S' | 'm' | 'H' | 'D' | 'M' | 'Y', txId?: string): Observable<HttpResponse<T>> {
        console.log('load:' + url);
        txId = txId ? txId : url;
        const txIdsStorage: string | string[] = localStorage.getItem(txId);
        let txIds = JSON.parse(txIdsStorage);
        if (!txIds) {
            txIds = [];
        }

        const date = new Date();
        let dateStr = ',';
        if (timerType === 'S') {
            dateStr += date.getFullYear() + date.getMonth() + date.getDay() + date.getHours() + date.getMinutes() + date.getSeconds();
            date.setSeconds(date.getSeconds() + 1);
        } else if (timerType === 'm') {
            dateStr += date.getFullYear() + date.getMonth() + date.getDay() + date.getHours() + date.getMinutes();
            date.setMinutes(date.getMinutes() + 1);
        } else if (timerType === 'H') {
            dateStr += date.getFullYear() + date.getMonth() + date.getDay() + date.getHours();
            date.setHours(date.getHours() + 1);
        } else if (timerType === 'D') {
            dateStr += date.getFullYear() + date.getMonth() + date.getDay();
            date.setHours(date.getHours() + 24);
        } else if (timerType === 'M') {
            dateStr += date.getFullYear() + date.getMonth();
            date.setMonth(date.getMonth() + 1);
        } else if (timerType === 'Y') {
            dateStr += date.getFullYear();
            date.setFullYear(date.getFullYear() + 1);
        }

        const hashStr = url + ',' + JSON.stringify(options) + dateStr;
        const md5 = c.createHash('md5').update(hashStr).digest('hex');

        const locationCacheStr = localStorage.getItem(md5);
        const locationCache = JSON.parse(locationCacheStr);
        if (locationCache) {
            console.log('load from cache:' + url);
            return Observable.of(new HttpResponse({
                body: locationCache.data
            }));
        }

        return this.http.get<T>(url, options).map(value => {
            const newTxIds = [];
            for (const txIdsKey of txIds) {
                const item = JSON.parse(localStorage.getItem(txIdsKey));
                if (item && (!item.expiry || new Date(item.expiry) < new Date())) {
                    localStorage.removeItem(txIdsKey);
                } else if (item) {
                    newTxIds.push(txIdsKey);
                }
            }
            localStorage.setItem(md5, JSON.stringify({expiry: date, data: value.body}));
            newTxIds.push(md5);
            localStorage.setItem(txId, JSON.stringify(newTxIds));
            return value;
        });
    }

    reset(txId?: string) {
        console.log('reset:' + txId);
        const txIdsStorage: string | string[] = localStorage.getItem(txId);
        let txIds = JSON.parse(txIdsStorage);
        if (!txIds) {
            txIds = [];
        }
        for (const txIdsKey of txIds) {
            localStorage.removeItem(txIdsKey);
            localStorage.removeItem(txId);
        }
    }
}
