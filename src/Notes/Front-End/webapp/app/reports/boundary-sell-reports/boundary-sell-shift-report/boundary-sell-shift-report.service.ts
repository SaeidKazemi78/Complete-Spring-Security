import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';
import {BoundarySellShiftReport, BoundarySellShiftRequest} from './boundary-sell-shift-report.model';
import {BoundarySellReport, BoundarySellReportRequest} from '../boundary-sell';

export type EntityResponseType = HttpResponse<BoundarySellShiftReport[]>;

@Injectable()
export class BoundarySellShiftReportService {

    private resourceUrl = SERVER_API_URL + 'niopdcreport/api/boundary-sell';

    constructor(private http: HttpClient) {
    }

    query(req?: BoundarySellShiftRequest): Observable<EntityResponseType> {
        return this.http.post<BoundarySellShiftReport[]>(this.resourceUrl + '/shift-report', req, {observe: 'response'})
            .map((res: HttpResponse<BoundarySellShiftReport[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<BoundarySellShiftReport[]>): HttpResponse<BoundarySellShiftReport[]> {
        const jsonResponse: BoundarySellShiftReport[] = res.body;
        const body: BoundarySellShiftReport[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BoundarySellReport.
     */
    private convertItemFromServer(dailySales: BoundarySellShiftReport): BoundarySellShiftReport {
        const copy: BoundarySellShiftReport = Object.assign({}, dailySales);
        return copy;
    }
}
