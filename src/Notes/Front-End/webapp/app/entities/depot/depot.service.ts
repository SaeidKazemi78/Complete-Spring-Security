import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {Depot} from './depot.model';
import {createRequestOption} from '../../shared';
import {ContractType} from '../sell-contract';
import {OrderType} from '../order';

export type EntityResponseType = HttpResponse<Depot>;

@Injectable({ providedIn: 'root' })
export class DepotService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/depots';
    private resourceReceivedProductUrl = SERVER_API_URL + 'niopdcao/api/received-products';
    private resourceSendProductUrl = SERVER_API_URL + 'niopdcao/api/send-products';
    private resourceCustomerUrl = SERVER_API_URL + 'niopdcbase/api/customers';
    private resourceSellContractCustomerUrl = SERVER_API_URL + 'niopdcbase/api/sell-contract-customers';
    private resourceSellContractUrl = SERVER_API_URL + 'niopdcbase/api/sell-contracts';
    private resourceLocationUrl = SERVER_API_URL + 'niopdcbase/api/locations';

    constructor(private http: HttpClient) {
    }

    create(depot: Depot): Observable<EntityResponseType> {
        const copy = this.convert(depot);
        return this.http.post<Depot>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(depot: Depot): Observable<EntityResponseType> {
        const copy = this.convert(depot);
        return this.http.put<Depot>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Depot>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByRefuelCenterId(id: number): Observable<EntityResponseType> {
        return this.http.get<Depot>(`${this.resourceUrl}/refuel-center/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Depot[]>> {
        const options = createRequestOption(req);
        return this.http.get<Depot[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<Depot[]>) => this.convertArrayResponse(res));
    }

    queryForReceivedProduct(dayDepotId: number): Observable<HttpResponse<Depot[]>> {
        return this.http.get<Depot[]>(`${this.resourceReceivedProductUrl}/depots/${dayDepotId}`, {observe: 'response'})
            .map((res: HttpResponse<Depot[]>) => this.convertArrayResponse(res));
    }

    queryForSendProduct(dayDepotId: number): Observable<HttpResponse<Depot[]>> {
        return this.http.get<Depot[]>(`${this.resourceSendProductUrl}/depots/${dayDepotId}`, {observe: 'response'})
            .map((res: HttpResponse<Depot[]>) => this.convertArrayResponse(res));
    }

    queryByCustomer(req?: any): Observable<HttpResponse<Depot[]>> {
        const options = createRequestOption(req);
        return this.http.get(`${this.resourceCustomerUrl}/${req.customerId}/depot`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Depot[]>) => this.convertArrayResponse(res));
    }

    findBySellContractAndPersonAndCustomer(sellContractId: number, personId: number, customerId: number, orderType: string): Observable<HttpResponse<Depot[]>> {

        return this.http.get(`${this.resourceSellContractUrl}/${sellContractId}/person/${personId}/${orderType}/depots`, {
            params: customerId ? new HttpParams().set('customerId', customerId + '') : null,
            observe: 'response'
        })
            .map((res: HttpResponse<Depot[]>) => this.convertArrayResponse(res));
    }

    queryBySellContract(sellContractId): Observable<HttpResponse<Depot[]>> {
        return this.http.get(`${this.resourceSellContractUrl}/${sellContractId}/depot`, {observe: 'response'})
            .map((res: HttpResponse<Depot[]>) => this.convertArrayResponse(res));
    }

    queryBySellContractCustomer(sellContractCustomerId: number): Observable<HttpResponse<Depot[]>> {
        return this.http.get(`${this.resourceSellContractCustomerUrl}/${sellContractCustomerId}/depot`, {observe: 'response'})
            .map((res: HttpResponse<Depot[]>) => this.convertArrayResponse(res));
    }

    queryByLocationAndContractType(location: any, contractType: any): Observable<HttpResponse<Depot[]>> {
        return this.http.get(`${this.resourceLocationUrl}/${location}/depots/${contractType}`, {observe: 'response'})
            .map((res: HttpResponse<Depot[]>) => this.convertArrayResponse(res));
    }

    queryByLocation(location: any): Observable<HttpResponse<Depot[]>> {
        return this.http.get(`${this.resourceLocationUrl}/${location}/depots`, {observe: 'response'})
            .map((res: HttpResponse<Depot[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Depot = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Depot[]>): HttpResponse<Depot[]> {
        const jsonResponse: Depot[] = res.body;
        const body: Depot[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Depot.
     */
    private convertItemFromServer(depot: Depot): Depot {
        const copy: Depot = Object.assign({}, depot);
        return copy;
    }

    /**
     * Convert a Depot to a JSON which can be sent to the server.
     */
    private convert(depot: Depot): Depot {
        const copy: Depot = Object.assign({}, depot);
        return copy;
    }
}
