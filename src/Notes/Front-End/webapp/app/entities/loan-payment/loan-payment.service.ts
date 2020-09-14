import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { LoanPayment } from './loan-payment.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LoanPayment>;

@Injectable({ providedIn: 'root' })
export class LoanPaymentService {

    private resourceUrl = 'niopdcaccounting/api/loan-payments';

    private resourceLoanUrl = 'niopdcaccounting/api/loans';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(loanPayment: LoanPayment): Observable<EntityResponseType> {
            const copy = this.convert(loanPayment);
        return this.http.post<LoanPayment>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(loanPayment: LoanPayment): Observable<EntityResponseType> {
        const copy = this.convert(loanPayment);
        return this.http.put<LoanPayment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LoanPayment>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( loanId: any, req?: any): Observable<HttpResponse<LoanPayment[]>> {
        const options = createRequestOption(req);
        return this.http.get<LoanPayment[]>(this.resourceLoanUrl + '/' + loanId + '/loan-payments' ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<LoanPayment[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LoanPayment = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LoanPayment[]>): HttpResponse<LoanPayment[]> {
        const jsonResponse: LoanPayment[] = res.body;
        const body: LoanPayment[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LoanPayment.
     */
    private convertItemFromServer(loanPayment: LoanPayment): LoanPayment {
        const copy: LoanPayment = Object.assign(new LoanPayment(), loanPayment);
                copy.data = this.dateUtils
            .convertDateTimeFromServer(copy.data);
        return copy;
    }

    /**
     * Convert a LoanPayment to a JSON which can be sent to the server.
     */
    private convert(loanPayment: LoanPayment): LoanPayment {
        const copy: LoanPayment = Object.assign({}, loanPayment);

        return copy;
    }
}
