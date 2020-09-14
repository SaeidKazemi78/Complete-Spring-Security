import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';


import { CustomerVisit } from './customer-visit.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CustomerVisit>;

@Injectable()
export class CustomerVisitService {

    private resourceUrl = 'niopdcbase/api/customer-visits';
    
    private resourceCustomerUrl = 'niopdcbase/api/customers';

    constructor(private http: HttpClient) { }
    

    create(customerVisit: CustomerVisit): Observable<EntityResponseType> {
            const copy = this.convert(customerVisit);
        return this.http.post<CustomerVisit>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customerVisit: CustomerVisit): Observable<EntityResponseType> {
        const copy = this.convert(customerVisit);
        return this.http.put<CustomerVisit>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerVisit>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( customerId : any, req?: any): Observable<HttpResponse<CustomerVisit[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerVisit[]>(this.resourceCustomerUrl + '/' + customerId + '/customer-visits' ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<CustomerVisit[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerVisit = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerVisit[]>): HttpResponse<CustomerVisit[]> {
        const jsonResponse: CustomerVisit[] = res.body;
        const body: CustomerVisit[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerVisit.
     */
    private convertItemFromServer(customerVisit: CustomerVisit): CustomerVisit {
        const copy: CustomerVisit = Object.assign(new CustomerVisit(), customerVisit);
        return copy;
    }

    /**
     * Convert a CustomerVisit to a JSON which can be sent to the server.
     */
    private convert(customerVisit: CustomerVisit): CustomerVisit {
        const copy: CustomerVisit = Object.assign({}, customerVisit);

        return copy;
    }
}
