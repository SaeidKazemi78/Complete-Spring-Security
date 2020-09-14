import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {Consumption} from './consumption.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<Consumption>;

@Injectable({ providedIn: 'root' })
export class ConsumptionService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/consumptions';
    private resourceCustomerTypeProductConsumptionUrl = SERVER_API_URL + 'niopdcbase/api/customer-type-product-consumptions';
    private resourceProductUrl = SERVER_API_URL + 'niopdcbase/api/products';

    constructor(private http: HttpClient) {
    }

    create(consumption: Consumption): Observable<EntityResponseType> {
        const copy = this.convert(consumption);
        return this.http.post<Consumption>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(consumption: Consumption): Observable<EntityResponseType> {
        const copy = this.convert(consumption);
        return this.http.put<Consumption>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Consumption>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Consumption[]>> {
        const options = createRequestOption(req);
        return this.http.get<Consumption[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<Consumption[]>) => this.convertArrayResponse(res));
    }

    queryByProductAndCustomer(productId, customerId): Observable<HttpResponse<Consumption[]>> {
        return this.http.get<Consumption[]>(`${this.resourceCustomerTypeProductConsumptionUrl}/${productId}/${customerId}`, {observe: 'response'})
            .map((res: HttpResponse<Consumption[]>) => this.convertArrayResponse(res));
    }

    queryByProduct(req?: any): Observable<HttpResponse<Consumption[]>> {
        const options = createRequestOption(req);
        return this.http.get<Consumption[]>(`${this.resourceProductUrl}/${req.customerId}/${req.productId}/consumptions`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Consumption[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Consumption = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Consumption[]>): HttpResponse<Consumption[]> {
        const jsonResponse: Consumption[] = res.body;
        const body: Consumption[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Consumption.
     */
    private convertItemFromServer(consumption: Consumption): Consumption {
        const copy: Consumption = Object.assign({}, consumption);
        return copy;
    }

    /**
     * Convert a Consumption to a JSON which can be sent to the server.
     */
    private convert(consumption: Consumption): Consumption {
        const copy: Consumption = Object.assign({}, consumption);
        return copy;
    }
}
