import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {CeilingQuota} from './ceiling-quota.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<CeilingQuota>;

@Injectable({ providedIn: 'root' })
export class CeilingQuotaService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/ceiling-quotas';
    private resourceCustomerCreditUrl = SERVER_API_URL + 'niopdcbase/api/customer-credits';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(ceilingQuota: CeilingQuota): Observable<EntityResponseType> {
        const copy = this.convert(ceilingQuota);
        return this.http.post<CeilingQuota>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ceilingQuota: CeilingQuota): Observable<EntityResponseType> {
        const copy = this.convert(ceilingQuota);
        return this.http.put<CeilingQuota>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CeilingQuota>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(customerCreditId: any, req?: any): Observable<HttpResponse<CeilingQuota[]>> {
        const options = createRequestOption(req);
        return this.http.get<CeilingQuota[]>(this.resourceCustomerCreditUrl + '/' + customerCreditId + '/ceiling-quotas', { params: options, observe: 'response' })
            .map((res: HttpResponse<CeilingQuota[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CeilingQuota = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CeilingQuota[]>): HttpResponse<CeilingQuota[]> {
        const jsonResponse: CeilingQuota[] = res.body;
        const body: CeilingQuota[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CeilingQuota.
     */
    private convertItemFromServer(ceilingQuota: CeilingQuota): CeilingQuota {
        const copy: CeilingQuota = Object.assign({}, ceilingQuota);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(ceilingQuota.startDate);
        copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(ceilingQuota.finishDate);
        return copy;
    }

    /**
     * Convert a CeilingQuota to a JSON which can be sent to the server.
     */
    private convert(ceilingQuota: CeilingQuota): CeilingQuota {
        const copy: CeilingQuota = Object.assign({}, ceilingQuota);

        return copy;
    }
}
