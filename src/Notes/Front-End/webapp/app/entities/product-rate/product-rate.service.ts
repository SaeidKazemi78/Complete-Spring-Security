import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {ProductRate} from './product-rate.model';
import {createRequestOption} from '../../shared';
import {BoundarySell, ProductAmountResponse} from '../order';
import {RateDifference} from 'app/entities/rate-difference';

export type EntityResponseType = HttpResponse<ProductRate>;

@Injectable({providedIn: 'root'})
export class ProductRateService {

    private resourceUrl = SERVER_API_URL + 'niopdcrate/api/product-rates';

    private resourceProductUrl = SERVER_API_URL + 'niopdcrate/api/products';
    private resourceContainerUrl = SERVER_API_URL + 'niopdcrate/api/containers';

    private resourceRateGroupUrl = SERVER_API_URL + 'niopdcrate/api/rate-groups';
    private resourceOrderProductUrl = SERVER_API_URL + 'niopdcorder/api/order-products';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(productRate: ProductRate): Observable<EntityResponseType> {
        const copy = this.convert(productRate);
        return this.http.post<ProductRate>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(productRate: ProductRate): Observable<EntityResponseType> {
        const copy = this.convert(productRate);
        return this.http.put<ProductRate>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductRate>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getOneProductRateByProductAndAmount(productAmountRequest): Observable<HttpResponse<ProductAmountResponse[]>> {
        return this.http.post<ProductAmountResponse[]>(`${this.resourceUrl}/product-amount/false`, productAmountRequest, {observe: 'response'});
    }

    getPriceForBoundarySell(boundaryResponseDTO: BoundarySell): Observable<HttpResponse<BoundarySell>> {
        return this.http.post<BoundarySell>(`${this.resourceUrl}/boundary-sell`, boundaryResponseDTO, {observe: 'response'})
            .map((res: HttpResponse<BoundarySell>) => this.convertResponseBoundary(res));
    }

    createByProduct(productRate: ProductRate): Observable<EntityResponseType> {
        const copy = this.convert(productRate);
        return this.http.post(this.resourceUrl + '/product', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    createByContainer(productRate: ProductRate): Observable<EntityResponseType> {
        const copy = this.convert(productRate);
        return this.http.post(this.resourceUrl + '/container', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getListOfProductRate(rateGroupId: number, productId: number, req: RateDifference): Observable<HttpResponse<ProductRate[]>> {
        const copy = this.convertRateDifference(req);
        return this.http.post<ProductRate[]>(this.resourceUrl + '/rate-group/' + rateGroupId + '/product/' + productId, copy, {observe: 'response'})
            .map((res: HttpResponse<ProductRate[]>) => this.convertArrayResponse(res));
    }

    updateByProduct(productRate: ProductRate): Observable<EntityResponseType> {
        const copy = this.convert(productRate);
        return this.http.put(this.resourceUrl + '/product', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    updateByContainer(productRate: ProductRate): Observable<EntityResponseType> {
        const copy = this.convert(productRate);
        return this.http.put<ProductRate>(this.resourceUrl + '/container', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(productId: any, req?: any): Observable<HttpResponse<ProductRate[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductRate[]>(this.resourceProductUrl + '/' + productId + '/product-rates',
            {params: options, observe: 'response'})
            .map((res: HttpResponse<ProductRate[]>) => this.convertArrayResponse(res));
    }

    queryProduct(rateGroupId: any, req?: any): Observable<HttpResponse<ProductRate[]>> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceRateGroupUrl + (rateGroupId ? '/' + rateGroupId + '/product' : '/product-rates'), {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<ProductRate[]>) => this.convertArrayResponse(res));
    }

    queryContainer(rateGroupId: any, req?: any): Observable<HttpResponse<ProductRate[]>> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceRateGroupUrl + '/' + rateGroupId + '/container', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<ProductRate[]>) => this.convertArrayResponse(res));
    }

    queryByRateGroupCustomerGroup(customerGroup: any) {
        const params = new HttpParams().set('customerGroup', customerGroup);
        return this.http.get(this.resourceUrl + '/customer-group', {
            params,
            observe: 'response'
        })
            .map((res: HttpResponse<ProductRate[]>) => this.convertArrayResponse(res));
    }

    isUseProductRateInOrderProduct(productRateId?: any): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceOrderProductUrl}/is-use-product-rate/${productRateId}`, {observe: 'response'});
    }

    isUseContainerRateInOrderProduct(containerRateId?: any): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceOrderProductUrl}/is-use-container-rate/${containerRateId}`, {observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    queryRateDifference(productId: any, customerTypeId: number, customerGroup: string): Observable<HttpResponse<ProductRate[]>> {
        let params = new HttpParams().set('customerTypeId', customerTypeId.toString())
            .set('customerGroup', customerGroup);
        return this.http.get<ProductRate[]>(`${this.resourceUrl}/rate-difference/${productId}`,
            {params, observe: 'response'})
            .map((res: HttpResponse<ProductRate[]>) => this.convertArrayResponse(res));
    }

    confirm(id: number): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${this.resourceUrl}/confirm/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductRate = this.convertItemFromServer(res.body);
        return res.clone({body});
    }
    private convertResponseRateDifference(res: EntityResponseType): EntityResponseType {
        const body: RateDifference = this.convertItemFromServerRateDifference(res.body);
        return res.clone({body});
    }
    private convertResponseBoundary(res: HttpResponse<BoundarySell>): HttpResponse<BoundarySell> {
        const body: BoundarySell = this.convertItemFromServerBoundary(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductRate[]>): HttpResponse<ProductRate[]> {
        const jsonResponse: ProductRate[] = res.body;
        const body: ProductRate[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductRate.
     */
    private convertItemFromServer(productRate: ProductRate): ProductRate {
        const copy: ProductRate = Object.assign({}, productRate);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(productRate.startDate);
        copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(productRate.finishDate);
        return copy;
    }

    private convertItemFromServerRateDifference(rateDifference: RateDifference): RateDifference {
        const copy: RateDifference = Object.assign({}, rateDifference);
        copy.fromDate = this.dateUtils
            .convertDateTimeFromServer(rateDifference.fromDate);
        copy.toDate = this.dateUtils
            .convertDateTimeFromServer(rateDifference.toDate);
        return copy;
    }

    private convertItemFromServerBoundary(boundaryResponseDTO: BoundarySell): BoundarySell {
        const copy: BoundarySell = Object.assign({}, boundaryResponseDTO);
        return copy;
    }

    /**
     * Convert a ProductRate to a JSON which can be sent to the server.
     */
    private convert(productRate: ProductRate): ProductRate {
        const copy: ProductRate = Object.assign({}, productRate);

        return copy;
    }

    private convertRateDifference(rateDifference: RateDifference): RateDifference {
        const copy: RateDifference = Object.assign({}, rateDifference);

        return copy;
    }
}
