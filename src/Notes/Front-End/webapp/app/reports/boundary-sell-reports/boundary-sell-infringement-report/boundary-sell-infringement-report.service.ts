import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import {BoundarySellInfringementReport, BoundarySellInfringementReportRequest, ReportResponseDTO} from './boundary-sell-infringement-report.model';

export type EntityResponseType = HttpResponse<BoundarySellInfringementReport>;

@Injectable()
export class BoundarySellInfringementReportService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/boundary-sell/infringements';

    constructor(private http: HttpClient) { }

    query(req?: BoundarySellInfringementReportRequest): Observable<HttpResponse<ReportResponseDTO>> {
        return this.http.post<ReportResponseDTO>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<ReportResponseDTO>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<ReportResponseDTO>): HttpResponse<ReportResponseDTO> {
        const jsonResponse: ReportResponseDTO = res.body;
        const body: ReportResponseDTO = this.convertItemFromServer(jsonResponse);
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BoundaryDetailsSellReport.
     */
    private convertItemFromServer(dailySales: ReportResponseDTO): ReportResponseDTO {
        const copy: ReportResponseDTO = Object.assign({}, dailySales);
        return copy;
    }
}
