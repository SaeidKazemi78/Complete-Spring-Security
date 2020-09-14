import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {SellContractProduct} from './sell-contract-product.model';
import {createRequestOption} from '../../shared';
import {RateGroup, RateGroupService} from '../rate-group';
import {CurrencyRateGroup, CurrencyRateGroupService} from '../currency-rate-group';
import {ContractType} from '../sell-contract';
import {JhiDateUtils} from 'ng-jhipster';

export type EntityResponseType = HttpResponse<SellContractProduct>;

@Injectable({ providedIn: 'root' })
export class SellContractProductService {

    currencyRateGroupTitleMap = new Map<number, string>();
    rateGroupTitleMap = new Map<number, string>();
    private resourceUrl = SERVER_API_URL + '/niopdcbase/api/sell-contract-products';
    private resourceSellContractUrl = SERVER_API_URL + '/niopdcbase/api/sell-contracts';
    private resourceCustomerUrl = SERVER_API_URL + '/niopdcbase/api/customers';

    constructor(private http: HttpClient,
                private dateUtils: JhiDateUtils,
                private currencyRateGroupService: CurrencyRateGroupService,
                private rateGroupService: RateGroupService) {
    }

    create(sellContractProduct: SellContractProduct): Observable<EntityResponseType> {
        const copy = this.convert(sellContractProduct);
        return this.http.post<SellContractProduct>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sellContractProduct: SellContractProduct): Observable<EntityResponseType> {
        const copy = this.convert(sellContractProduct);
        console.log(copy.startDate);

        return this.http.put<SellContractProduct>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SellContractProduct>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findSellContractCustomerIdBySellContractProduct(id: number): Observable<number> {
        return this.http.get<number>(`${this.resourceUrl}/${id}/get-sell-contract-customer-id`, {observe: 'response'})
            .map(res => {
                return res.body;
            });
    }

    query(sellContractId: any, req?: any): Observable<HttpResponse<SellContractProduct[]>> {
        const options = createRequestOption(req);
        return this.http.get<SellContractProduct[]>(this.resourceSellContractUrl + '/' + sellContractId + '/sell-contract-products', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<SellContractProduct[]>) => this.convertArrayResponse(res));
    }

    queryByhaveQuotaCredit(sellContractId: any, req?: any): Observable<HttpResponse<SellContractProduct[]>> {
        const options = createRequestOption(req);
        return this.http.get<SellContractProduct[]>(`${this.resourceUrl}/${sellContractId}/sell-contract/have-quota`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<SellContractProduct[]>) => this.convertArrayResponse(res));
    }

    queryForTransferQuota(fromSellContractProductId: any, req?: any): Observable<HttpResponse<SellContractProduct[]>> {
        const options = createRequestOption(req);
        return this.http.get<SellContractProduct[]>(`${this.resourceUrl}/transfer-quota/${fromSellContractProductId}`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<SellContractProduct[]>) => this.convertArrayResponse(res));
    }

    queryByCustomerId(customerId: any, req?: any): Observable<HttpResponse<SellContractProduct[]>> {
        const options = createRequestOption(req);
        return this.http.get<SellContractProduct[]>(this.resourceUrl + '/customer/' + customerId + '/sell-contract-products', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<SellContractProduct[]>) => this.convertArrayResponse(res));
    }


    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SellContractProduct = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SellContractProduct[]>): HttpResponse<SellContractProduct[]> {
        const jsonResponse: SellContractProduct[] = res.body;
        const body: SellContractProduct[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SellContractProduct.
     */
    private convertItemFromServer(sellContractProduct: SellContractProduct): SellContractProduct {
        const copy: SellContractProduct = Object.assign({}, sellContractProduct);
        // copy.startDate = this.dateUtils
        //     .convertDateTimeFromServer(sellContractProduct.startDate);
        // copy.finishDate = this.dateUtils
        //     .convertDateTimeFromServer(sellContractProduct.finishDate);

        return copy;
    }

    /**
     * Convert a SellContractProduct to a JSON which can be sent to the server.
     */
    private convert(sellContractProduct: SellContractProduct): SellContractProduct {
        const copy: SellContractProduct = Object.assign({}, sellContractProduct);
        return copy;
    }
}
