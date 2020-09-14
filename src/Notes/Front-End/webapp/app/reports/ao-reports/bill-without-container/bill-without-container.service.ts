import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {BillWithoutContainer, BillWithoutContainerRequest} from './bill-without-container.model';

export type EntityResponseType = HttpResponse<BillWithoutContainer>;

@Injectable()
export class BillWithoutContainerService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/ao-reports/bill-without-containers';

    constructor(private http: HttpClient) { }

    query(req?: BillWithoutContainerRequest): Observable<HttpResponse<BillWithoutContainer[]>> {
        return this.http.post<BillWithoutContainer[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<BillWithoutContainer[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<BillWithoutContainer[]>): HttpResponse<BillWithoutContainer[]> {
        const jsonResponse: BillWithoutContainer[] = res.body;
        const body: BillWithoutContainer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BillWithoutContainer.
     */
    private convertItemFromServer(billWithoutContainer: BillWithoutContainer): BillWithoutContainer {
        const copy: BillWithoutContainer = Object.assign({}, billWithoutContainer);
        return copy;
    }
}
