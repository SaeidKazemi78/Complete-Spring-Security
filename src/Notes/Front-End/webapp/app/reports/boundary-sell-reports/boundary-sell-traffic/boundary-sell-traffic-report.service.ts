import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import {BoundarySellReportRequest} from '../boundary-sell';
import {BoundarySellReportTraffic} from './boundary-sell-traffic-report.model';

export type EntityResponseType = HttpResponse<BoundarySellReportTraffic>;

@Injectable()
export class BoundarySellTrafficReportService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/boundary-sell/traffic';

    constructor(private http: HttpClient) { }

    query(req?: BoundarySellReportRequest): Observable<HttpResponse<BoundarySellReportTraffic[]>> {
        return this.http.post<BoundarySellReportTraffic[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<BoundarySellReportTraffic[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<BoundarySellReportTraffic[]>): HttpResponse<BoundarySellReportTraffic[]> {
        const jsonResponse: BoundarySellReportTraffic[] = res.body;
        const body: BoundarySellReportTraffic[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BoundarySellReportTraffic.
     */
    private convertItemFromServer(dailySales: BoundarySellReportTraffic): BoundarySellReportTraffic {
        const copy: BoundarySellReportTraffic = Object.assign({}, dailySales);
        return copy;
    }
}
