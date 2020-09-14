import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {ExportPi} from './export-pi.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<ExportPi>;

@Injectable({providedIn: 'root'})
export class ExportPiService {

    private resourceUrl = 'niopdcbase/api/export-pis';
    private resourceExportLetterUrl = 'niopdcbase/api/export-letters';
    private resourceSellContractUrl = 'niopdcbase/api/sell-contracts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(exportPi: ExportPi): Observable<EntityResponseType> {
        const copy = this.convert(exportPi);
        return this.http.post<ExportPi>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(exportPi: ExportPi): Observable<EntityResponseType> {
        const copy = this.convert(exportPi);
        return this.http.put<ExportPi>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ExportPi>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findBySellContract(sellContractId: any): Observable<HttpResponse<ExportPi[]>> {
        return this.http.get<ExportPi[]>(this.resourceSellContractUrl + '/' + sellContractId + '/export-pis', { observe: 'response'})
            .map((res: HttpResponse<ExportPi[]>) => this.convertArrayResponse(res));
    }

    query(exportLetterId: any, req?: any): Observable<HttpResponse<ExportPi[]>> {
        const options = createRequestOption(req);
        return this.http.get<ExportPi[]>(this.resourceExportLetterUrl + '/' + exportLetterId + '/export-pis', {params: options, observe: 'response'})
            .map((res: HttpResponse<ExportPi[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    requestPay(id: number): Observable<{payId: string}> {
        return this.http.post<{payId: string}>(`${this.resourceUrl}/${id}/e-payment`, null );
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ExportPi = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ExportPi[]>): HttpResponse<ExportPi[]> {
        const jsonResponse: ExportPi[] = res.body;
        const body: ExportPi[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ExportPi.
     */
    private convertItemFromServer(exportPi: ExportPi): ExportPi {
        const copy: ExportPi = Object.assign(new ExportPi(), exportPi);
        copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(copy.registerDate);
        return copy;
    }

    /**
     * Convert a ExportPi to a JSON which can be sent to the server.
     */
    private convert(exportPi: ExportPi): ExportPi {
        const copy: ExportPi = Object.assign({}, exportPi);

        return copy;
    }

}
