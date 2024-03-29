import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { PspConfig } from './psp-config.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PspConfig>;

@Injectable({ providedIn: 'root' })
export class PspConfigService {

    private resourceUrl = 'niopdcpayment/api/psp-configs';

    constructor(private http: HttpClient) { }

    create(pspConfig: PspConfig): Observable<EntityResponseType> {
            const copy = this.convert(pspConfig);
        return this.http.post<PspConfig>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(pspConfig: PspConfig): Observable<EntityResponseType> {
        const copy = this.convert(pspConfig);
        return this.http.put<PspConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PspConfig>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PspConfig[]>> {
        const options = createRequestOption(req);
        return this.http.get<PspConfig[]>(this. resourceUrl ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<PspConfig[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PspConfig = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PspConfig[]>): HttpResponse<PspConfig[]> {
        const jsonResponse: PspConfig[] = res.body;
        const body: PspConfig[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PspConfig.
     */
    private convertItemFromServer(pspConfig: PspConfig): PspConfig {
        const copy: PspConfig = Object.assign(new PspConfig(), pspConfig);
        return copy;
    }

    /**
     * Convert a PspConfig to a JSON which can be sent to the server.
     */
    private convert(pspConfig: PspConfig): PspConfig {
        const copy: PspConfig = Object.assign({}, pspConfig);

        return copy;
    }
}
