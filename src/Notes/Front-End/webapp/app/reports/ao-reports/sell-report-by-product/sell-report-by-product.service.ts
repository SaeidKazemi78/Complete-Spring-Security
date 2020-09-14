import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {SellReportByProduct, SellReportByProductRequest} from './sell-report-by-product.model';

export type EntityResponseType = HttpResponse<SellReportByProduct>;

@Injectable()
export class SellReportByProductService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/ao-reports/sell-report-by-products';

    constructor(private http: HttpClient) { }

    query(req?: SellReportByProductRequest): Observable<HttpResponse<SellReportByProduct[]>> {
        return this.http.post<SellReportByProduct[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<SellReportByProduct[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<SellReportByProduct[]>): HttpResponse<SellReportByProduct[]> {
        const jsonResponse: SellReportByProduct[] = res.body;
        const body: SellReportByProduct[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SellReportByProduct.
     */
    private convertItemFromServer(sellReportByProduct: SellReportByProduct): SellReportByProduct {
        const copy: SellReportByProduct = Object.assign({}, sellReportByProduct);
        return copy;
    }
}
