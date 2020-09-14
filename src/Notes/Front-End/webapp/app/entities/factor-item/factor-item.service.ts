import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FactorItem } from './factor-item.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FactorItem>;

@Injectable({providedIn: 'root'})
export class FactorItemService {

    private resourceUrl =  SERVER_API_URL + 'niopdcaccounting/api/factor-items';
    private resourceFactorUrl = 'niopdcaccounting/api/factors';
    constructor(private http: HttpClient) { }

    create(factorItem: FactorItem): Observable<EntityResponseType> {
        const copy = this.convert(factorItem);
        return this.http.post<FactorItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(factorItem: FactorItem): Observable<EntityResponseType> {
        const copy = this.convert(factorItem);
        return this.http.put<FactorItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FactorItem>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( factorId: any, req?: any): Observable<HttpResponse<FactorItem[]>> {
        const options = createRequestOption(req);
        return this.http.get<FactorItem[]>(this.resourceFactorUrl + '/' + factorId + '/factor-items' , { params: options, observe: 'response' })
            .map((res: HttpResponse<FactorItem[]>) => this.convertArrayResponse(res));
    }

    queryForAggregate( factorId: any, req?: any): Observable<HttpResponse<FactorItem[]>> {
        const options = createRequestOption(req);
        return this.http.get<FactorItem[]>(this.resourceFactorUrl + '/' + factorId + '/aggregate' , { params: options, observe: 'response' })
            .map((res: HttpResponse<FactorItem[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FactorItem = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FactorItem[]>): HttpResponse<FactorItem[]> {
        const jsonResponse: FactorItem[] = res.body;
        const body: FactorItem[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FactorItem.
     */
    private convertItemFromServer(factorItem: FactorItem): FactorItem {
        const copy: FactorItem = Object.assign({}, factorItem);
        return copy;
    }

    /**
     * Convert a FactorItem to a JSON which can be sent to the server.
     */
    private convert(factorItem: FactorItem): FactorItem {
        const copy: FactorItem = Object.assign({}, factorItem);
        return copy;
    }
}
