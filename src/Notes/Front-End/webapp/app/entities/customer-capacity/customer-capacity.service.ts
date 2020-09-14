import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { CustomerCapacity } from './customer-capacity.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CustomerCapacity>;

@Injectable({ providedIn: 'root' })
export class CustomerCapacityService {

    private resourceUrl = 'niopdcbase/api/customer-capacities';

    private resourceCustomerUrl = 'niopdcbase/api/customers';

    constructor(private http: HttpClient) { }

    create(customerCapacity: CustomerCapacity): Observable<EntityResponseType> {
            const copy = this.convert(customerCapacity);
        return this.http.post<CustomerCapacity>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customerCapacity: CustomerCapacity): Observable<EntityResponseType> {
        const copy = this.convert(customerCapacity);
        return this.http.put<CustomerCapacity>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerCapacity>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( customerId?: any, req?: any): Observable<HttpResponse<CustomerCapacity[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerCapacity[]>(this.resourceCustomerUrl + '/' + customerId + '/customer-capacities' ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<CustomerCapacity[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerCapacity = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerCapacity[]>): HttpResponse<CustomerCapacity[]> {
        const jsonResponse: CustomerCapacity[] = res.body;
        const body: CustomerCapacity[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerCapacity.
     */
    private convertItemFromServer(customerCapacity: CustomerCapacity): CustomerCapacity {
        const copy: CustomerCapacity = Object.assign(new CustomerCapacity(), customerCapacity);
        return copy;
    }

    /**
     * Convert a CustomerCapacity to a JSON which can be sent to the server.
     */
    private convert(customerCapacity: CustomerCapacity): CustomerCapacity {
        const copy: CustomerCapacity = Object.assign({}, customerCapacity);

        return copy;
    }
}
