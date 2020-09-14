import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {Product} from './product.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<Product>;

@Injectable({ providedIn: 'root' })
export class ProductService {

    private resourceUrl = SERVER_API_URL + '/niopdcbase/api/products';
    private resourceCostUrl = SERVER_API_URL + '/niopdcrate/api/costs';
    private resourceCustomerUrl = 'niopdcbase/api/customers';
    private resourceDepotUrl = 'niopdcbase/api/depots';

    constructor(private http: HttpClient) {
    }

    create(product: Product): Observable<EntityResponseType> {
        const copy = this.convert(product);
        return this.http.post<Product>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(product: Product): Observable<EntityResponseType> {
        const copy = this.convert(product);
        return this.http.put<Product>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Product>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    queryByDepot(req?: any): Observable<HttpResponse<Product[]>> {
        const options = createRequestOption(req);
        return this.http.get<Product[]>(`${this.resourceDepotUrl}/${req.depotId}/products`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Product[]>) => this.convertArrayResponse(res));
    }

    queryByParentCostOrCostGroup(parentCostId: any, costGroupId: any): Observable<HttpResponse<Product[]>> {
        let options;
        if (parentCostId) {
            options = new HttpParams().set('parentCostId', parentCostId);
        } else {
            options = new HttpParams().set('costGroupId', costGroupId);
        }
        return this.http.get<Product[]>(`${this.resourceCostUrl}/products/parent-cost/cost-group`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Product[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Product[]>> {
        const options = createRequestOption(req);
        return this.http.get<Product[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<Product[]>) => this.convertArrayResponse(res));
    }


    queryCustomer(customerId, date): Observable<HttpResponse<Product[]>> {
        const params = new HttpParams().set('date', date.toISOString())
            .set('customerId', customerId);
        return this.http.get<Product[]>(`${this.resourceUrl}/customer`, {params, observe: 'response'})
            .map((res: HttpResponse<Product[]>) => this.convertArrayResponse(res));
    }

    queryByCustomerGroup(customerGroup, req?: any): Observable<HttpResponse<Product[]>> {
        const options = createRequestOption(req);
        return this.http.get<Product[]>(`${this.resourceUrl}/customer-group/${customerGroup}`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Product[]>) => this.convertArrayResponse(res));
    }

    queryByHasContainer(hasContainer: boolean): Observable<HttpResponse<Product[]>> {
        return this.http.get<Product[]>(`${this.resourceUrl}/has-container/${hasContainer}`, {observe: 'response'})
            .map((res: HttpResponse<Product[]>) => this.convertArrayResponse(res));
    }

    queryByHasContainerAndRateGroup(rateGroupId, hasContainer: boolean): Observable<HttpResponse<Product[]>> {
        return this.http.get<Product[]>(`${this.resourceUrl}/rate-groups/${rateGroupId}/has-container/${hasContainer}`, {observe: 'response'})
            .map((res: HttpResponse<Product[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Product = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Product[]>): HttpResponse<Product[]> {
        const jsonResponse: Product[] = res.body;
        const body: Product[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Product.
     */
    private convertItemFromServer(product: Product): Product {
        const copy: Product = Object.assign({}, product);
        return copy;
    }

    /**
     * Convert a Product to a JSON which can be sent to the server.
     */
    private convert(product: Product): Product {
        const copy: Product = Object.assign({}, product);
        return copy;
    }

}
