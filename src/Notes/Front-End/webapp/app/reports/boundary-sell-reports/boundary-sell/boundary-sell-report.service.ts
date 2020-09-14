import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import {BoundarySellReport, BoundarySellReportRequest} from './boundary-sell-report.model';

export type EntityResponseType = HttpResponse<BoundarySellReport>;

@Injectable()
export class BoundarySellReportService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/boundary-sell';

    constructor(private http: HttpClient) { }

    query(req?: BoundarySellReportRequest): Observable<HttpResponse<BoundarySellReport[]>> {
        return this.http.post<BoundarySellReport[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<BoundarySellReport[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<BoundarySellReport[]>): HttpResponse<BoundarySellReport[]> {
        const jsonResponse: BoundarySellReport[] = res.body;
        const body: BoundarySellReport[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BoundarySellReport.
     */
    private convertItemFromServer(dailySales: BoundarySellReport): BoundarySellReport {
        const copy: BoundarySellReport = Object.assign({}, dailySales);
        return copy;
    }
}
