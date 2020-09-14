import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {ContractType, CustomerSellContract, SellContract, TransferQuota} from './sell-contract.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<SellContract>;

@Injectable({providedIn: 'root'})
export class SellContractService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/sell-contracts';
    private resourceTransferQuotaUrl = SERVER_API_URL + 'niopdcbase/api/transfer-quota';
    private resourceCustomerUrl = SERVER_API_URL + 'niopdcbase/api/customers';
    private resourceLocationUrl = SERVER_API_URL + 'niopdcbase/api/locations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(sellContract: SellContract): Observable<EntityResponseType> {
        const copy = this.convert(sellContract);
        return this.http.post<SellContract>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sellContract: SellContract): Observable<EntityResponseType> {
        const copy = this.convert(sellContract);
        return this.http.put<SellContract>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    createTransferQuota(transferQuota: TransferQuota): Observable<HttpResponse<any>> {
        const copy = this.convertTransferQuota(transferQuota);
        return this.http.post<any>(this.resourceTransferQuotaUrl, copy, {observe: 'response'})
            .map((res: HttpResponse<any>) => res);
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SellContract>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SellContract[]>> {
        const options = createRequestOption(req);

        return this.http.get(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<SellContract[]>) => this.convertArrayResponse(res));
    }

    findAllCustomerSellContract(year: number, month: number, day: number, paymentPeriod: string): Observable<HttpResponse<CustomerSellContract[]>> {

        const params = new HttpParams()
            .set('year', year.toString())
            .set('month', month.toString())
            .set('day', day.toString())
            .set('paymentPeriod', paymentPeriod)
        ;
        return this.http.get<CustomerSellContract[]>(`${this.resourceCustomerUrl}/sell-contracts`, {
            params,
            observe: 'response'
        }).map((res: HttpResponse<CustomerSellContract[]>) => this.convertArrayResponseCustomerSellContract(res));
    }

    queryTypes(customerId): Observable<HttpResponse<ContractType[]>> {
        if (customerId) {
            const params = new HttpParams()
                .set('customerId', customerId.toString());

            return this.http.get<ContractType[]>(this.resourceUrl + '/types', {params, observe: 'response'});
        } else {
            return this.http.get<ContractType[]>(this.resourceUrl + '/types', {observe: 'response'});
        }
    }

    queryByCustomer(customerId: any, req?: any): Observable<HttpResponse<SellContract[]>> {
        const options = createRequestOption(req);
        return this.http.get(`${this.resourceUrl}/${customerId}/customers`, {params: options, observe: 'response'})
            .map((res: HttpResponse<SellContract[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    confirm(id: number): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${this.resourceUrl}/confirm/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SellContract = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SellContract[]>): HttpResponse<SellContract[]> {
        const jsonResponse: SellContract[] = res.body;
        const body: SellContract[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            if (jsonResponse[i].customerDeactiveRuleId) {
                jsonResponse[i].active = false;
            }
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    private convertArrayResponseCustomerSellContract(res: HttpResponse<CustomerSellContract[]>): HttpResponse<CustomerSellContract[]> {
        const jsonResponse: CustomerSellContract[] = res.body;
        const body: CustomerSellContract[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServerCustomerSellContract(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SellContract.
     */
    private convertItemFromServer(sellContract: SellContract): SellContract {
        const copy: SellContract = Object.assign({}, sellContract);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(sellContract.startDate);
        copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(sellContract.finishDate);
        copy.exportationDate = this.dateUtils
            .convertDateTimeFromServer(sellContract.exportationDate);
        return copy;
    }

    private convertItemFromServerCustomerSellContract(customerSellContract: CustomerSellContract): CustomerSellContract {
        const copy: CustomerSellContract = Object.assign({}, customerSellContract);

        return copy;
    }

    /**
     * Convert a SellContract to a JSON which can be sent to the server.
     */
    private convert(sellContract: SellContract): SellContract {
        const copy: SellContract = Object.assign({}, sellContract);

        return copy;
    }

    private convertTransferQuota(transferQuota: TransferQuota): TransferQuota {
        const copy: TransferQuota = Object.assign({}, transferQuota);

        return copy;
    }
}
