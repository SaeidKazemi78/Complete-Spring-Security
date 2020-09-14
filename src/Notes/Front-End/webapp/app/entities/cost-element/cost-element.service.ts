import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {CostElement} from './cost-element.model';
import {createRequestOption} from '../../shared';
import {Product} from '../product';

export type EntityResponseType = HttpResponse<CostElement>;

@Injectable({ providedIn: 'root' })
export class CostElementService {

    private resourceUrl = SERVER_API_URL + 'niopdcrate/api/cost-elements';
    private resourceCostGroupUrl = 'niopdcrate/api/cost-groups';
    private resourceCostUrl = 'niopdcrate/api/costs';

    constructor(private http: HttpClient) {
    }

    create(costElement: CostElement): Observable<EntityResponseType> {
        const copy = this.convert(costElement);
        return this.http.post<CostElement>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(costElement: CostElement): Observable<EntityResponseType> {
        const copy = this.convert(costElement);
        return this.http.put<CostElement>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CostElement>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(costGroupId: any, req?: any): Observable<HttpResponse<CostElement[]>> {
        const options = createRequestOption(req);
        return this.http.get<CostElement[]>(this.resourceCostGroupUrl + '/' + costGroupId + '/cost-elements', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<CostElement[]>) => this.convertArrayResponse(res));
    }

    queryForProducts(costGroupId: number, costId: number): Observable<HttpResponse<Product[]>> {
        let params = new HttpParams()
            .set('costGroupId', costGroupId.toString());
        if (costId) {
            params = params.set('costId', costId.toString());
        }
        return this.http.get<Product[]>(`${this.resourceUrl}/products`, {params, observe: 'response'})
            .map((res: HttpResponse<Product[]>) => this.convertArrayResponse(res));
    }

    queryByCost(costId: any, req?: any): Observable<HttpResponse<CostElement[]>> {
        const options = createRequestOption(req);
        return this.http.get<CostElement[]>(this.resourceCostUrl + '/' + costId + '/cost-elements', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<CostElement[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CostElement = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CostElement[]>): HttpResponse<CostElement[]> {
        const jsonResponse: CostElement[] = res.body;
        const body: CostElement[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CostElement.
     */
    private convertItemFromServer(costElement: CostElement): CostElement {
        const copy: CostElement = Object.assign({}, costElement);
        return copy;
    }

    /**
     * Convert a CostElement to a JSON which can be sent to the server.
     */
    private convert(costElement: CostElement): CostElement {
        const copy: CostElement = Object.assign({}, costElement);
        return copy;
    }
}
