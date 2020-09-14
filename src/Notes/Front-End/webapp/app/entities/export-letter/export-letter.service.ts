import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ExportLetter } from './export-letter.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ExportLetter>;

@Injectable({providedIn: 'root'})
export class ExportLetterService {

    private resourceUrl = 'niopdcbase/api/export-letters';
    private resourceExportPiUrl = 'niopdcbase/api/export-pis';
    private resourceSellContractUrl = 'niopdcbase/api/sell-contracts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(exportLetter: ExportLetter): Observable<EntityResponseType> {
            const copy = this.convert(exportLetter);
        return this.http.post<ExportLetter>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(exportLetter: ExportLetter): Observable<EntityResponseType> {
        const copy = this.convert(exportLetter);
        return this.http.put<ExportLetter>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EntityResponseType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByExportPi(id: number): Observable<EntityResponseType> {
        return this.http.get<EntityResponseType>(`${this.resourceExportPiUrl}/${id}/export-letter`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(sellContractId, req?: any): Observable<HttpResponse<ExportLetter[]>> {
        const options = createRequestOption(req);
        return this.http.get<ExportLetter[]>(`${this.resourceSellContractUrl}/${sellContractId}/export-letters` ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<ExportLetter[]>) => this.convertArrayResponse(res));
    }

    totalAmountRecorded(exportLetterId: number): Observable<HttpResponse<number>> {
        return this.http.get<number>(`${this.resourceUrl}/${exportLetterId}/total-amount-pi`, {observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    active(id: number): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${this.resourceUrl}/${id}/active`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ExportLetter = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ExportLetter[]>): HttpResponse<ExportLetter[]> {
        const jsonResponse: ExportLetter[] = res.body;
        const body: ExportLetter[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ExportLetter.
     */
    private convertItemFromServer(exportLetter: ExportLetter): ExportLetter {
        const copy: ExportLetter = Object.assign(new ExportLetter(), exportLetter);
                copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(copy.registerDate);
                copy.dueDate = this.dateUtils
            .convertDateTimeFromServer(copy.dueDate);
                copy.expiryDate = this.dateUtils
            .convertDateTimeFromServer(copy.expiryDate);
        return copy;
    }

    /**
     * Convert a ExportLetter to a JSON which can be sent to the server.
     */
    private convert(exportLetter: ExportLetter): ExportLetter {
        const copy: ExportLetter = Object.assign({}, exportLetter);

        return copy;
    }
}
