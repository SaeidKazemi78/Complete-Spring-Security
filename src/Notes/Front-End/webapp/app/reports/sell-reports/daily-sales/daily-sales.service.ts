import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {DailySales, DailySalesRequest} from './daily-sales.model';

export type EntityResponseType = HttpResponse<DailySales>;

@Injectable()
export class DailySalesService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/daily-sales';

    constructor(private http: HttpClient) { }

    query(req?: DailySalesRequest): Observable<HttpResponse<DailySales[]>> {
        return this.http.post<DailySales[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<DailySales[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<DailySales[]>): HttpResponse<DailySales[]> {
        const jsonResponse: DailySales[] = res.body;
        const body: DailySales[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DailySales.
     */
    private convertItemFromServer(dailySales: DailySales): DailySales {
        const copy: DailySales = Object.assign({}, dailySales);
        return copy;
    }
}
