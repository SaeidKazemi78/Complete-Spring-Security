import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { VoucherMapping } from './voucher-mapping.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<VoucherMapping>;

@Injectable({ providedIn: 'root' })
export class VoucherMappingService {

    private resourceUrl =  SERVER_API_URL + 'niopdcaccounting/api/voucher-mappings';

    constructor(private http: HttpClient) { }

    create(voucherMapping: VoucherMapping): Observable<EntityResponseType> {
        const copy = this.convert(voucherMapping);
        return this.http.post<VoucherMapping>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(voucherMapping: VoucherMapping): Observable<EntityResponseType> {
        const copy = this.convert(voucherMapping);
        return this.http.put<VoucherMapping>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VoucherMapping>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VoucherMapping[]>> {
        const options = createRequestOption(req);
        return this.http.get<VoucherMapping[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<VoucherMapping[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VoucherMapping = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VoucherMapping[]>): HttpResponse<VoucherMapping[]> {
        const jsonResponse: VoucherMapping[] = res.body;
        const body: VoucherMapping[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VoucherMapping.
     */
    private convertItemFromServer(voucherMapping: VoucherMapping): VoucherMapping {
        const copy: VoucherMapping = Object.assign({}, voucherMapping);
        return copy;
    }

    /**
     * Convert a VoucherMapping to a JSON which can be sent to the server.
     */
    private convert(voucherMapping: VoucherMapping): VoucherMapping {
        const copy: VoucherMapping = Object.assign({}, voucherMapping);
        return copy;
    }
}
