import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {BoundaryCustomer, Customer, OldCuctomer} from './customer.model';
import {createRequestOption} from '../../shared';
import {CustomerOrderCapacity} from '../customer-order-capacity';
import {HttpCacheService} from '../../shared/http-cache/http-cache.service';

export type EntityResponseType = HttpResponse<Customer>;
export type BooleanResponseType = HttpResponse<boolean>;

@Injectable({providedIn: 'root'})
export class CustomerService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/customers';
    private resourcePersonUrl = SERVER_API_URL + 'niopdcbase/api/people';
    private resourceLocationUrl = SERVER_API_URL + 'niopdcbase/api/locations';

    constructor(private http: HttpClient, private httpCache: HttpCacheService, private dateUtils: JhiDateUtils) {
    }

    create(customer: Customer): Observable<EntityResponseType> {
        const copy = this.convert(customer);
        return this.http.post<Customer>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    createCar(customer: Customer): Observable<EntityResponseType> {
        const copy = this.convert(customer);
        return this.http.post<Customer>(this.resourceUrl + '/car', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    updateCreditAccount(customer: Customer): Observable<EntityResponseType> {
        const copy = this.convert(customer);
        return this.http.put<Customer>(`${this.resourceUrl}/credit-account`, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customer: Customer): Observable<EntityResponseType> {
        const copy = this.convert(customer);
        return this.http.put<Customer>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    updateCar(customer: Customer): Observable<EntityResponseType> {
        const copy = this.convert(customer);
        return this.http.put<Customer>(this.resourceUrl + '/car', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Customer>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findCache(id: number): Observable<EntityResponseType> {
        return this.httpCache.get<Customer>(`${this.resourceUrl}/${id}`, {observe: 'response'}, 'D')
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findOldCustomer(salesCode: any, nationalCode: any): Observable<HttpResponse<OldCuctomer>> {
        return this.http.get<OldCuctomer>(`${this.resourceUrl}/old-customer/${salesCode}/${nationalCode}`, {observe: 'response'})
            .map((res: HttpResponse<OldCuctomer>) => this.convertResponseOldCustomer(res));
    }

    findByRfId(rfId: any): Observable<HttpResponse<Customer[]>> {
        return this.http.get<Customer[]>(`${this.resourceUrl}/rf-id/${rfId}`, {observe: 'response'})
            .map((res: HttpResponse<Customer[]>) => this.convertArrayResponse(res));
    }

    findByPlaque(plaque: any): Observable<HttpResponse<Customer[]>> {
        return this.http.get<Customer[]>(`${this.resourceUrl}/plaque/${plaque}`, {observe: 'response'})
            .map((res: HttpResponse<Customer[]>) => this.convertArrayResponse(res));
    }

    findByTransitPlaque(transitPlaque: any, orderType: any): Observable<EntityResponseType> {
        return this.http.get<Customer>(`${this.resourceUrl}/transit-plaque/${transitPlaque}/${orderType}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Customer[]>> {
        const options = createRequestOption(req);
        return this.http.get<Customer[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<Customer[]>) => this.convertArrayResponse(res));
    }

    plaqueChange(boundaryCustomer: BoundaryCustomer): Observable<EntityResponseType> {
        const copy = this.convertBoundaryCustomer(boundaryCustomer);
        return this.http.put<BoundaryCustomer>(`${this.resourceUrl}/plaque-change`, copy, {observe: 'response'});
    }

    queryForCars(req?: any): Observable<HttpResponse<Customer[]>> {
        const options = createRequestOption(req);
        return this.http.get<Customer[]>(`${this.resourceUrl}/boundary-customers`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Customer[]>) => this.convertArrayResponse(res));
    }

    archive(id: number): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${this.resourceUrl}/boundary-customers/${id}/archive`, {observe: 'response'});
    }

    deArchive(id: number): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${this.resourceUrl}/boundary-customers/${id}/de-archive`, {observe: 'response'});
    }

    queryCustomerOrderCapacity(customerId: number, productId: number): Observable<HttpResponse<CustomerOrderCapacity[]>> {
        const params = new HttpParams().set('productId', productId.toString());
        return this.http.get<CustomerOrderCapacity[]>(`${this.resourceUrl}/${customerId}/customer-order-capacities`, {
            params,
            observe: 'response'
        })
            .map((res: HttpResponse<CustomerOrderCapacity[]>) => this.convertOrderCapacityArrayResponse(res));
    }

    queryGetListOfCarAmount(customerId): Observable<HttpResponse<number[]>> {
        return this.http.get<number[]>(`${this.resourceUrl}/${customerId}/get-list-car-amount`, {
            observe: 'response'
        })
            .map((res: HttpResponse<number[]>) => res);
    }

    queryByPerson(personId): Observable<HttpResponse<Customer[]>> {
        return this.http.get<Customer[]>(`${this.resourcePersonUrl}/${personId}/customers/`, {
            observe: 'response'
        })
            .map((res: HttpResponse<Customer[]>) => this.convertArrayResponse(res));
    }

    findByLocation(locationId: number): Observable<HttpResponse<Customer[]>> {
        return this.http.get<Customer[]>(`${this.resourceLocationUrl}/${locationId}/customers`, {observe: 'response'})
            .map((res: HttpResponse<Customer[]>) => this.convertArrayResponse(res));
    }

    checkActiveCustomer(ids: number[]): Observable<BooleanResponseType> {
        const params = new HttpParams().set('ids', ids.toString());
        return this.http.get<boolean>(`${this.resourceUrl}/active`, {params, observe: 'response'})
            .map((res: BooleanResponseType) => res);
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    hasFare(id: number): Observable<BooleanResponseType> {
        return this.http.get<boolean>(`${this.resourceUrl}/${id}/has-fare`, {observe: 'response'});
    }

    hasTransportContract(customerId: number): Observable<BooleanResponseType> {
        return this.http.get<boolean>(`${this.resourceUrl}/${customerId}/exist-transport-contracts`, {observe: 'response'});
    }

    public convertArrayResponse(res: HttpResponse<Customer[]>): HttpResponse<Customer[]> {
        const jsonResponse: Customer[] = res.body;
        const body: Customer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    public convertOrderCapacityArrayResponse(res: HttpResponse<CustomerOrderCapacity[]>): HttpResponse<CustomerOrderCapacity[]> {
        const jsonResponse: CustomerOrderCapacity[] = res.body;
        const body: CustomerOrderCapacity[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertOrderCapacityItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        if (!res.body) {
            return res;
        }
        const body: Customer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertResponseOldCustomer(res: HttpResponse<OldCuctomer>): HttpResponse<OldCuctomer> {
        const body: OldCuctomer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Customer.
     */
    private convertItemFromServer(customer: Customer): Customer {
        const copy: Customer = Object.assign({}, customer);
        copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(customer.registerDate);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(customer.startDate);
        copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(customer.finishDate);
        return copy;
    }

    private convertOrderCapacityItemFromServer(customer: CustomerOrderCapacity): CustomerOrderCapacity {
        const copy: CustomerOrderCapacity = Object.assign({}, customer);
        return copy;
    }

    /**
     * Convert a Customer to a JSON which can be sent to the server.
     */
    private convert(customer: Customer): Customer {
        const copy: Customer = Object.assign({}, customer);
        return copy;
    }

    private convertBoundaryCustomer(boundaryCustomer: BoundaryCustomer): BoundaryCustomer {
        const copy: BoundaryCustomer = Object.assign({}, boundaryCustomer);
        return copy;
    }

}
