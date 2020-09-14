import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {CurrencyRateGroup} from './currency-rate-group.model';
import {createRequestOption} from '../../shared';
import {ContractType} from '../sell-contract';
import {Country} from '../country/country.model';

export type EntityResponseType = HttpResponse<CurrencyRateGroup>;

@Injectable({ providedIn: 'root' })
export class CurrencyRateGroupService {

    private resourceUrl = SERVER_API_URL + 'niopdcrate/api/currency-rate-groups';
    private resourceNiopdcConfigUrl = SERVER_API_URL + 'niopdcbase/api/niopdc-configs';
    private resourceCustomerUrl = SERVER_API_URL + 'niopdcbase/api/customers';
    private resourceSellContractProductUrl = SERVER_API_URL + 'niopdcbase/api/sell-contract-products';

    constructor(private http: HttpClient) {
    }

    create(currencyRateGroup: CurrencyRateGroup): Observable<EntityResponseType> {
        const copy = this.convert(currencyRateGroup);
        return this.http.post<CurrencyRateGroup>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(currencyRateGroup: CurrencyRateGroup): Observable<EntityResponseType> {
        const copy = this.convert(currencyRateGroup);
        return this.http.put<CurrencyRateGroup>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CurrencyRateGroup>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CurrencyRateGroup[]>> {
        const options = createRequestOption(req);
        return this.http.get<CurrencyRateGroup[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<CurrencyRateGroup[]>) => this.convertArrayResponse(res));
    }

    findByConfig(configType): Observable<EntityResponseType> {
        const params = new HttpParams().set('configType', configType);
        return this.http.get<Country>(`${this.resourceNiopdcConfigUrl}/currency-rate-group`, {
            params,
            observe: 'response'
        })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByCurrencyAndDepotAndCustomerAndPerson(currencyId: any, depotId: number, customerId: number, personId: number, sellContractId: number, contractType: ContractType)
        : Observable<HttpResponse<CurrencyRateGroup[]>> {
        let params;
        if (customerId == null) {
            params = new HttpParams()
                .set('contractType', contractType.toString())
                .set('sellContractId', sellContractId.toString())
            ;
        } else {
            params = new HttpParams()
                .set('customerId', customerId.toString())
                .set('sellContractId', sellContractId.toString())
                .set('contractType', contractType.toString())
            ;
        }

        return this.http.get<CurrencyRateGroup[]>(`${this.resourceCustomerUrl}/${currencyId}/${depotId}/${personId}/sell-contracts/currency-rate-groups`,
            {params, observe: 'response'})
            .map((res: HttpResponse<CurrencyRateGroup[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CurrencyRateGroup = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CurrencyRateGroup[]>): HttpResponse<CurrencyRateGroup[]> {
        const jsonResponse: CurrencyRateGroup[] = res.body;
        const body: CurrencyRateGroup[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CurrencyRateGroup.
     */
    private convertItemFromServer(currencyRateGroup: CurrencyRateGroup): CurrencyRateGroup {
        const copy: CurrencyRateGroup = Object.assign({}, currencyRateGroup);
        return copy;
    }

    /**
     * Convert a CurrencyRateGroup to a JSON which can be sent to the server.
     */
    private convert(currencyRateGroup: CurrencyRateGroup): CurrencyRateGroup {
        const copy: CurrencyRateGroup = Object.assign({}, currencyRateGroup);
        return copy;
    }
}
