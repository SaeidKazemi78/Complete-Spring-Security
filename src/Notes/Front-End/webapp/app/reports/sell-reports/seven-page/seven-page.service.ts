import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {SevenPage, SevenPageRequest} from './seven-page.model';

export type EntityResponseType = HttpResponse<SevenPage>;

@Injectable()
export class SevenPageService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/seven-page';

    constructor(private http: HttpClient) { }

    query(req?: SevenPageRequest): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.resourceUrl, req, { observe: 'response' });
    }

    private convertArrayResponse(res: HttpResponse<SevenPage[]>): HttpResponse<SevenPage[]> {
        const jsonResponse: SevenPage[] = res.body;
        const body: SevenPage[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Consumption.
     */
    private convertItemFromServer(consumption: SevenPage): SevenPage {
        const copy: SevenPage = Object.assign({}, consumption);
        return copy;
    }
}
