import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {CustomerOrderCapacity} from './customer-order-capacity.model';
import {createRequestOption} from '../../shared';
import {CustomerCredit} from '../customer-credit/customer-credit.model';

export type EntityResponseType = HttpResponse<CustomerOrderCapacity>;

@Injectable({ providedIn: 'root' })
export class CustomerOrderCapacityService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/customer-order-capacities';
    private customersResourceUrl = SERVER_API_URL + 'niopdcbase/api/customers';

    constructor(private http: HttpClient) {
    }

    queryByCustomer(customerId: number, forceLoad?: Boolean, req?: any): Observable<HttpResponse<CustomerOrderCapacity[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerOrderCapacity[]>(this.customersResourceUrl + '/' + customerId + '/customer-order-capacities/' + forceLoad, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<CustomerOrderCapacity[]>) => this.convertArrayResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerOrderCapacity>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    active(id: number, isActive): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${this.resourceUrl}/${id}/` + (isActive ? 'active' : 'de-active'), {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerOrderCapacity = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerOrderCapacity[]>): HttpResponse<CustomerOrderCapacity[]> {
        const jsonResponse: CustomerOrderCapacity[] = res.body;
        const body: CustomerOrderCapacity[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerOrderCapacity.
     */
    private convertItemFromServer(customerOrderCapacity: CustomerOrderCapacity): CustomerOrderCapacity {
        const copy: CustomerOrderCapacity = Object.assign({}, customerOrderCapacity);

        return copy;
    }

    /**
     * Convert a CustomerOrderCapacity to a JSON which can be sent to the server.
     */
    private convert(customerOrderCapacity: CustomerOrderCapacity): CustomerOrderCapacity {
        const copy: CustomerOrderCapacity = Object.assign({}, customerOrderCapacity);
        return copy;
    }
}
