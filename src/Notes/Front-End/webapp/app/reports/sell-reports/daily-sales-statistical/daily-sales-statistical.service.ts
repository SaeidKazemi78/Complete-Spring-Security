import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {DailySalesStatistical, DailySalesStatisticalRequest} from './daily-sales-statistical.model';

export type EntityResponseType = HttpResponse<DailySalesStatistical>;

@Injectable()
export class DailySalesStatisticalService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/daily-sales-statistical';

    constructor(private http: HttpClient) { }

    query(req?: DailySalesStatisticalRequest): Observable<HttpResponse<DailySalesStatistical[]>> {
        return this.http.post<DailySalesStatistical[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<DailySalesStatistical[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<DailySalesStatistical[]>): HttpResponse<DailySalesStatistical[]> {
        const jsonResponse: DailySalesStatistical[] = res.body;
        const body: DailySalesStatistical[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DailySales.
     */
    private convertItemFromServer(dailySalesStatistical: DailySalesStatistical): DailySalesStatistical {
        const copy: DailySalesStatistical = Object.assign({}, dailySalesStatistical);
        return copy;
    }
}
