import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ExportPiPayment } from './export-pi-payment.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ExportPiPayment>;

@Injectable({providedIn: 'root'})
export class ExportPiPaymentService {

    private resourceUrl = 'niopdcbase/api/export-pi-payments';

    private resourceExportPiUrl = 'niopdcbase/api/export-pis';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(exportPiPayment: ExportPiPayment): Observable<EntityResponseType> {
            const copy = this.convert(exportPiPayment);
        return this.http.post<ExportPiPayment>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(exportPiPayment: ExportPiPayment): Observable<EntityResponseType> {
        const copy = this.convert(exportPiPayment);
        return this.http.put<ExportPiPayment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ExportPiPayment>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( exportPiId: any): Observable<HttpResponse<ExportPiPayment[]>> {
        return this.http.get<ExportPiPayment[]>(this.resourceExportPiUrl + '/' + exportPiId + '/export-pi-payments' ,  { observe: 'response' })
            .map((res: HttpResponse<ExportPiPayment[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ExportPiPayment = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ExportPiPayment[]>): HttpResponse<ExportPiPayment[]> {
        const jsonResponse: ExportPiPayment[] = res.body;
        const body: ExportPiPayment[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ExportPiPayment.
     */
    private convertItemFromServer(exportPiPayment: ExportPiPayment): ExportPiPayment {
        const copy: ExportPiPayment = Object.assign(new ExportPiPayment(), exportPiPayment);
                copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(copy.registerDate);
        return copy;
    }

    /**
     * Convert a ExportPiPayment to a JSON which can be sent to the server.
     */
    private convert(exportPiPayment: ExportPiPayment): ExportPiPayment {
        const copy: ExportPiPayment = Object.assign({}, exportPiPayment);

        return copy;
    }
}
