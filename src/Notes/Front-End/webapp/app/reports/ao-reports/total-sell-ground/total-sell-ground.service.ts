import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {TotalSellGround, TotalSellGroundRequest} from './total-sell-ground.model';

export type EntityResponseType = HttpResponse<TotalSellGround>;

@Injectable()
export class TotalSellGroundService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/ao-reports/total-sell-grounds';

    constructor(private http: HttpClient) { }

    query(req?: TotalSellGroundRequest): Observable<HttpResponse<TotalSellGround[]>> {
        return this.http.post<TotalSellGround[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<TotalSellGround[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<TotalSellGround[]>): HttpResponse<TotalSellGround[]> {
        const jsonResponse: TotalSellGround[] = res.body;
        const body: TotalSellGround[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TotalSellGround.
     */
    private convertItemFromServer(totalSellGround: TotalSellGround): TotalSellGround {
        const copy: TotalSellGround = Object.assign({}, totalSellGround);
        return copy;
    }
}
