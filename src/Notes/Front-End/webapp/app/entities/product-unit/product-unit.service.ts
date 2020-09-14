import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProductUnit } from './product-unit.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProductUnit>;

@Injectable({ providedIn: 'root' })
export class ProductUnitService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/product-units';

    constructor(private http: HttpClient) { }

    create(productUnit: ProductUnit): Observable<EntityResponseType> {
        const copy = this.convert(productUnit);
        return this.http.post<ProductUnit>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(productUnit: ProductUnit): Observable<EntityResponseType> {
        const copy = this.convert(productUnit);
        return this.http.put<ProductUnit>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductUnit>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductUnit[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductUnit[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductUnit[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductUnit = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductUnit[]>): HttpResponse<ProductUnit[]> {
        const jsonResponse: ProductUnit[] = res.body;
        const body: ProductUnit[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductUnit.
     */
    private convertItemFromServer(productUnit: ProductUnit): ProductUnit {
        const copy: ProductUnit = Object.assign({}, productUnit);
        return copy;
    }

    /**
     * Convert a ProductUnit to a JSON which can be sent to the server.
     */
    private convert(productUnit: ProductUnit): ProductUnit {
        const copy: ProductUnit = Object.assign({}, productUnit);

        return copy;
    }
}
