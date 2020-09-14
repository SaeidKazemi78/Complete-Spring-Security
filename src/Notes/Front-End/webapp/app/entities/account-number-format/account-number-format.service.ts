import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { AccountNumberFormat } from './account-number-format.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AccountNumberFormat>;

@Injectable({ providedIn: 'root' })
export class AccountNumberFormatService {

    private resourceUrl = 'niopdcaccounting/api/account-number-formats';

    constructor(private http: HttpClient) { }

    create(accountNumberFormat: AccountNumberFormat): Observable<EntityResponseType> {
            const copy = this.convert(accountNumberFormat);
        return this.http.post<AccountNumberFormat>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(accountNumberFormat: AccountNumberFormat): Observable<EntityResponseType> {
        const copy = this.convert(accountNumberFormat);
        return this.http.put<AccountNumberFormat>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AccountNumberFormat>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AccountNumberFormat[]>> {
        const options = createRequestOption(req);
        return this.http.get<AccountNumberFormat[]>(this. resourceUrl ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<AccountNumberFormat[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AccountNumberFormat = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AccountNumberFormat[]>): HttpResponse<AccountNumberFormat[]> {
        const jsonResponse: AccountNumberFormat[] = res.body;
        const body: AccountNumberFormat[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AccountNumberFormat.
     */
    private convertItemFromServer(accountNumberFormat: AccountNumberFormat): AccountNumberFormat {
        const copy: AccountNumberFormat = Object.assign(new AccountNumberFormat(), accountNumberFormat);
        return copy;
    }

    /**
     * Convert a AccountNumberFormat to a JSON which can be sent to the server.
     */
    private convert(accountNumberFormat: AccountNumberFormat): AccountNumberFormat {
        const copy: AccountNumberFormat = Object.assign({}, accountNumberFormat);

        return copy;
    }
}
