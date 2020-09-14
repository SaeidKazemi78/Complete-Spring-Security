import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {CustomerType} from './customer-type.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<CustomerType>;

@Injectable({providedIn: 'root'})
export class CustomerTypeService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/customer-types';
    private resourceCostUrl = SERVER_API_URL + '/niopdcrate/api/costs';

    constructor(private http: HttpClient) {
    }

    create(customerType: CustomerType): Observable<EntityResponseType> {
        const copy = this.convert(customerType);
        return this.http.post<CustomerType>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customerType: CustomerType): Observable<EntityResponseType> {
        const copy = this.convert(customerType);
        return this.http.put<CustomerType>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerType>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CustomerType[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerType[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<CustomerType[]>) => this.convertArrayResponse(res));
    }

    queryByParentCostOrCostGroup(parentCostId: any, costGroupId: any): Observable<HttpResponse<CustomerType[]>> {
        let options;
        if (parentCostId) {
            options = new HttpParams().set('parentCostId', parentCostId);
        } else {
            options = new HttpParams().set('costGroupId', costGroupId);
        }
        return this.http.get<CustomerType[]>(`${this.resourceCostUrl}/customer-types/parent-cost/cost-group`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<CustomerType[]>) => this.convertArrayResponse(res));
    }

    queryByCustomerGroup(customerGroup: any): Observable<HttpResponse<CustomerType[]>> {
        return this.http.get<CustomerType[]>(`${this.resourceUrl}/customerGroup/${customerGroup.toString()}`, {
            observe: 'response'
        })
            .map((res: HttpResponse<CustomerType[]>) => this.convertArrayResponse(res));
    }

    queryByCustomerGroupList(customerGroups: any[]): Observable<HttpResponse<CustomerType[]>> {
        const params = new HttpParams().set('customerGroups', customerGroups.toString());
        return this.http.post<CustomerType[]>(`${this.resourceUrl}/list-customer-group`, customerGroups,{
            observe: 'response'
        })
            .map((res: HttpResponse<CustomerType[]>) => this.convertArrayResponse(res));
    }

    queryByCustomerGroupAndVehicleModelType(customerGroup: any, vehicleModelType: any): Observable<HttpResponse<CustomerType[]>> {
        return this.http.get<CustomerType[]>(`${this.resourceUrl}/${customerGroup.toString()}/${vehicleModelType.toString()}`, {
            observe: 'response'
        })
            .map((res: HttpResponse<CustomerType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerType[]>): HttpResponse<CustomerType[]> {
        const jsonResponse: CustomerType[] = res.body;
        const body: CustomerType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerType.
     */
    private convertItemFromServer(customerType: CustomerType): CustomerType {
        const copy: CustomerType = Object.assign({}, customerType);
        return copy;
    }

    /**
     * Convert a CustomerType to a JSON which can be sent to the server.
     */
    private convert(customerType: CustomerType): CustomerType {
        const copy: CustomerType = Object.assign({}, customerType);
        return copy;
    }
}
