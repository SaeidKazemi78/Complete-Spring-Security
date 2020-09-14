import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { LoanType } from './loan-type.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LoanType>;

@Injectable({ providedIn: 'root' })
export class LoanTypeService {

    private resourceUrl = 'niopdcaccounting/api/loan-types';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(loanType: LoanType): Observable<EntityResponseType> {
            const copy = this.convert(loanType);
        return this.http.post<LoanType>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(loanType: LoanType): Observable<EntityResponseType> {
        const copy = this.convert(loanType);
        return this.http.put<LoanType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LoanType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LoanType[]>> {
        const options = createRequestOption(req);
        return this.http.get<LoanType[]>(this. resourceUrl ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<LoanType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LoanType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LoanType[]>): HttpResponse<LoanType[]> {
        const jsonResponse: LoanType[] = res.body;
        const body: LoanType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LoanType.
     */
    private convertItemFromServer(loanType: LoanType): LoanType {
        const copy: LoanType = Object.assign(new LoanType(), loanType);
                copy.startDate = this.dateUtils
            .convertDateTimeFromServer(copy.startDate);
                copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(copy.finishDate);
        return copy;
    }

    /**
     * Convert a LoanType to a JSON which can be sent to the server.
     */
    private convert(loanType: LoanType): LoanType {
        const copy: LoanType = Object.assign({}, loanType);

        return copy;
    }
}
