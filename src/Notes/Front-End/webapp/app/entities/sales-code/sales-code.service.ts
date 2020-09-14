import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SalesCode } from './sales-code.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SalesCode>;

@Injectable({ providedIn: 'root' })
export class SalesCodeService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/sales-codes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(salesCode: SalesCode): Observable<EntityResponseType> {
        const copy = this.convert(salesCode);
        return this.http.post<SalesCode>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(salesCode: SalesCode): Observable<EntityResponseType> {
        const copy = this.convert(salesCode);
        return this.http.put<SalesCode>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SalesCode>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SalesCode[]>> {
        const options = createRequestOption(req);
        return this.http.get<SalesCode[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SalesCode[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SalesCode = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SalesCode[]>): HttpResponse<SalesCode[]> {
        const jsonResponse: SalesCode[] = res.body;
        const body: SalesCode[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SalesCode.
     */
    private convertItemFromServer(salesCode: SalesCode): SalesCode {
        const copy: SalesCode = Object.assign({}, salesCode);
        copy.receivedDate = this.dateUtils
            .convertDateTimeFromServer(salesCode.receivedDate);
        return copy;
    }

    /**
     * Convert a SalesCode to a JSON which can be sent to the server.
     */
    private convert(salesCode: SalesCode): SalesCode {
        const copy: SalesCode = Object.assign({}, salesCode);

        copy.receivedDate = this.dateUtils.toDate(salesCode.receivedDate);
        return copy;
    }
}
