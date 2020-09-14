import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';
import {CustomerAccounting} from './customer-accounting.model';
import {Customer} from '../customer/customer.model';

export type EntityResponseType = HttpResponse<CustomerAccounting>;

@Injectable({ providedIn: 'root' })
export class CustomerAccountingService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/sell-contracts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    update(CustomerAccounting: CustomerAccounting): Observable<EntityResponseType> {
        const copy = this.convert(CustomerAccounting);
        return this.http.put<CustomerAccounting>(this.resourceUrl + '/customer-accounting', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerAccounting = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    find(personId: number, customerId: number): Observable<EntityResponseType> {
        return this.http.get<Customer>(`${this.resourceUrl}/person/${personId}/customer/${customerId}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    /**
     * Convert a returned JSON object to CustomerAccounting.
     */
    private convertItemFromServer(CustomerAccounting: CustomerAccounting): CustomerAccounting {
        const copy: CustomerAccounting = Object.assign({}, CustomerAccounting);

        return copy;
    }

    /**
     * Convert a CustomerAccounting to a JSON which can be sent to the server.
     */
    private convert(CustomerAccounting: CustomerAccounting): CustomerAccounting {
        const copy: CustomerAccounting = Object.assign({}, CustomerAccounting);

        return copy;
    }
}
