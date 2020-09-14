import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {DailySalesSummary, DailySalesSummaryRequest} from './daily-sales-summary.model';

export type EntityResponseType = HttpResponse<DailySalesSummary>;

@Injectable()
export class DailySalesSummaryService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/daily-sales-summary';

    constructor(private http: HttpClient) { }

    query(req?: DailySalesSummaryRequest): Observable<HttpResponse<DailySalesSummary[]>> {
        return this.http.post<DailySalesSummary[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<DailySalesSummary[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<DailySalesSummary[]>): HttpResponse<DailySalesSummary[]> {
        const jsonResponse: DailySalesSummary[] = res.body;
        const body: DailySalesSummary[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DailySalesSummary.
     */
    private convertItemFromServer(dailySalesSummary: DailySalesSummary): DailySalesSummary {
        const copy: DailySalesSummary = Object.assign({}, dailySalesSummary);
        return copy;
    }
}
