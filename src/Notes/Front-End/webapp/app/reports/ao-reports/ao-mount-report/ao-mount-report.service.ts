import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {AoMountReport, AoMountReportRequest} from './ao-mount-report.model';

export type EntityResponseType = HttpResponse<AoMountReport>;

@Injectable()
export class AoMountReportService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/ao-reports/ao-mount-reports';

    constructor(private http: HttpClient) { }

    query(req?: AoMountReportRequest): Observable<HttpResponse<AoMountReport[]>> {
        return this.http.post<AoMountReport[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<AoMountReport[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<AoMountReport[]>): HttpResponse<AoMountReport[]> {
        const jsonResponse: AoMountReport[] = res.body;
        const body: AoMountReport[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AoMountReport.
     */
    private convertItemFromServer(AoMountReport: AoMountReport): AoMountReport {
        const copy: AoMountReport = Object.assign({}, AoMountReport);
        return copy;
    }
}
