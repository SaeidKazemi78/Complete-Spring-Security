import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Loan } from './loan.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Loan>;

@Injectable({ providedIn: 'root' })
export class LoanService {

    private resourceUrl = 'niopdcaccounting/api/loans';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(loan: Loan): Observable<EntityResponseType> {
            const copy = this.convert(loan);
        return this.http.post<Loan>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(loan: Loan): Observable<EntityResponseType> {
        const copy = this.convert(loan);
        return this.http.put<Loan>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Loan>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Loan[]>> {
        const options = createRequestOption(req);
        return this.http.get<Loan[]>(this. resourceUrl ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<Loan[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Loan = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Loan[]>): HttpResponse<Loan[]> {
        const jsonResponse: Loan[] = res.body;
        const body: Loan[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Loan.
     */
    private convertItemFromServer(loan: Loan): Loan {
        const copy: Loan = Object.assign(new Loan(), loan);
                copy.firstPaymentDate = this.dateUtils
            .convertDateTimeFromServer(copy.firstPaymentDate);
        return copy;
    }

    /**
     * Convert a Loan to a JSON which can be sent to the server.
     */
    private convert(loan: Loan): Loan {
        const copy: Loan = Object.assign({}, loan);

        return copy;
    }
}
