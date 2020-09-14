import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { VoucherTypeGroup } from './voucher-type-group.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<VoucherTypeGroup>;

@Injectable({ providedIn: 'root' })
export class VoucherTypeGroupService {

    private resourceUrl =  SERVER_API_URL + 'niopdcaccounting/api/voucher-type-groups';

    constructor(private http: HttpClient) { }

    create(voucherTypeGroup: VoucherTypeGroup): Observable<EntityResponseType> {
        const copy = this.convert(voucherTypeGroup);
        return this.http.post<VoucherTypeGroup>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(voucherTypeGroup: VoucherTypeGroup): Observable<EntityResponseType> {
        const copy = this.convert(voucherTypeGroup);
        return this.http.put<VoucherTypeGroup>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VoucherTypeGroup>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VoucherTypeGroup[]>> {
        const options = createRequestOption(req);
        return this.http.get<VoucherTypeGroup[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<VoucherTypeGroup[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VoucherTypeGroup = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VoucherTypeGroup[]>): HttpResponse<VoucherTypeGroup[]> {
        const jsonResponse: VoucherTypeGroup[] = res.body;
        const body: VoucherTypeGroup[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VoucherTypeGroup.
     */
    private convertItemFromServer(voucherTypeGroup: VoucherTypeGroup): VoucherTypeGroup {
        const copy: VoucherTypeGroup = Object.assign({}, voucherTypeGroup);
        return copy;
    }

    /**
     * Convert a VoucherTypeGroup to a JSON which can be sent to the server.
     */
    private convert(voucherTypeGroup: VoucherTypeGroup): VoucherTypeGroup {
        const copy: VoucherTypeGroup = Object.assign({}, voucherTypeGroup);
        return copy;
    }
}
