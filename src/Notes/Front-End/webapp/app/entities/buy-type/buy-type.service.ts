import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {BuyGroup, BuyType} from './buy-type.model';
import {createRequestOption} from '../../shared';
import {ContractType} from '../sell-contract';
import {TypeOfFuelReceipt} from '../order';

export type EntityResponseType = HttpResponse<BuyType>;

@Injectable({providedIn: 'root'})
export class BuyTypeService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/buy-types';
    private resourceCustomerUrl = SERVER_API_URL + '/niopdcbase/api/customers';
    private resourceSellContractUrl = SERVER_API_URL + '/niopdcbase/api/sell-contracts';

    constructor(private http: HttpClient) {
    }

    create(buyType: BuyType): Observable<EntityResponseType> {
        const copy = this.convert(buyType);
        return this.http.post<BuyType>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(buyType: BuyType): Observable<EntityResponseType> {
        const copy = this.convert(buyType);
        return this.http.put<BuyType>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BuyType>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getQuota(): Observable<EntityResponseType> {
        return this.http.get<BuyType>(this.resourceUrl + '/quota', {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getAllCredit(): Observable<HttpResponse<BuyType[]>> {
        return this.http.get<BuyType[]>(this.resourceUrl + '/credits', {observe: 'response'})
            .map((res: HttpResponse<BuyType[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BuyType[]>> {
        const options = createRequestOption(req);
        return this.http.get<BuyType[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<BuyType[]>) => this.convertArrayResponse(res));
    }

    queryForCustomerCredit(customerId: number, isCredit: boolean): Observable<HttpResponse<BuyType[]>> {
        let params = new HttpParams();
        if (customerId) {
            params = params.set('customerId', customerId.toString());
        }
        if (isCredit != null) {
            params = params.set('isCredit', isCredit.toString());
        }
        return this.http.get<BuyType[]>(this.resourceUrl + '/customer-credit', {params, observe: 'response'})
            .map((res: HttpResponse<BuyType[]>) => this.convertArrayResponse(res));
    }

    queryForSellContractProduct(customerId: number): Observable<HttpResponse<BuyType[]>> {
        let params;
        if (customerId) {
            params = new HttpParams().set('customerId', customerId.toString());
        }
        return this.http.get<BuyType[]>(this.resourceUrl + '/sell-contract-product', {params, observe: 'response'})
            .map((res: HttpResponse<BuyType[]>) => this.convertArrayResponse(res));
    }

    queryByDepotAndCustomerAnd(currencyRateGroupId: number, currencyId: number, depotId: number, customerId: number, personId: number) {
        return this.http.get(`${this.resourceCustomerUrl}/${currencyRateGroupId}/${currencyId}/${depotId}/${customerId}/${personId}/sell-contracts/sell-contract-products`,
            {observe: 'response'})
            .map((res: HttpResponse<BuyType[]>) => this.convertArrayResponse(res));
    }

    findBuyGroupBySellContractAndPersonAndCustomerAndDepotAndCurrency(sellContractId: number, personId: number, customerId: number, depotId: number, currencyId: number, orderType: string) {
        return this.http.get(`${this.resourceSellContractUrl}/${sellContractId}/person/${personId}/depot/${depotId}/currency/${currencyId}/${orderType}/buyGroup`,
            {observe: 'response', params: customerId ? new HttpParams().set('customerId', customerId + '') : null});
    }

    findTypeOfFuelReceiptBySellContractAndPersonAndCustomerAndDepotAndCurrencyAndBuyGroup(sellContractId: number, personId: number, customerId: number, depotId: number, currencyId: number, buyGroup: BuyGroup, orderType: string) {
        return this.http.get(`${this.resourceSellContractUrl}/${sellContractId}/person/${personId}/customer/${customerId}/depot/${depotId}/currency/${currencyId}/buyGroup/${buyGroup}/${orderType}/type-of-fuel-receipt`,
            {observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BuyType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BuyType[]>): HttpResponse<BuyType[]> {
        const jsonResponse: BuyType[] = res.body;
        const body: BuyType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BuyType.
     */
    private convertItemFromServer(buyType: BuyType): BuyType {
        const copy: BuyType = Object.assign({}, buyType);
        return copy;
    }

    /**
     * Convert a BuyType to a JSON which can be sent to the server.
     */
    private convert(buyType: BuyType): BuyType {
        const copy: BuyType = Object.assign({}, buyType);
        return copy;
    }
}
