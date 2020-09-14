import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {BoundarySell, CreditNotDepositedInTime, ForcibleOrder, Order, OrderReport} from './order.model';
import {createRequestOption} from '../../shared';
import {SellContractProductService} from '../sell-contract-product';
import {RateGroupService} from '../rate-group';
import {LocationService} from '../location/location.service';
import {CustomerService} from '../customer/customer.service';
import {PersonService} from '../person/person.service';
import {DepotService} from '../depot/depot.service';
import {catchError} from 'rxjs/operators';
import {Subject} from 'rxjs';
export type EntityResponseType = HttpResponse<Order>;
export type BoundarySellResponseType = HttpResponse<BoundarySell>;
export type StringResponseType = HttpResponse<string>;

@Injectable({providedIn: 'root'})
export class OrderService {

     doActivate= new Subject<any>();
    private resourceUrl = SERVER_API_URL + 'niopdcorder/api/orders';
    private resourceBoundarySellUrl = SERVER_API_URL + 'niopdcorder/api/order/boundary-sells';
    private resourceReportUrl = SERVER_API_URL + 'niopdcreport/api';
    private resourceInvoiceUrl = SERVER_API_URL + 'niopdcreport/api/ao-reports/invoice';

    constructor(private http: HttpClient,
                private depotService: DepotService,
                private personService: PersonService,
                private customerService: CustomerService,
                private locationService: LocationService,
                private sellContractProductService: SellContractProductService,
                private rateGroupService: RateGroupService,
                private dateUtils: JhiDateUtils) {
    }

