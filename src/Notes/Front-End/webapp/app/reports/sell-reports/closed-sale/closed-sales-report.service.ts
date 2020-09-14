import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import {ClosedSaleRequest} from "app/reports/sell-reports/closed-sale/closed-sales.model";

export type EntityResponseType = HttpResponse<any>;

@Injectable()
export class ClosedSalesReportService {

    private resourceReportUrl = SERVER_API_URL + 'niopdcreport/api/closed-sales-report';
    constructor(private http: HttpClient) { }

    report(req: ClosedSaleRequest): Observable<EntityResponseType> {
        return this.http.post<any>(this.resourceReportUrl,req, { observe: 'response',})
            .map((res: EntityResponseType) => res);
    }

}
