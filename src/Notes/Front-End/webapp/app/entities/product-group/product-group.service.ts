import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProductGroup } from './product-group.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProductGroup>;

@Injectable({ providedIn: 'root' })
export class ProductGroupService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/product-groups';

    constructor(private http: HttpClient) { }

    create(productGroup: ProductGroup): Observable<EntityResponseType> {
        const copy = this.convert(productGroup);
        return this.http.post<ProductGroup>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(productGroup: ProductGroup): Observable<EntityResponseType> {
        const copy = this.convert(productGroup);
        return this.http.put<ProductGroup>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductGroup>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductGroup[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductGroup[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductGroup[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductGroup = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductGroup[]>): HttpResponse<ProductGroup[]> {
        const jsonResponse: ProductGroup[] = res.body;
        const body: ProductGroup[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductGroup.
     */
    private convertItemFromServer(productGroup: ProductGroup): ProductGroup {
        const copy: ProductGroup = Object.assign({}, productGroup);
        return copy;
    }

    /**
     * Convert a ProductGroup to a JSON which can be sent to the server.
     */
    private convert(productGroup: ProductGroup): ProductGroup {
        const copy: ProductGroup = Object.assign({}, productGroup);

        return copy;
    }
}
