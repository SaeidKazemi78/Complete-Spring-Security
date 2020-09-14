import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import {BoundarySellDraftShiftReport} from './boundary-sell-draft-shift-report.model';
import {BoundarySellReportRequest} from '../boundary-sell';

export type EntityResponseType = HttpResponse<BoundarySellDraftShiftReport>;

@Injectable()
export class BoundarySellDraftShiftReportService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/boundary-sell/draft-shift';

    constructor(private http: HttpClient) { }

    query(req?: BoundarySellReportRequest): Observable<HttpResponse<BoundarySellDraftShiftReport[]>> {
        return this.http.post<BoundarySellDraftShiftReport[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<BoundarySellDraftShiftReport[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<BoundarySellDraftShiftReport[]>): HttpResponse<BoundarySellDraftShiftReport[]> {
        const jsonResponse: BoundarySellDraftShiftReport[] = res.body;
        const body: BoundarySellDraftShiftReport[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BoundarySellDraftShiftReport.
     */
    private convertItemFromServer(dailySales: BoundarySellDraftShiftReport): BoundarySellDraftShiftReport {
        const copy: BoundarySellDraftShiftReport = Object.assign({}, dailySales);
        return copy;
    }
}
