import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { AccountNumberItems } from './account-number-items.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AccountNumberItems>;

@Injectable({ providedIn: 'root' })
export class AccountNumberItemsService {

    private resourceUrl = 'niopdcaccounting/api/account-number-items';

    constructor(private http: HttpClient) { }

    create(accountNumberItems: AccountNumberItems): Observable<EntityResponseType> {
            const copy = this.convert(accountNumberItems);
        return this.http.post<AccountNumberItems>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(accountNumberItems: AccountNumberItems): Observable<EntityResponseType> {
        const copy = this.convert(accountNumberItems);
        return this.http.put<AccountNumberItems>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AccountNumberItems>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AccountNumberItems[]>> {
        const options = createRequestOption(req);
        return this.http.get<AccountNumberItems[]>(this. resourceUrl ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<AccountNumberItems[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AccountNumberItems = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AccountNumberItems[]>): HttpResponse<AccountNumberItems[]> {
        const jsonResponse: AccountNumberItems[] = res.body;
        const body: AccountNumberItems[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AccountNumberItems.
     */
    private convertItemFromServer(accountNumberItems: AccountNumberItems): AccountNumberItems {
        const copy: AccountNumberItems = Object.assign(new AccountNumberItems(), accountNumberItems);
        return copy;
    }

    /**
     * Convert a AccountNumberItems to a JSON which can be sent to the server.
     */
    private convert(accountNumberItems: AccountNumberItems): AccountNumberItems {
        const copy: AccountNumberItems = Object.assign({}, accountNumberItems);

        return copy;
    }
}
