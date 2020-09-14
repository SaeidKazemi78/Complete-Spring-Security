import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import {
    BoundaryMonthlySellReportRequest,
    BoundaryMonthlySellReportResponse
} from "app/reports/boundary-sell-reports/boundary-monthly-sell/boundary-monthly-sell-report.model";

export type EntityResponseType = HttpResponse<BoundaryMonthlySellReportResponse>;

@Injectable()
export class BoundaryMonthlySellReportService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/boundary-sell/boundary-monthly-sell';

    constructor(private http: HttpClient) { }

    query(req?: BoundaryMonthlySellReportRequest): Observable<HttpResponse<BoundaryMonthlySellReportResponse[]>> {
        return this.http.post<BoundaryMonthlySellReportResponse[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<BoundaryMonthlySellReportResponse[]>) => res);
    }

    private convertArrayResponse(res: HttpResponse<BoundaryMonthlySellReportResponse[]>): HttpResponse<BoundaryMonthlySellReportResponse[]> {
        const jsonResponse: BoundaryMonthlySellReportResponse[] = res.body;
        const body: BoundaryMonthlySellReportResponse[] = this.convertItemFromServer(jsonResponse);
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BoundaryDetailsSellReport.
     */
    private convertItemFromServer(dailySales: BoundaryMonthlySellReportResponse[]): BoundaryMonthlySellReportResponse[] {
        const copy: BoundaryMonthlySellReportResponse[] = Object.assign({}, dailySales);
        return copy;
    }
}
