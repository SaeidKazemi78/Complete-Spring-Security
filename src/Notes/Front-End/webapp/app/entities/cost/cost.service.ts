import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Cost } from './cost.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Cost>;

@Injectable({ providedIn: 'root' })
export class CostService {

    private resourceUrl =  SERVER_API_URL + 'niopdcrate/api/costs';

    private resourceCostGroupUrl = SERVER_API_URL + 'niopdcrate/api/cost-groups';

    constructor(private http: HttpClient) { }

    create(cost: Cost): Observable<EntityResponseType> {
        const copy = this.convert(cost);
        return this.http.post<Cost>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cost: Cost): Observable<EntityResponseType> {
        const copy = this.convert(cost);
        return this.http.put<Cost>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Cost>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(costGroupId: any, req?: any): Observable<HttpResponse<Cost[]>> {
        const options = createRequestOption(req);
        return this.http.get<Cost[]>(this.resourceCostGroupUrl + '/' + costGroupId + '/costs', { params: options, observe: 'response' })
            .map((res: HttpResponse<Cost[]>) => this.convertArrayResponse(res));
    }

    queryByCost(costId: any, req?: any): Observable<HttpResponse<Cost[]>> {
        const options = createRequestOption(req);
        return this.http.get<Cost[]>(this.resourceUrl + '/' + costId + '/costs', { params: options, observe: 'response' })
            .map((res:  HttpResponse<Cost[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Cost = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Cost[]>): HttpResponse<Cost[]> {
        const jsonResponse: Cost[] = res.body;
        const body: Cost[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Cost.
     */
    private convertItemFromServer(cost: Cost): Cost {
        const copy: Cost = Object.assign({}, cost);
        return copy;
    }

    /**
     * Convert a Cost to a JSON which can be sent to the server.
     */
    private convert(cost: Cost): Cost {
        const copy: Cost = Object.assign({}, cost);
        return copy;
    }
}
