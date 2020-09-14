import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import {InvoiceRequestDTO, InvoiceSalesDTO, ReportResponseDTO} from './invoice-report.model';

export type EntityResponseType = HttpResponse<ReportResponseDTO>;

@Injectable()
export class InvoiceSellReportService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/invoice-sell-report';

    constructor(private http: HttpClient) { }

    query(req?: InvoiceRequestDTO): Observable<HttpResponse<ReportResponseDTO>> {
        return this.http.post<ReportResponseDTO>(this.resourceUrl, req, { observe: 'response' });

    }

    private convertArrayResponse(res: HttpResponse<ReportResponseDTO[]>): HttpResponse<ReportResponseDTO[]> {
        const jsonResponse: ReportResponseDTO[] = res.body;
        const body: ReportResponseDTO[] = this.convertItemFromServer(jsonResponse);
        return res.clone({body});
    }

    private convertItemFromServer(invoices: ReportResponseDTO[]): ReportResponseDTO[] {
        const copy: ReportResponseDTO[] = Object.assign({}, invoices);
        return copy;
    }
}
