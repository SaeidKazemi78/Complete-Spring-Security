import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {VoucherType} from './voucher-type.model';
import {createRequestOption} from '../../shared';
import {Referrer} from '../voucher-template';

export type EntityResponseType = HttpResponse<VoucherType>;

@Injectable({ providedIn: 'root' })
export class VoucherTypeService {

    private resourceUrl = SERVER_API_URL + 'niopdcaccounting/api/voucher-types';
    private resourcVoucherTypeGroupeUrl =  SERVER_API_URL + 'niopdcaccounting/api/voucher-type-groups';
    private referrer: Referrer;

    constructor(private http: HttpClient) {
    }

    create(voucherType: VoucherType): Observable<EntityResponseType> {
        const copy = this.convert(voucherType);
        return this.http.post<VoucherType>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(voucherType: VoucherType): Observable<EntityResponseType> {
        const copy = this.convert(voucherType);
        return this.http.put<VoucherType>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VoucherType>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VoucherType[]>> {
        const options = createRequestOption(req);
        return this.http.get<VoucherType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<VoucherType[]>) => this.convertArrayResponse(res));
    }
    findByReferrer(referrer: any): Observable<HttpResponse<VoucherType[]>> {
        return this.http.get<VoucherType[]>(`${this.resourceUrl}/referrer/${referrer}`, { observe: 'response' })
            .map((res: HttpResponse<VoucherType[]>) => this.convertArrayResponse(res));
    }

    queryByVoucherTypeGroupId(voucherTypeGroupId: number, req?: any): Observable<HttpResponse<VoucherType[]>> {
        const options = createRequestOption(req);
        return this.http.get<VoucherType[]>(`${this.resourcVoucherTypeGroupeUrl}/${voucherTypeGroupId}/voucher-types`, {params: options, observe: 'response'})
            .map((res: HttpResponse<VoucherType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VoucherType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VoucherType[]>): HttpResponse<VoucherType[]> {
        const jsonResponse: VoucherType[] = res.body;
        const body: VoucherType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VoucherType.
     */
    private convertItemFromServer(voucherType: VoucherType): VoucherType {
        const copy: VoucherType = Object.assign({}, voucherType);
        return copy;
    }

    /**
     * Convert a VoucherType to a JSON which can be sent to the server.
     */
    private convert(voucherType: VoucherType): VoucherType {
        const copy: VoucherType = Object.assign({}, voucherType);
        return copy;
    }

}
