import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {SERVER_API_URL} from '../../../app.constants';
import {CustomerPerson} from './sell-contract-customer-person-selector.model';
import {createRequestOption} from '../../index';

@Injectable()
export class SellContractCustomerPersonService {

    private resourceLocationUrl = SERVER_API_URL + 'niopdcbase/api/locations';

    constructor(private http: HttpClient) {
    }

    find(val: CustomerPerson): Observable<HttpResponse<CustomerPerson>> {
        return this.http.get<CustomerPerson>(`${this.resourceLocationUrl}/customer-person/${val.sellContractId}/${val.personId}`, {
            params: val.customerId ? new HttpParams().set('customerId', val.customerId + '') : null,
            observe: 'response'
        });
    }

    findForAirplane(mode: string, req?: any): Observable<HttpResponse<CustomerPerson[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerPerson[]>(`${this.resourceLocationUrl}/customer-person/${mode}`, {
            params: options, observe: 'response'
        }).map((res: HttpResponse<CustomerPerson[]>) => this.convertArrayResponse(res));
    }

    findByLocation(locationId: number, req?: any): Observable<HttpResponse<CustomerPerson[]>> {

        const options = createRequestOption(req);
        return this.http.get<CustomerPerson[]>(`${this.resourceLocationUrl}/${locationId}/customer-person`, {
            params: options, observe: 'response'
        }).map((res: HttpResponse<CustomerPerson[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<CustomerPerson[]>): HttpResponse<CustomerPerson[]> {
        const jsonResponse: CustomerPerson[] = res.body;
        const body: CustomerPerson[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    private convertItemFromServer(customerPerson: CustomerPerson): CustomerPerson {
        const copy: CustomerPerson = Object.assign({}, customerPerson);

        return copy;
    }

}
