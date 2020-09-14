import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { Bank } from './bank.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Bank>;

@Injectable({ providedIn: 'root' })
export class BankService {

    private resourceUrl = 'niopdcaccounting/api/banks';

    constructor(private http: HttpClient) { }

    create(bank: Bank): Observable<EntityResponseType> {
            const copy = this.convert(bank);
        return this.http.post<Bank>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bank: Bank): Observable<EntityResponseType> {
        const copy = this.convert(bank);
        return this.http.put<Bank>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Bank>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Bank[]>> {
        const options = createRequestOption(req);
        return this.http.get<Bank[]>(this. resourceUrl ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<Bank[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Bank = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Bank[]>): HttpResponse<Bank[]> {
        const jsonResponse: Bank[] = res.body;
        const body: Bank[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Bank.
     */
    private convertItemFromServer(bank: Bank): Bank {
        const copy: Bank = Object.assign(new Bank(), bank);
        return copy;
    }

    /**
     * Convert a Bank to a JSON which can be sent to the server.
     */
    private convert(bank: Bank): Bank {
        const copy: Bank = Object.assign({}, bank);

        return copy;
    }
}
