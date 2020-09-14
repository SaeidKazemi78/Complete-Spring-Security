import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {CreditBuyTypeRemained, CustomerCredit} from './customer-credit.model';
import {createRequestOption} from '../../shared';
import {BuyGroup} from '../buy-type';

export type EntityResponseType = HttpResponse<CustomerCredit>;

@Injectable({ providedIn: 'root' })
export class CustomerCreditService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/customer-credits';
    private customersResourceUrl = SERVER_API_URL + 'niopdcbase/api/customers';
    private orderResourceUrl = SERVER_API_URL + 'niopdcbase/api/orders';
    private orderCreditResourceUrl = SERVER_API_URL + 'niopdcorder/api/order-credits';
    private personsResourceUrl = SERVER_API_URL + 'niopdcbase/api/people';
    private exportPiResourceUrl = SERVER_API_URL + 'niopdcbase/api/export-pis';
    private sellContractProductResourceUrl = SERVER_API_URL + 'niopdcbase/api/sell-contract-products';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(customerCredit: CustomerCredit): Observable<EntityResponseType> {
        const copy = this.convert(customerCredit);
        return this.http.post<CustomerCredit>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customerCredit: CustomerCredit): Observable<EntityResponseType> {
        const copy = this.convert(customerCredit);
        return this.http.put<CustomerCredit>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerCredit>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    useCustomerCredit(id: number): Observable<HttpResponse<boolean>> {
        return this.http.get<boolean>(`${this.orderCreditResourceUrl}/${id}/exist`, {observe: 'response'})
            .map((res: HttpResponse<boolean>) => res);
    }

    queryByCustomer(customerId: number, req?: any): Observable<HttpResponse<CustomerCredit[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerCredit[]>(this.customersResourceUrl + '/' + customerId + '/customer-credits', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<CustomerCredit[]>) => this.convertArrayResponse(res));
    }
    orderReserveFinal(personId: number, buyGroup: any, currencyId: number, currencyRateGroupId: number): Observable<HttpResponse<CustomerCredit[]>> {
        const params = new HttpParams()
            .set('personId', personId.toString())
            .set('buyGroup', buyGroup.toString())
            .set('currencyId', currencyId.toString());
        if (currencyRateGroupId != null) {
            params.append('currencyRateGroupId', currencyRateGroupId.toString());
        }
        return this.http.get<CustomerCredit[]>(this.orderResourceUrl + '/reserve/final', {
            params,
            observe: 'response'
        })
            .map((res: HttpResponse<CustomerCredit[]>) => this.convertArrayResponse(res));
    }

    queryBySellContractProductId(sellContractProductId: number, req?: any): Observable<HttpResponse<CustomerCredit[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerCredit[]>(this.sellContractProductResourceUrl + '/' + sellContractProductId + '/sell-contract-product-credits', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<CustomerCredit[]>) => this.convertArrayResponse(res));
    }

    queryByPerson(personId: number, req?: any): Observable<HttpResponse<CustomerCredit[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerCredit[]>(this.personsResourceUrl + '/' + personId + '/customer-credits', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<CustomerCredit[]>) => this.convertArrayResponse(res));
    }

    queryByExportPi(exportPiId: number, req?: any): Observable<HttpResponse<CustomerCredit[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerCredit[]>(this.exportPiResourceUrl + '/' + exportPiId + '/export-pi-credits', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<CustomerCredit[]>) => this.convertArrayResponse(res));
    }

    queryByFilter(buyGroup: BuyGroup,
                  customerId: number,
                  personId: number,
                  currencyRateGroupId: number,
                  productIds: number[],
                  currencyId: number,
                  locationId: number): Observable<HttpResponse<CustomerCredit[]>> {
        let params;
        if (customerId == null) {
            if (currencyRateGroupId == null) {
                params = new HttpParams()
                    .set('personId', personId.toString())
                    .set('productIds', productIds.toString())
                    .set('currencyId', currencyId.toString())
                    .set('locationId', locationId.toString())
                    .set('buyGroup', buyGroup.toString());
            } else {
                params = new HttpParams()
                    .set('personId', personId.toString())
                    .set('currencyRateGroupId', currencyRateGroupId.toString())
                    .set('productIds', productIds.toString())
                    .set('currencyId', currencyId.toString())
                    .set('locationId', locationId.toString())
                    .set('buyGroup', buyGroup.toString());
            }
        } else {
            if (currencyRateGroupId == null) {
                params = new HttpParams()
                    .set('customerId', customerId.toString())
                    .set('personId', personId.toString())
                    .set('productIds', productIds.toString())
                    .set('currencyId', currencyId.toString())
                    .set('locationId', locationId.toString())
                    .set('buyGroup', buyGroup.toString());
            } else {
                params = new HttpParams()
                    .set('customerId', customerId.toString())
                    .set('personId', personId.toString())
                    .set('currencyRateGroupId', currencyRateGroupId.toString())
                    .set('productIds', productIds.toString())
                    .set('currencyId', currencyId.toString())
                    .set('locationId', locationId.toString())
                    .set('buyGroup', buyGroup.toString());
            }
        }
        return this.http.get<CustomerCredit[]>(this.resourceUrl + '/filter', {
            params,
            observe: 'response'
        })
            .map((res: HttpResponse<CustomerCredit[]>) => this.convertArrayResponse(res));
    }

    getAllCustomerCreditsByFilterQuota(customerId: number,
                                       productId: number): Observable<EntityResponseType> {
        return this.http.get<CustomerCredit>(this.resourceUrl + '/filter/quota/' + customerId + '/' + productId, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    getAllCreditBuyTypeRemaine(customerId): Observable<HttpResponse<CreditBuyTypeRemained[]>> {
        return this.http.get<CreditBuyTypeRemained[]>(this.resourceUrl + '/customer/' + customerId , {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerCredit = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerCredit[]>): HttpResponse<CustomerCredit[]> {
        const jsonResponse: CustomerCredit[] = res.body;
        const body: CustomerCredit[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerCredit.
     */
    private convertItemFromServer(customerCredit: CustomerCredit): CustomerCredit {
        const copy: CustomerCredit = Object.assign({}, customerCredit);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(customerCredit.startDate);
        copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(customerCredit.finishDate);
        copy.exportationDate = this.dateUtils
            .convertDateTimeFromServer(customerCredit.exportationDate);
        return copy;
    }

    /**
     * Convert a CustomerCredit to a JSON which can be sent to the server.
     */
    private convert(customerCredit: CustomerCredit): CustomerCredit {
        const copy: CustomerCredit = Object.assign({}, customerCredit);
        return copy;
    }
}
