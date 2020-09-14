import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {Payment, PaymentInquiry} from './payment.model';
import {createRequestOption} from '../../shared';
import {MelliPosSaleResponse} from '../../shared/e-payment/melli-pos.model';

export type EntityResponseType = HttpResponse<Payment>;

@Injectable({ providedIn: 'root' })
export class PaymentService {

    private resourceUrl = SERVER_API_URL + 'niopdcpayment/api/payments';
    private resourceWalletUrl = SERVER_API_URL + 'niopdcpayment/api/wallet';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(payment: Payment): Observable<EntityResponseType> {
        const copy = this.convert(payment);
        return this.http.post<Payment>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(payment: Payment): Observable<EntityResponseType> {
        const copy = this.convert(payment);
        return this.http.put<Payment>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    payByPreviousPayments(requestIdentifier, payments: Payment[]): Observable<any> {
        const copy = this.converts(payments);
        return this.http.post<any>(this.resourceUrl + `/pay-by-pre-payment/${requestIdentifier}`, copy, {observe: 'response'});
    }

    updatePreviousPayments(requestIdentifier, payments: Payment[]): Observable<HttpResponse<boolean>> {
        const copy = this.converts(payments);
        return this.http.put<boolean>(`${this.resourceUrl}/update-pre-payment/${requestIdentifier}`, copy, {observe: 'response'})
            .map((res: HttpResponse<boolean>) => {
                return res;
            });
    }

    updatePreviousPaymentsAndGetRefId(requestIdentifier, amount, payments: Payment[]): Observable<HttpResponse<string>> {
        const copy = this.converts(payments);
        return this.http.put(`${this.resourceUrl}/update-pre-payment/${requestIdentifier}/amount/${amount}/behpardakht-refid`, copy,
            {
                observe: 'response',
                responseType: 'json'
            })
            .map((res: HttpResponse<string>) => {
                return res;
            });
    }

    payByWallet(requestIdentifier: string ,personId: number,customerId: number){
        return this.http.get<boolean>(`${this.resourceWalletUrl}/payment/${requestIdentifier}/${personId}/${customerId}`, {observe: 'response'})
            .map((res: HttpResponse<boolean>) => {
                return res;
            });
    }

    payByWallet2(requestIdentifier: string ){
        return this.http.get<boolean>(`${this.resourceWalletUrl}/payment/${requestIdentifier}`, {observe: 'response'})
            .map((res: HttpResponse<boolean>) => {
                return res;
            });
    }

    payByPreviousPaymentsAndPcPos(requestIdentifier, payments: Payment[], type, posSale): Observable<HttpResponse<boolean>> {
        const copy = this.converts(payments);
        return this.http.put<boolean>(`${this.resourceUrl}/pay-by-pre-payment-and-pcPos/${requestIdentifier}`,
            {payments: copy, type, posSale}, {observe: 'response'})
            .map((res: HttpResponse<boolean>) => {
                return res;
            });
    }

    payByPreviousPaymentsAndInquiry(requestIdentifier, payments: Payment[], paymentInquiry): Observable<HttpResponse<boolean>> {
        const copy = this.converts(payments);
        return this.http.put<boolean>(`${this.resourceUrl}/pay-by-pre-payment-and-inquiry/${requestIdentifier}`,
            {payments: copy, paymentInquiry}, {observe: 'response'})
            .map((res: HttpResponse<boolean>) => {
                return res;
            });
    }

    getInfoInquiry(paymentInquiry): Observable<HttpResponse<{info: string}>> {
        return this.http.post<{info: string}>(`${this.resourceUrl}/info-inquiry/`,
            paymentInquiry, {observe: 'response'});
    }

    inquiry(paymentInquiry): Observable<HttpResponse<boolean>> {
        return this.http.post<boolean>(`${this.resourceUrl}/inquiry`, paymentInquiry,
            {observe: 'response'})
            .map((res: HttpResponse<boolean>) => {
                return res;
            });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Payment>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findInquiry(id: number): Observable<EntityResponseType> {
        return this.http.get<PaymentInquiry>(`${this.resourceUrl}/${id}/inquiry`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponseInquiry(res));
    }

    queryByIdentifier(requestIdentifier, req?: any): Observable<HttpResponse<Payment[]>> {
        const options = createRequestOption(req);
        return this.http.get<Payment[]>(this.resourceUrl + '/identifier/' + requestIdentifier, {params: options, observe: 'response'})
            .map((res: HttpResponse<Payment[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Payment[]>> {
        const options = createRequestOption(req);
        return this.http.get<Payment[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<Payment[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Payment = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertResponseInquiry(res: EntityResponseType): EntityResponseType {
        const body: PaymentInquiry = this.convertItemFromServerInquiry(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Payment[]>): HttpResponse<Payment[]> {
        const jsonResponse: Payment[] = res.body;
        const body: Payment[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Payment.
     */
    private convertItemFromServer(payment: Payment): Payment {
        const copy: Payment = Object.assign({}, payment);
        copy.receiptDateTime = this.dateUtils
            .convertDateTimeFromServer(payment.receiptDateTime);
        return copy;
    }

    private convertItemFromServerInquiry(payment: PaymentInquiry): PaymentInquiry {
        const copy: PaymentInquiry = Object.assign({}, payment);
        copy.receiptDateTime = this.dateUtils
            .convertDateTimeFromServer(payment.receiptDateTime);
        return copy;
    }

    /**
     * Convert a Payment to a JSON which can be sent to the server.
     */
    private convert(payment: Payment): Payment {
        const copy: Payment = Object.assign({}, payment);

        return copy;
    }

    /**
     * Convert a Payment to a JSON which can be sent to the server.
     */
    private converts(payments: Payment[]): Payment[] {

        const copy: Payment[] = [];
        payments.forEach(value => copy.push(Object.assign({}, value)));

        return copy;
    }

}
