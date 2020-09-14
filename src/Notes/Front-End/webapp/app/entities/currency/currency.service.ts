import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {Currency} from './currency.model';
import {createRequestOption} from '../../shared';
import {ContractType} from '../sell-contract';
import {OrderType} from '../order';
import {HttpCacheService} from '../../shared/http-cache/http-cache.service';

export type EntityResponseType = HttpResponse<Currency>;

@Injectable({providedIn: 'root'})
export class CurrencyService {

    private resourceUrl = SERVER_API_URL + 'niopdcrate/api/currencies';
    private resourceNiopdcConfigUrl = SERVER_API_URL + 'niopdcbase/api/niopdc-configs';
    private resourceCustomerUrl = SERVER_API_URL + 'niopdcbase/api/customers';
    private resourceSellContractUrl = SERVER_API_URL + 'niopdcbase/api/sell-contracts';

    constructor(private http: HttpClient, private httpCache: HttpCacheService) {
    }

    create(currency: Currency): Observable<EntityResponseType> {
        const copy = this.convert(currency);
        return this.http.post<Currency>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(currency: Currency): Observable<EntityResponseType> {
        const copy = this.convert(currency);
        return this.http.put<Currency>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Currency>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Currency[]>> {
        const options = createRequestOption(req);
        return this.http.get<Currency[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<Currency[]>) => this.convertArrayResponse(res));
    }

    queryCache(req?: any): Observable<HttpResponse<Currency[]>> {
        const options = createRequestOption(req);
        return this.httpCache.get<Currency[]>(this.resourceUrl, {params: options, observe: 'response'}, 'm')
            .map((res: HttpResponse<Currency[]>) => this.convertArrayResponse(res));
    }

    queryByConfig(configType): Observable<HttpResponse<Currency[]>> {
        const params = new HttpParams().set('configType', configType);
        return this.http.get<Currency[]>(`${this.resourceNiopdcConfigUrl}/currency`, {params, observe: 'response'})
            .map((res: HttpResponse<Currency[]>) => this.convertArrayResponse(res));
    }

    findBySellContractAndPersonAndCustomerAndDepot(sellContractId: number, personId: number, customerId: number, depotId: number, orderType: string): Observable<HttpResponse<Currency[]>> {
        return this.http.get<Currency[]>(`${this.resourceSellContractUrl}/${sellContractId}/person/${personId}/depot/${depotId}/${orderType}/currencies`, {
            observe: 'response', params: customerId ? new HttpParams().set('customerId', customerId + '') : null
        })
            .map((res: HttpResponse<Currency[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Currency = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Currency[]>): HttpResponse<Currency[]> {
        const jsonResponse: Currency[] = res.body;
        const body: Currency[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Currency.
     */
    private convertItemFromServer(currency: Currency): Currency {
        const copy: Currency = Object.assign({}, currency);
        return copy;
    }

    /**
     * Convert a Currency to a JSON which can be sent to the server.
     */
    private convert(currency: Currency): Currency {
        const copy: Currency = Object.assign({}, currency);
        return copy;
    }
}
