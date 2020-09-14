import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CustomerTypeProductConsumption } from './customer-type-product-consumption.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CustomerTypeProductConsumption>;

@Injectable({ providedIn: 'root' })
export class CustomerTypeProductConsumptionService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/customer-type-product-consumptions';
    private resourceProductUrl = SERVER_API_URL + 'niopdcbase/api/products';

    constructor(private http: HttpClient) { }

    create(customerTypeProductConsumption: CustomerTypeProductConsumption): Observable<EntityResponseType> {
        const copy = this.convert(customerTypeProductConsumption);
        return this.http.post<CustomerTypeProductConsumption>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customerTypeProductConsumption: CustomerTypeProductConsumption): Observable<EntityResponseType> {
        const copy = this.convert(customerTypeProductConsumption);
        return this.http.put<CustomerTypeProductConsumption>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerTypeProductConsumption>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(productId: any, req?: any): Observable<HttpResponse<CustomerTypeProductConsumption[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerTypeProductConsumption[]>(this.resourceProductUrl + '/' + productId + '/customer-type-product-consumptions' , { params: options, observe: 'response' })
            .map((res: HttpResponse<CustomerTypeProductConsumption[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerTypeProductConsumption = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerTypeProductConsumption[]>): HttpResponse<CustomerTypeProductConsumption[]> {
        const jsonResponse: CustomerTypeProductConsumption[] = res.body;
        const body: CustomerTypeProductConsumption[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerTypeProductConsumption.
     */
    private convertItemFromServer(customerTypeProductConsumption: CustomerTypeProductConsumption): CustomerTypeProductConsumption {
        const copy: CustomerTypeProductConsumption = Object.assign({}, customerTypeProductConsumption);
        return copy;
    }

    /**
     * Convert a CustomerTypeProductConsumption to a JSON which can be sent to the server.
     */
    private convert(customerTypeProductConsumption: CustomerTypeProductConsumption): CustomerTypeProductConsumption {
        const copy: CustomerTypeProductConsumption = Object.assign({}, customerTypeProductConsumption);
        return copy;
    }
}
