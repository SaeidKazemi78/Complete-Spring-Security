import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { VoucherPayment } from './voucher-payment.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<VoucherPayment>;

@Injectable({ providedIn: 'root' })
export class VoucherPaymentService {

    private resourceUrl =  SERVER_API_URL + 'niopdcaccounting/api/voucher-payments';

    constructor(private http: HttpClient) { }

    create(voucherPayment: VoucherPayment): Observable<EntityResponseType> {
        const copy = this.convert(voucherPayment);
        return this.http.post<VoucherPayment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(voucherPayment: VoucherPayment): Observable<EntityResponseType> {
        const copy = this.convert(voucherPayment);
        return this.http.put<VoucherPayment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VoucherPayment>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VoucherPayment[]>> {
        const options = createRequestOption(req);
        return this.http.get<VoucherPayment[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<VoucherPayment[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VoucherPayment = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VoucherPayment[]>): HttpResponse<VoucherPayment[]> {
        const jsonResponse: VoucherPayment[] = res.body;
        const body: VoucherPayment[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VoucherPayment.
     */
    private convertItemFromServer(voucherPayment: VoucherPayment): VoucherPayment {
        const copy: VoucherPayment = Object.assign({}, voucherPayment);
        return copy;
    }

    /**
     * Convert a VoucherPayment to a JSON which can be sent to the server.
     */
    private convert(voucherPayment: VoucherPayment): VoucherPayment {
        const copy: VoucherPayment = Object.assign({}, voucherPayment);
        return copy;
    }
}
