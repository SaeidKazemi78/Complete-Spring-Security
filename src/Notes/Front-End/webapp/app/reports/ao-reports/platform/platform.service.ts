import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {Platform, PlatformRequest} from './platform.model';

export type EntityResponseType = HttpResponse<Platform>;

@Injectable({providedIn: 'root'})
export class PlatformService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/ao-reports/platforms';

    constructor(private http: HttpClient) { }

    query(req?: PlatformRequest): Observable<HttpResponse<Platform[]>> {
        return this.http.post<Platform[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<Platform[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<Platform[]>): HttpResponse<Platform[]> {
        const jsonResponse: Platform[] = res.body;
        const body: Platform[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Platform.
     */
    private convertItemFromServer(platform: Platform): Platform {
        const copy: Platform = Object.assign({}, platform);
        return copy;
    }
}
