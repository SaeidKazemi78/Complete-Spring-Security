import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {Metre, MetreRequest} from './metre.model';

export type EntityResponseType = HttpResponse<Metre>;

@Injectable()
export class MetreService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/ao-reports/metres';

    constructor(private http: HttpClient) { }

    query(req?: MetreRequest): Observable<HttpResponse<Metre[]>> {
        return this.http.post<Metre[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<Metre[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<Metre[]>): HttpResponse<Metre[]> {
        const jsonResponse: Metre[] = res.body;
        const body: Metre[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Metre.
     */
    private convertItemFromServer(metre: Metre): Metre {
        const copy: Metre = Object.assign({}, metre);
        return copy;
    }
}
