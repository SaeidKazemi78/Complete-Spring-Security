import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {CustomerScore} from './customer-score.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<CustomerScore>;

@Injectable({ providedIn: 'root' })
export class CustomerScoreService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/customer-scores';
    private resourceCustomerUrl = SERVER_API_URL + 'niopdcbase/api/customers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(customerScore: CustomerScore): Observable<EntityResponseType> {
        const copy = this.convert(customerScore);
        return this.http.post<CustomerScore>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customerScore: CustomerScore): Observable<EntityResponseType> {
        const copy = this.convert(customerScore);
        return this.http.put<CustomerScore>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerScore>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(customerId: any, req?: any): Observable<HttpResponse<CustomerScore[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerScore[]>(this.resourceCustomerUrl + '/' + customerId + '/customer-scores', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<CustomerScore[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerScore = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerScore[]>): HttpResponse<CustomerScore[]> {
        const jsonResponse: CustomerScore[] = res.body;
        const body: CustomerScore[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerScore.
     */
    private convertItemFromServer(customerScore: CustomerScore): CustomerScore {
        const copy: CustomerScore = Object.assign({}, customerScore);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(customerScore.startDate);
        copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(customerScore.finishDate);
        return copy;
    }

    /**
     * Convert a CustomerScore to a JSON which can be sent to the server.
     */
    private convert(customerScore: CustomerScore): CustomerScore {
        const copy: CustomerScore = Object.assign({}, customerScore);

        return copy;
    }
}
