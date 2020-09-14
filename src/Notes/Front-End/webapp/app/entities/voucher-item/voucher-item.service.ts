import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { VoucherItem } from './voucher-item.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<VoucherItem>;

@Injectable({ providedIn: 'root' })
export class VoucherItemService {

    private resourceUrl = 'niopdcaccounting/api/voucher-items';

    private resourceVoucherMasterUrl = 'niopdcaccounting/api/voucher-masters';

    constructor(private http: HttpClient) { }

    create(voucherItem: VoucherItem): Observable<EntityResponseType> {
            const copy = this.convert(voucherItem);
        return this.http.post<VoucherItem>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(voucherItem: VoucherItem): Observable<EntityResponseType> {
        const copy = this.convert(voucherItem);
        return this.http.put<VoucherItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VoucherItem>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( voucherMasterId: any, req?: any): Observable<HttpResponse<VoucherItem[]>> {
        const options = createRequestOption(req);
        return this.http.get<VoucherItem[]>(this.resourceVoucherMasterUrl + '/' + voucherMasterId + '/voucher-items' ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<VoucherItem[]>) => this.convertArrayResponse(res));
    }

    queryForReport(voucherMasterId: any): Observable<HttpResponse<VoucherItem[]>> {
        return this.http.get<VoucherItem[]>(`${this.resourceVoucherMasterUrl}/voucher-item-report/${voucherMasterId}`, {observe: 'response'})
            .map((res: HttpResponse<VoucherItem[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VoucherItem = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VoucherItem[]>): HttpResponse<VoucherItem[]> {
        const jsonResponse: VoucherItem[] = res.body;
        const body: VoucherItem[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VoucherItem.
     */
    private convertItemFromServer(voucherItem: VoucherItem): VoucherItem {
        const copy: VoucherItem = Object.assign(new VoucherItem(), voucherItem);
        return copy;
    }

    /**
     * Convert a VoucherItem to a JSON which can be sent to the server.
     */
    private convert(voucherItem: VoucherItem): VoucherItem {
        const copy: VoucherItem = Object.assign({}, voucherItem);

        return copy;
    }
}
