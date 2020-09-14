import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import {BoundarySellMultipleTrafficReport} from './boundary-sell-multiple-traffic-report.model';
import {BoundarySellReportRequest} from '../boundary-sell';

export type EntityResponseType = HttpResponse<BoundarySellMultipleTrafficReport>;

@Injectable()
export class BoundarySellMultipleTrafficReportService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/boundary-sell/multiple-traffic';

    constructor(private http: HttpClient) { }

    query(req?: BoundarySellReportRequest): Observable<HttpResponse<BoundarySellMultipleTrafficReport[]>> {
        return this.http.post<BoundarySellMultipleTrafficReport[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<BoundarySellMultipleTrafficReport[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<BoundarySellMultipleTrafficReport[]>): HttpResponse<BoundarySellMultipleTrafficReport[]> {
        const jsonResponse: BoundarySellMultipleTrafficReport[] = res.body;
        const body: BoundarySellMultipleTrafficReport[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BoundarySellMultipleTrafficReport.
     */
    private convertItemFromServer(dailySales: BoundarySellMultipleTrafficReport): BoundarySellMultipleTrafficReport {
        const copy: BoundarySellMultipleTrafficReport = Object.assign({}, dailySales);
        return copy;
    }
}
