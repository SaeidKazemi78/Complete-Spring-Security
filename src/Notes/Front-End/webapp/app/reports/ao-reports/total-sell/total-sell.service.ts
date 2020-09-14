import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {TotalSell, TotalSellRequest} from './total-sell.model';

export type EntityResponseType = HttpResponse<TotalSell>;

@Injectable()
export class TotalSellService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/ao-reports/total-sells';

    constructor(private http: HttpClient) { }

    query(req?: TotalSellRequest): Observable<HttpResponse<TotalSell[]>> {
        return this.http.post<TotalSell[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<TotalSell[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<TotalSell[]>): HttpResponse<TotalSell[]> {
        const jsonResponse: TotalSell[] = res.body;
        const body: TotalSell[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TotalSell.
     */
    private convertItemFromServer(totalSell: TotalSell): TotalSell {
        const copy: TotalSell = Object.assign({}, totalSell);
        return copy;
    }
}
