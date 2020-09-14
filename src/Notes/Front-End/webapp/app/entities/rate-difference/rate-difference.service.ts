import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {JhiDateUtils} from 'ng-jhipster';

import {RateDifference, RateDifferenceRequest} from './rate-difference.model';
import {createRequestOption} from '../../shared';
import {StringResponseType} from 'app/entities/bank-transaction';

export type EntityResponseType = HttpResponse<RateDifference>;

@Injectable({providedIn: 'root'})
export class RateDifferenceService {

    private resourceUrl = 'niopdcaccounting/api/rate-differences';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(req: RateDifference): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.resourceUrl, req, {observe: 'response'});
    }

    update(req: RateDifference): Observable<HttpResponse<any>> {
        return this.http.put<any>(this.resourceUrl, req, {observe: 'response'});
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RateDifference>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RateDifference[]>> {
        const options = createRequestOption(req);
        return this.http.get<RateDifference[]>(`${this.resourceUrl}`, {params: options, observe: 'response'})
            .map((res: HttpResponse<RateDifference[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    startBankTransaction(rateDifferenceId: number): Observable<StringResponseType> {
        return this.http.get(`${this.resourceUrl}/transaction/start/${rateDifferenceId}`, {observe: 'response'})
            .map((res: StringResponseType) => {
                return res;
            });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RateDifference = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RateDifference[]>): HttpResponse<RateDifference[]> {
        const jsonResponse: RateDifference[] = res.body;
        const body: RateDifference[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RateDifference.
     */
    private convertItemFromServer(rateDifference: RateDifference): RateDifference {
        const copy: RateDifference = Object.assign(new RateDifference(), rateDifference);
        copy.fromDate = this.dateUtils
            .convertDateTimeFromServer(copy.fromDate);
        copy.toDate = this.dateUtils
            .convertDateTimeFromServer(copy.toDate);
        return copy;
    }

    /**
     * Convert a RateDifference to a JSON which can be sent to the server.
     */
    private convert(rateDifference: RateDifference): RateDifference {
        const copy: RateDifference = Object.assign({}, rateDifference);

        return copy;
    }
}
