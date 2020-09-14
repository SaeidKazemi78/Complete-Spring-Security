import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { OrderNumber } from './order-number.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OrderNumber>;

@Injectable({ providedIn: 'root' })
export class OrderNumberService {

    private resourceUrl = 'niopdcorder/api/order-numbers';

    constructor(private http: HttpClient) { }

    create(orderNumber: OrderNumber): Observable<EntityResponseType> {
            const copy = this.convert(orderNumber);
        return this.http.post<OrderNumber>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(orderNumber: OrderNumber): Observable<EntityResponseType> {
        const copy = this.convert(orderNumber);
        return this.http.put<OrderNumber>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrderNumber>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    queryByLocationId( locationId: any, req?: any): Observable<HttpResponse<OrderNumber[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderNumber[]>(this.resourceUrl + '/location/' + locationId,  { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderNumber[]>) => this.convertArrayResponse(res));
    }
    queryByRefuelCenterId( refuelCenterId: any, req?: any): Observable<HttpResponse<OrderNumber[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderNumber[]>(this.resourceUrl + '/refuel-center/' + refuelCenterId,  { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderNumber[]>) => this.convertArrayResponse(res));
    }

    findAll(): Observable<HttpResponse<OrderNumber[]>> {
        return this.http.get<OrderNumber[]>(this.resourceUrl,  { observe: 'response' })
            .map((res: HttpResponse<OrderNumber[]>) => this.convertArrayResponse(res));
    }

    disable(id: number): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${this.resourceUrl}/${id}/disable`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrderNumber = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrderNumber[]>): HttpResponse<OrderNumber[]> {
        const jsonResponse: OrderNumber[] = res.body;
        const body: OrderNumber[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrderNumber.
     */
    private convertItemFromServer(orderNumber: OrderNumber): OrderNumber {
        const copy: OrderNumber = Object.assign(new OrderNumber(), orderNumber);
        return copy;
    }

    /**
     * Convert a OrderNumber to a JSON which can be sent to the server.
     */
    private convert(orderNumber: OrderNumber): OrderNumber {
        const copy: OrderNumber = Object.assign({}, orderNumber);

        return copy;
    }
}
