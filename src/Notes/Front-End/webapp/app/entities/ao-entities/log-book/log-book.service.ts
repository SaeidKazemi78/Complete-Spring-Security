import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {LogBook} from './log-book.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<LogBook>;

@Injectable({ providedIn: 'root' })
export class LogBookService {
    private resourceUrl = SERVER_API_URL + 'niopdcao/api/log-books';
    private resourceDayDepotUrl = 'niopdcao/api/day-depots';

    constructor(private http: HttpClient
    ) {
    }

    create(logBook: LogBook): Observable<EntityResponseType> {
        const copy = this.convert(logBook);
        return this.http.post<LogBook>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    sync(obj): Observable<HttpResponse<boolean>> {
        return this.http.post<any>(`${this.resourceUrl}/sync`, obj, {observe: 'response'})
            .map((res: HttpResponse<boolean>) => res);
    }

    update(logBook: LogBook): Observable<EntityResponseType> {
        const copy = this.convert(logBook);
        return this.http.put<LogBook>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LogBook>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByOrderId(id: number): Observable<EntityResponseType> {
        return this.http.get<LogBook>(`${this.resourceUrl}/order/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByOrderProductId(id: number): Observable<EntityResponseType> {
        return this.http.get<LogBook>(`${this.resourceUrl}/order-product/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(dayDepotId ?: number, req?: any): Observable<HttpResponse<LogBook[]>> {
        const options = createRequestOption(req);
        return this.http.get<LogBook[]>(`${this.resourceDayDepotUrl}/${dayDepotId}/log-books`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<LogBook[]>) => this.convertArrayResponse(res));
    }

    queryByOrder(orderId: number, req?: any): Observable<HttpResponse<LogBook[]>> {
        const options = createRequestOption(req);
        return this.http.get<LogBook[]>(`${this.resourceUrl}/orders/${orderId}`, {params: options, observe: 'response'})
            .map((res: HttpResponse<LogBook[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LogBook = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LogBook[]>): HttpResponse<LogBook[]> {
        const jsonResponse: LogBook[] = res.body;
        const body: LogBook[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LogBook.
     */
    private convertItemFromServer(logBook: LogBook): LogBook {
        const copy: LogBook = Object.assign({}, logBook);
        /* if (copy.orderId) {
             if (this.orderMap.has(copy.orderId)) {
                 const order: Order = this.orderMap.get(copy.orderId);
                 copy.orderFuelReceipt = order.orderNo;
                 //-----------------customer title-----------------
                 if (this.customerMap.has(order.customerId)) {
                     copy.orderCustomerTitle = this.customerMap.get(order.customerId);
                 } else {
                     this.customerService.find(order.customerId)
                         .subscribe((res) => {
                             copy.orderCustomerTitle = res.body.name;
                             this.customerMap.set(order.customerId, copy.orderCustomerTitle);
                         });
                 }
                 //------------------------------------------------
                 //----------------person title--------------------
                 if (this.personMap.has(order.personId)) {
                     copy.orderPersonTitle = this.personMap.get(order.personId);
                 } else {
                     this.personService.find(order.personId)
                         .subscribe((res) => {
                             copy.orderPersonTitle = res.body.fullName;
                             this.personMap.set(order.personId, copy.orderPersonTitle);
                         });
                 }
                 //------------------------------------------------
             } else {
                 this.orderService.find(copy.orderId)
                     .subscribe((orderRes) => {
                         const order: Order = orderRes.body;
                         this.orderMap.set(copy.orderId, order);
                         copy.orderFuelReceipt = order.orderNo;
                         //-----------------customer title-----------------
                         if (this.customerMap.has(order.customerId)) {
                             copy.orderCustomerTitle = this.customerMap.get(order.customerId);
                         } else {
                             this.customerService.find(order.customerId)
                                 .subscribe((res) => {
                                     copy.orderCustomerTitle = res.body.name;
                                     this.customerMap.set(order.customerId, copy.orderCustomerTitle);
                                 });
                         }
                         //------------------------------------------------
                         //----------------person title--------------------
                         if (this.personMap.has(order.personId)) {
                             copy.orderPersonTitle = this.personMap.get(order.personId);
                         } else {
                             this.personService.find(order.personId)
                                 .subscribe((res) => {
                                     copy.orderPersonTitle = res.body.fullName;
                                     this.personMap.set(order.personId, copy.orderPersonTitle);
                                 });
                         }
                         //------------------------------------------------
                     });
             }
         }*/
        return copy;
    }

    /**
     * Convert a LogBook to a JSON which can be sent to the server.
     */
    private convert(logBook: LogBook): LogBook {
        const copy: LogBook = Object.assign({}, logBook);
        return copy;
    }
}
