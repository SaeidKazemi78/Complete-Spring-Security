import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CustomerRating } from './customer-rating.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CustomerRating>;

@Injectable({ providedIn: 'root' })
export class CustomerRatingService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/customer-ratings';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(customerRating: CustomerRating): Observable<EntityResponseType> {
        const copy = this.convert(customerRating);
        return this.http.post<CustomerRating>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customerRating: CustomerRating): Observable<EntityResponseType> {
        const copy = this.convert(customerRating);
        return this.http.put<CustomerRating>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerRating>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CustomerRating[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerRating[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CustomerRating[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerRating = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerRating[]>): HttpResponse<CustomerRating[]> {
        const jsonResponse: CustomerRating[] = res.body;
        const body: CustomerRating[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerRating.
     */
    private convertItemFromServer(customerRating: CustomerRating): CustomerRating {
        const copy: CustomerRating = Object.assign({}, customerRating);
        copy.fromDate = this.dateUtils
            .convertDateTimeFromServer(customerRating.fromDate);
        copy.toDate = this.dateUtils
            .convertDateTimeFromServer(customerRating.toDate);
        return copy;
    }

    /**
     * Convert a CustomerRating to a JSON which can be sent to the server.
     */
    private convert(customerRating: CustomerRating): CustomerRating {
        const copy: CustomerRating = Object.assign({}, customerRating);
        return copy;
    }
}