    // region حواله و سوخت هوایی
    create(order: Order): Observable<EntityResponseType> {
        const copy = this.convert(order);
        return this.http.post<Order>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(order: Order): Observable<EntityResponseType> {
        const copy = this.convert(order);
        return this.http.put<Order>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Order>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findForEdit(id: number): Observable<EntityResponseType> {
        return this.http.get<Order>(`${this.resourceUrl}/${id}/for-edit`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findPaymentList(id: number): Observable<EntityResponseType> {
        return this.http.get<Order>(`${this.resourceUrl}/${id}/payment-list`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    queryByMode(mode: any, req?: any): Observable<HttpResponse<Order[]>> {
        const options = createRequestOption(req);
        return this.http.get<Order[]>(`${this.resourceUrl}/mode/${mode}`, {params: options, observe: 'response'})
            .map((res: HttpResponse<Order[]>) => this.convertArrayResponse(res));
    }

    queryAirplane(req?: any): Observable<HttpResponse<Order[]>> {
        const options = createRequestOption(req);
        return this.http.get<Order[]>(`${this.resourceUrl}/airplane`, {params: options, observe: 'response'})
            .map((res: HttpResponse<Order[]>) => this.convertArrayResponse(res));
    }

    queryByCustomer(customerId: number): Observable<HttpResponse<Order[]>> {
        return this.http.get<Order[]>(`${this.resourceBoundarySellUrl}/customer/` + customerId, {observe: 'response'})
            .map((res: HttpResponse<Order[]>) => this.convertArrayResponse(res));
    }

    // endregion
    // region فروش مرزی

    createBoundarySell(boundary: BoundarySell): Observable<BoundarySellResponseType> {
        const copy = this.convertBoundarySell(boundary);
        return this.http.post<BoundarySell>(`${this.resourceBoundarySellUrl}`, copy, {observe: 'response'})
            .map((res: BoundarySellResponseType) => this.convertBoundaryResponse(res));
    }

    queryBoundary(searchCarRfId: string, searchPlaque: string, req?: any): Observable<HttpResponse<Order[]>> {
        let options = createRequestOption(req);
        if (!options) {
            options = new HttpParams();
        }
        if (searchCarRfId) {
            options = options.set('carRfId', searchCarRfId);
        }
        if (searchPlaque) {
            options = options.set('plaque', searchPlaque);
        }
        return this.http.get<Order[]>(`${this.resourceBoundarySellUrl}`, {params: options, observe: 'response'})
            .map((res: HttpResponse<Order[]>) => this.convertArrayResponse(res));
    }

    findBoundarySell(id: number): Observable<BoundarySellResponseType> {
        return this.http.get<BoundarySell>(`${this.resourceBoundarySellUrl}/${id}`, {observe: 'response'})
            .map((res: BoundarySellResponseType) => this.convertBoundaryResponse(res));
    }

    findBoundarySellForEdit(id: number): Observable<BoundarySellResponseType> {
        return this.http.get<BoundarySell>(`${this.resourceBoundarySellUrl}/${id}/for-edit`, {observe: 'response'})
            .map((res: BoundarySellResponseType) => this.convertBoundaryResponse(res));
    }

    findBoundarySellDriver(customerId: number): Observable<BoundarySellResponseType> {
        return this.http.get<BoundarySell>(`${this.resourceBoundarySellUrl}/customer/${customerId}/driver`, {observe: 'response'})
            .map((res: BoundarySellResponseType) => this.convertBoundaryResponse(res));
    }

    // endregion

    // region پرداخت

    startBankTransactionByOrderPrePay(id: any): Observable<StringResponseType> {
        return this.http.get<String>(`${this.resourceUrl}/pre-pay/${id}/start-bank-transaction`, {observe: 'response'})
            .map((res: StringResponseType) => this.convertStringResponse(res));
    }

    startBankTransactionByOrder(id: any): Observable<StringResponseType> {
        return this.http.get<String>(`${this.resourceUrl}/${id}/start-bank-transaction`, {observe: 'response'})
            .map((res: StringResponseType) => this.convertStringResponse(res));
    }

    startBankTransactionByOrders(ids: any[]): Observable<StringResponseType> {
        return this.http.post<String>(`${this.resourceUrl}/start-bank-transaction`, ids,
            {observe: 'response'})
            .map((res: StringResponseType) => this.convertStringResponse(res));
    }

    startBankTransactionforSingleOrders(ids: any[]): Observable<StringResponseType> {
        return this.http.post<String>(`${this.resourceUrl}/single-pay/start-bank-transaction`, ids,
            {observe: 'response'})
            .map((res: StringResponseType) => this.convertStringResponse(res));
    }

    // endregion

    reserve(order: Order): Observable<EntityResponseType> {
        const copy = this.convert(order);
        return this.http.post<Order>(`${this.resourceUrl}/reserve`, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    createOrderForEPayment(order: Order): Observable<StringResponseType> {
        const copy = this.convert(order);
        return this.http.post<string>(`${this.resourceUrl}/e-payment`, copy, {observe: 'response'})
            .map((res: StringResponseType) => this.convertStringResponse(res));
    }

    updateOrderForEPayment(order: Order): Observable<StringResponseType> {
        const copy = this.convert(order);
        return this.http.put<string>(`${this.resourceUrl}/e-payment`, copy, {observe: 'response'})
            .map((res: StringResponseType) => this.convertStringResponse(res));
    }

    payment(order: Order): Observable<EntityResponseType> {
        const copy = this.convert(order);
        return this.http.put<Order>(`${this.resourceUrl}/payment`, copy, {observe: 'response'}).map((res: EntityResponseType) => {
            return this.convertResponse(res);
        });
    }

    report(orderId?: number): Observable<HttpResponse<OrderReport>> {
        return this.http.get<OrderReport>(this.resourceReportUrl + `/sell/report/${orderId}`, {observe: 'response'})
            .map((res: HttpResponse<OrderReport>) => res);
    }

    reportAirplane(orderId?: number): Observable<HttpResponse<OrderReport>> {
        return this.http.get<OrderReport>(this.resourceReportUrl + `/ao/airplane/print/${orderId}`, {observe: 'response'})
            .map((res: HttpResponse<OrderReport>) => res);
    }

    boundaryReport(id: number, receiptType: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.resourceReportUrl + '/boundary-sell/report/' + id + '/' + receiptType, {observe: 'response'})
            .map((res: HttpResponse<any>) => res);
    }

    queryByOrderCreditNotDeposited(req?: any): Observable<HttpResponse<Order[]>> {
        const options = createRequestOption(req);
        return this.http.get<Order[]>(`${this.resourceUrl}/credit-not-deposited`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Order[]>) => this.convertArrayResponse(res));
    }

    hasCreditNotDepositedInTime(personId: number, customerId: number): Observable<HttpResponse<CreditNotDepositedInTime>> {
        let params;
        if (customerId != null) {
            params = new HttpParams()
                .set('customerId', customerId.toString())
                .set('personId', personId.toString())
            ;
        } else {
            params = new HttpParams().set('personId', personId.toString());
        }
        return this.http.get<CreditNotDepositedInTime>(`${this.resourceUrl}/has-credit-not-deposited-in-time`, {
            params,
            observe: 'response'
        });
    }

    delete(id: number, force: boolean): Observable<HttpResponse<any>> {
        const params = new HttpParams().set('force', JSON.stringify(force));
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {params, observe: 'response'});
    }

    deActive(id: number): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${this.resourceBoundarySellUrl}/${id}/de-active`, {observe: 'response'});
    }

    active(id: number): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${this.resourceBoundarySellUrl}/${id}/active`, {observe: 'response'});
    }

    confirm(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/${id}/confirm`, {observe: 'response'});
    }

    confirmAll(refuelCenterId: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/${refuelCenterId}/confirm-all`, {observe: 'response'});
    }

    revertConfirm(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/${id}/revert-confirm`, {observe: 'response'});
    }

    revocation(id: number, force: boolean): Observable<HttpResponse<any>> {
        const params = new HttpParams().set('force', JSON.stringify(force));
        return this.http.get<any>(`${this.resourceUrl}/${id}/revocation`, {params, observe: 'response'});
    }

    increaseBoundaryPrint(id: number, count: number): Observable<HttpResponse<any>> {
        const params = new HttpParams()
            .set('count', count.toString());
        return this.http.get<any>(`${this.resourceUrl}/${id}/boundary-increase-print`, {params, observe: 'response'});
    }

    downloadInvoice(startTime: any, endTime: any): Observable<HttpResponse<any>> {
        const params = new HttpParams()
            .set('startTime', startTime.toISOString())
            .set('endTime', endTime.toISOString());
        return this.http.put(`${this.resourceInvoiceUrl}`, {},
            {responseType: 'blob', params, observe: 'response'}).pipe(catchError(this.parseErrorBlob));
    }

    existForcibleOrder(customerId: number): Observable<HttpResponse<ForcibleOrder>> {
        return this.http.get<ForcibleOrder>(`${this.resourceUrl}/forcible-order/customer/${customerId}`, {observe: 'response'})
            .map((res: HttpResponse<ForcibleOrder>) => res);
    }

    parseErrorBlob(err: HttpErrorResponse): Observable<any> {
        const reader: FileReader = new FileReader();

        const obs = Observable.create((observer: any) => {
            reader.onloadend = e => {
                observer.error(JSON.parse(reader.result as string));
                observer.complete();
            };
        });
        reader.readAsText(err.error);
        return obs;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Order = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertBoundaryResponse(res: BoundarySellResponseType): BoundarySellResponseType {
        const body: BoundarySell = this.convertBoundarySellFromServer(res.body);
        return res.clone({body});
    }

    private convertStringResponse(res: StringResponseType): StringResponseType {
        const body: string = this.convertStringFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Order[]>): HttpResponse<Order[]> {
        const jsonResponse: Order[] = res.body;
        const body: Order[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Order.
     */
    private convertStringFromServer(result: string): string {
        const copy: string = Object.assign({}, result);
        return result;
    }

    private convertItemFromServer(order: Order): Order {
        const copy: Order = Object.assign({}, order);
        copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(order.registerDate);
        copy.modifyStatusDate = this.dateUtils
            .convertDateTimeFromServer(order.modifyStatusDate);
        return copy;
    }

    private convertBoundarySellFromServer(boundarySell: BoundarySell): BoundarySell {
        const copy: BoundarySell = Object.assign({}, boundarySell);
        return copy;
    }

    /**
     * Convert a Order to a JSON which can be sent to the server.
     */
    private convert(order: Order): Order {
        const copy: Order = Object.assign({}, order);

        return copy;
    }

    private convertBoundarySell(boundarySell: BoundarySell): BoundarySell {
        const copy: BoundarySell = Object.assign({}, boundarySell);

        return copy;
    }
}
