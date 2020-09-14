import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../app.constants';
import {Observable} from 'rxjs/Rx';
import {CookieService} from 'ngx-cookie';
import {MellatPosSale, MellatPosSaleResponse} from './mellat-pos.model';


@Injectable()
export class MellatPosService {
    constructor(private http: HttpClient,
                private cookieService: CookieService,
    ) {
    }


    sale2(url, posSale: MellatPosSale): Observable<HttpResponse<MellatPosSaleResponse>> {
        console.log('Access-Control-Allow-Headers');
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Methods', 'POST, OPTIONS');
        headers.append('Access-Control-Allow-Origin', '*');

        return this.http.post<MellatPosSaleResponse>(url + '/bpmpospc/service', posSale, {observe: 'response', headers});
    }

    sale(url, posSale: MellatPosSale): Observable<HttpResponse<MellatPosSaleResponse>> {
        return this.http.post<MellatPosSaleResponse>(url + '/bpmpospc/service', posSale, {observe: 'response'});
    }

    save(account: any): Observable<HttpResponse<any>> {
        return this.http.post(SERVER_API_URL + 'niopdcuaa/api/account', account, {observe: 'response'});
    }
}
