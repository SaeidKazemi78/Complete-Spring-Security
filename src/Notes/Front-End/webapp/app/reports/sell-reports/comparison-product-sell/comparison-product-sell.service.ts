import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import {Comparison, ComparisonRequest} from 'app/reports/sell-reports/comparison-product-sell/comparison-product-sell.model';

export type EntityResponseType = HttpResponse<Comparison>;

@Injectable()
export class ComparisonProductSellService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/comparison-product-sell';

    constructor(private http: HttpClient) { }

    query(req?: ComparisonRequest): Observable<HttpResponse<Comparison[]>> {
        return this.http.post<Comparison[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<Comparison[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<Comparison[]>): HttpResponse<Comparison[]> {
        const jsonResponse: Comparison[] = res.body;
        const body: Comparison[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Comparison.
     */
    private convertItemFromServer(Comparison: Comparison): Comparison {
        const copy: Comparison = Object.assign({}, Comparison);
        return copy;
    }
}
