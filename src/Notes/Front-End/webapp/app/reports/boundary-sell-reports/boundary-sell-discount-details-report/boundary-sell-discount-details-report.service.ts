import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import {BoundarySellDiscountRequestDTO, DiscountDetailsDTO, ReportResponseDTO} from './boundary-sell-discount-details-report.model';

export type EntityResponseType = HttpResponse<DiscountDetailsDTO>;

@Injectable()
export class BoundaryDiscountDetailsSellReportService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/boundary-sell/discount-details-report';

    constructor(private http: HttpClient) { }

    query(req?: BoundarySellDiscountRequestDTO): Observable<HttpResponse<ReportResponseDTO>> {
        return this.http.post<ReportResponseDTO>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<ReportResponseDTO>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<ReportResponseDTO>): HttpResponse<ReportResponseDTO> {
        const jsonResponse: ReportResponseDTO = res.body;
        const body: ReportResponseDTO = this.convertItemFromServer(jsonResponse);
        return res.clone({body});
    }

    private convertItemFromServer(dailySales: ReportResponseDTO): ReportResponseDTO {
        const copy: ReportResponseDTO = Object.assign({}, dailySales);
        return copy;
    }
}
