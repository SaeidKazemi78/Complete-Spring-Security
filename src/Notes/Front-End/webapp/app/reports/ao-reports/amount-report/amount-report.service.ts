import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {AmountReport, AmountReportRequest} from './amount-report.model';

export type EntityResponseType = HttpResponse<AmountReport>;

@Injectable()
export class AmountReportService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/ao-reports/amount-reports';

    constructor(private http: HttpClient) { }

    query(req?: AmountReportRequest): Observable<HttpResponse<AmountReport[]>> {
        return this.http.post<AmountReport[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<AmountReport[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<AmountReport[]>): HttpResponse<AmountReport[]> {
        const jsonResponse: AmountReport[] = res.body;
        const body: AmountReport[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AmountReport.
     */
    private convertItemFromServer(amountReport: AmountReport): AmountReport {
        const copy: AmountReport = Object.assign({}, amountReport);
        return copy;
    }
}
