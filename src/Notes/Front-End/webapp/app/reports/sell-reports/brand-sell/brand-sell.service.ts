import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import { BrandSellRequest } from './brand-sell.model';

@Injectable()
export class BrandSellService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/brand-sell';

    constructor(private http: HttpClient) { }

    query(req?: BrandSellRequest): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<any>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<any>): HttpResponse<any> {
        const jsonResponse: any[] = res.body;
        const body: any[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to detailsBuy.
     */
    private convertItemFromServer(detailsBuy: any): any {
        const copy: any = Object.assign({}, detailsBuy);
        return copy;
    }
}
