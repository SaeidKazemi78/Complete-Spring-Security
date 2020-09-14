import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';
import {BoundarySellPublicReport, BoundarySellPublicRequest} from './boundary-sell-public-report.model';
import {BoundarySellReport, BoundarySellReportRequest} from '../boundary-sell';

export type EntityResponseType = HttpResponse<BoundarySellPublicReport[]>;

@Injectable()
export class BoundarySellPublicReportService {

    private resourceUrl = SERVER_API_URL + 'niopdcreport/api/boundary-sell';

    constructor(private http: HttpClient) {
    }

    query(req?: BoundarySellPublicRequest): Observable<EntityResponseType> {
        return this.http.post<BoundarySellPublicReport[]>(this.resourceUrl + '/public-report', req, {observe: 'response'})
            .map((res: HttpResponse<BoundarySellPublicReport[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<BoundarySellPublicReport[]>): HttpResponse<BoundarySellPublicReport[]> {
        const jsonResponse: BoundarySellPublicReport[] = res.body;
        const body: BoundarySellPublicReport[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BoundarySellReport.
     */
    private convertItemFromServer(dailySales: BoundarySellPublicReport): BoundarySellPublicReport {
        const copy: BoundarySellPublicReport = Object.assign({}, dailySales);
        return copy;
    }
}
