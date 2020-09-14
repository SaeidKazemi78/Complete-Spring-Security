import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ProductRateDifferencePayment } from './product-rate-difference-payment.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProductRateDifferencePayment>;

@Injectable({ providedIn: 'root' })
export class ProductRateDifferencePaymentService {

    private resourceUrl =  SERVER_API_URL + 'niopdcaccounting/api/product-rate-difference-payments';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(productRateDifferencePayment: ProductRateDifferencePayment): Observable<EntityResponseType> {
        const copy = this.convert(productRateDifferencePayment);
        return this.http.post<ProductRateDifferencePayment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(productRateDifferencePayment: ProductRateDifferencePayment): Observable<EntityResponseType> {
        const copy = this.convert(productRateDifferencePayment);
        return this.http.put<ProductRateDifferencePayment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductRateDifferencePayment>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductRateDifferencePayment[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductRateDifferencePayment[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductRateDifferencePayment[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductRateDifferencePayment = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductRateDifferencePayment[]>): HttpResponse<ProductRateDifferencePayment[]> {
        const jsonResponse: ProductRateDifferencePayment[] = res.body;
        const body: ProductRateDifferencePayment[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductRateDifferencePayment.
     */
    private convertItemFromServer(productRateDifferencePayment: ProductRateDifferencePayment): ProductRateDifferencePayment {
        const copy: ProductRateDifferencePayment = Object.assign({}, productRateDifferencePayment);
        copy.data = this.dateUtils
            .convertDateTimeFromServer(productRateDifferencePayment.data);
        return copy;
    }

    /**
     * Convert a ProductRateDifferencePayment to a JSON which can be sent to the server.
     */
    private convert(productRateDifferencePayment: ProductRateDifferencePayment): ProductRateDifferencePayment {
        const copy: ProductRateDifferencePayment = Object.assign({}, productRateDifferencePayment);

        copy.data = this.dateUtils.toDate(productRateDifferencePayment.data);
        return copy;
    }
}
