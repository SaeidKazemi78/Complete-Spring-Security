import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CustomerDeactiveRule } from './customer-deactive-rule.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CustomerDeactiveRule>;

@Injectable({ providedIn: 'root' })
export class CustomerDeactiveRuleService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/customer-deactive-rules';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(customerDeactiveRule: CustomerDeactiveRule): Observable<EntityResponseType> {
        const copy = this.convert(customerDeactiveRule);
        return this.http.post<CustomerDeactiveRule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customerDeactiveRule: CustomerDeactiveRule): Observable<EntityResponseType> {
        const copy = this.convert(customerDeactiveRule);
        return this.http.put<CustomerDeactiveRule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerDeactiveRule>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CustomerDeactiveRule[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerDeactiveRule[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CustomerDeactiveRule[]>) => this.convertArrayResponse(res));
    }

    checkDeactive(req?: any): Observable<HttpResponse<CustomerDeactiveRule[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerDeactiveRule[]>(this.resourceUrl + '/check', { params: options, observe: 'response' })
            .map((res: HttpResponse<CustomerDeactiveRule[]>) => this.convertArrayResponse(res));
    }



    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerDeactiveRule = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerDeactiveRule[]>): HttpResponse<CustomerDeactiveRule[]> {
        const jsonResponse: CustomerDeactiveRule[] = res.body;
        const body: CustomerDeactiveRule[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerDeactiveRule.
     */
    private convertItemFromServer(customerDeactiveRule: CustomerDeactiveRule): CustomerDeactiveRule {
        const copy: CustomerDeactiveRule = Object.assign({}, customerDeactiveRule);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(customerDeactiveRule.startDate);
        copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(customerDeactiveRule.finishDate);
        return copy;
    }

    /**
     * Convert a CustomerDeactiveRule to a JSON which can be sent to the server.
     */
    private convert(customerDeactiveRule: CustomerDeactiveRule): CustomerDeactiveRule {
        const copy: CustomerDeactiveRule = Object.assign({}, customerDeactiveRule);

        return copy;
    }
}
