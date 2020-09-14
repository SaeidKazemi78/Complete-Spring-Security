import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {ReceiptNoDetail, ReceiptNoDetailRequest} from './receipt-no-detail.model';

export type EntityResponseType = HttpResponse<ReceiptNoDetail>;

@Injectable()
export class ReceiptNoDetailService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/ao-reports/receipt-no-details';

    constructor(private http: HttpClient) { }

    query(req?: ReceiptNoDetailRequest): Observable<HttpResponse<ReceiptNoDetail[]>> {
        return this.http.post<ReceiptNoDetail[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<ReceiptNoDetail[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<ReceiptNoDetail[]>): HttpResponse<ReceiptNoDetail[]> {
        const jsonResponse: ReceiptNoDetail[] = res.body;
        const body: ReceiptNoDetail[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ReceiptNoDetail.
     */
    private convertItemFromServer(receiptNoDetail: ReceiptNoDetail): ReceiptNoDetail {
        const copy: ReceiptNoDetail = Object.assign({}, receiptNoDetail);
        return copy;
    }
}
