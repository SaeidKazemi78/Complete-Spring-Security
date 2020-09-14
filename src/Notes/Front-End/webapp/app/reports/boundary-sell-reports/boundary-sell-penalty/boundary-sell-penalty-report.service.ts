import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import {BoundarySellPenaltyReport} from './boundary-sell-penalty-report.model';
import {BoundarySellReportRequest} from '../boundary-sell';

export type EntityResponseType = HttpResponse<BoundarySellPenaltyReport>;

@Injectable()
export class BoundarySellPenaltyReportService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/boundary-sell/penalty';

    constructor(private http: HttpClient) { }

    query(req?: BoundarySellReportRequest): Observable<HttpResponse<BoundarySellPenaltyReport[]>> {
        return this.http.post<BoundarySellPenaltyReport[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<BoundarySellPenaltyReport[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<BoundarySellPenaltyReport[]>): HttpResponse<BoundarySellPenaltyReport[]> {
        const jsonResponse: BoundarySellPenaltyReport[] = res.body;
        const body: BoundarySellPenaltyReport[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BoundarySellPenaltyReport.
     */
    private convertItemFromServer(dailySales: BoundarySellPenaltyReport): BoundarySellPenaltyReport {
        const copy: BoundarySellPenaltyReport = Object.assign({}, dailySales);
        return copy;
    }
}
