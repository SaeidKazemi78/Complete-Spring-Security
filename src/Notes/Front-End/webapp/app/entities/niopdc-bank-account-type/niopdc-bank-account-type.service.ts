import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NiopdcBankAccountType } from './niopdc-bank-account-type.model';
import { createRequestOption } from '../../shared';
import {HttpCacheService} from '../../shared/http-cache/http-cache.service';

export type EntityResponseType = HttpResponse<NiopdcBankAccountType>;

@Injectable({ providedIn: 'root' })
export class NiopdcBankAccountTypeService {

    private resourceUrl = 'niopdcpayment/api/niopdc-bank-account-types';

    constructor(private http: HttpClient, private httpCache: HttpCacheService) { }

    create(niopdcBankAccountType: NiopdcBankAccountType): Observable<EntityResponseType> {
            const copy = this.convert(niopdcBankAccountType);
        return this.http.post<NiopdcBankAccountType>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(niopdcBankAccountType: NiopdcBankAccountType): Observable<EntityResponseType> {
        const copy = this.convert(niopdcBankAccountType);
        return this.http.put<NiopdcBankAccountType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<NiopdcBankAccountType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findOrCache(id: number): Observable<EntityResponseType> {
        return this.httpCache.get<NiopdcBankAccountType>(`${this.resourceUrl}/${id}`, { observe: 'response'}, 'D', 'NiopdcBankAccountType')
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<NiopdcBankAccountType[]>> {
        const options = createRequestOption(req);
        return this.http.get<NiopdcBankAccountType[]>(this. resourceUrl ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<NiopdcBankAccountType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: NiopdcBankAccountType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<NiopdcBankAccountType[]>): HttpResponse<NiopdcBankAccountType[]> {
        const jsonResponse: NiopdcBankAccountType[] = res.body;
        const body: NiopdcBankAccountType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to NiopdcBankAccountType.
     */
    private convertItemFromServer(niopdcBankAccountType: NiopdcBankAccountType): NiopdcBankAccountType {
        const copy: NiopdcBankAccountType = Object.assign(new NiopdcBankAccountType(), niopdcBankAccountType);
        return copy;
    }

    /**
     * Convert a NiopdcBankAccountType to a JSON which can be sent to the server.
     */
    private convert(niopdcBankAccountType: NiopdcBankAccountType): NiopdcBankAccountType {
        const copy: NiopdcBankAccountType = Object.assign({}, niopdcBankAccountType);

        return copy;
    }
}
