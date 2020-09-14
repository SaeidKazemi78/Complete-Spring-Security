import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CustomerStationInfo } from './customer-station-info.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CustomerStationInfo>;

@Injectable({ providedIn: 'root' })
export class CustomerStationInfoService {

    private resourceUrl = 'niopdcbase/api/customer-station-infos';

    private resourceCustomerUrl = 'niopdcbase/api/customers';

    constructor(private http: HttpClient) { }

    create(customerStationInfo: CustomerStationInfo): Observable<EntityResponseType> {
            const copy = this.convert(customerStationInfo);
        return this.http.post<CustomerStationInfo>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customerStationInfo: CustomerStationInfo): Observable<EntityResponseType> {
        const copy = this.convert(customerStationInfo);
        return this.http.put<CustomerStationInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerStationInfo>(`${this.resourceCustomerUrl}/${id}/customer-station-info`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( customerId: any, req?: any): Observable<HttpResponse<CustomerStationInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerStationInfo[]>(this.resourceCustomerUrl + '/' + customerId + '/customer-station-infos' ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<CustomerStationInfo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerStationInfo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerStationInfo[]>): HttpResponse<CustomerStationInfo[]> {
        const jsonResponse: CustomerStationInfo[] = res.body;
        const body: CustomerStationInfo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerStationInfo.
     */
    private convertItemFromServer(customerStationInfo: CustomerStationInfo): CustomerStationInfo {
        const copy: CustomerStationInfo = Object.assign(new CustomerStationInfo(), customerStationInfo);
        return copy;
    }

    /**
     * Convert a CustomerStationInfo to a JSON which can be sent to the server.
     */
    private convert(customerStationInfo: CustomerStationInfo): CustomerStationInfo {
        const copy: CustomerStationInfo = Object.assign({}, customerStationInfo);

        return copy;
    }
}
