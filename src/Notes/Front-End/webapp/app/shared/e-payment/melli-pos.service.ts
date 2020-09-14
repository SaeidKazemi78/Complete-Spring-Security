import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../app.constants';
import {MelliPosDevice, PosInfo, MelliPosSale, MelliPosSaleResponse} from './melli-pos.model';
import {Observable} from 'rxjs/Rx';
import {CookieService} from 'ngx-cookie';

@Injectable()
export class MelliPosService {
    constructor(private http: HttpClient,
                private cookieService: CookieService,
    ) {
    }

    getInfo(url): Observable<PosInfo> {
        return Observable.fromPromise(new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if (xhr) {
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.response));
                        } else {
                            reject(xhr.response);
                        }
                    }
                };
            }
            xhr.open('GET', url + '/api/GetInfo', true);
            xhr.send();
        }));
    }
 /*
    getInfo(ip): Observable<HttpResponse<PosInfo>> {
        return this.http.get<PosInfo>(ip + '/api/GetInfo', {observe: 'response'});
    }
*/
    getDevices(ip): Observable<HttpResponse<MelliPosDevice[]>> {
        return this.http.get<MelliPosDevice[]>(ip + '/api/GetDevices/0/0', {observe: 'response'});
    }

    /*    sale(ip, posSale: MelliPosSale): Observable<any> {
            return this.http.post<any>(ip + '/api/Sale', posSale, {observe: 'body'});
        }

        create(ip, posSale: MelliPosSale) {
            const copy = this.convert(posSale);
            this.callOtherDomain(ip + '/api/Sale', copy);
        }*/

    sale(url, posSale: MelliPosSale): Observable<MelliPosSaleResponse> {
        return Observable.fromPromise(new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const bodyJ = JSON.stringify(posSale);
            if (xhr) {
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.response));
                        } else {
                            reject(xhr.response);
                        }
                    }
                };
            }
            xhr.open('POST', url + '/api/Sale', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(bodyJ);
        }));
    }

    save(account: any): Observable<HttpResponse<any>> {
        return this.http.post(SERVER_API_URL + 'niopdcuaa/api/account', account, {observe: 'response'});
    }

    private convertResponse(res: HttpResponse<MelliPosSaleResponse>): HttpResponse<MelliPosSaleResponse> {
        const body: MelliPosSale = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MelliPosSale.
     */
    private convertItemFromServer(posSaleResponse: MelliPosSaleResponse): MelliPosSaleResponse {
        const copy: MelliPosSaleResponse = Object.assign({}, posSaleResponse);
        return copy;
    }

    /**
     * Convert a MelliPosSale to a JSON which can be sent to the server.
     */
    private convert(posSale: MelliPosSale): MelliPosSale {
        const copy: MelliPosSale = Object.assign({}, posSale);
        return copy;
    }
}
