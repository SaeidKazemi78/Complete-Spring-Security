import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {JhiDateUtils} from 'ng-jhipster';

import {RequestTestResult} from './request-test-result.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<RequestTestResult>;

@Injectable({ providedIn: 'root' })
export class RequestTestResultService {

    private resourceUrl = 'niopdcao/api/request-test-results';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(requestTestResult: RequestTestResult): Observable<EntityResponseType> {
        const copy = this.convert(requestTestResult);
        return this.http.post<RequestTestResult>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(requestTestResult: RequestTestResult): Observable<EntityResponseType> {
        const copy = this.convert(requestTestResult);
        return this.http.put<RequestTestResult>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RequestTestResult>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(mode?: string, req?: any): Observable<HttpResponse<RequestTestResult[]>> {
        const options = createRequestOption(req);
        return this.http.get<RequestTestResult[]>(`${this.resourceUrl}/${mode}`, {params: options, observe: 'response'})
            .map((res: HttpResponse<RequestTestResult[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    send(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/${id}/send`, {observe: 'response'});
    }

    confirm(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/${id}/confirm`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RequestTestResult = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RequestTestResult[]>): HttpResponse<RequestTestResult[]> {
        const jsonResponse: RequestTestResult[] = res.body;
        const body: RequestTestResult[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RequestTestResult.
     */
    private convertItemFromServer(requestTestResult: RequestTestResult): RequestTestResult {
        const copy: RequestTestResult = Object.assign(new RequestTestResult(), requestTestResult);
        copy.date = this.dateUtils
            .convertDateTimeFromServer(copy.date);
        return copy;
    }

    /**
     * Convert a RequestTestResult to a JSON which can be sent to the server.
     */
    private convert(requestTestResult: RequestTestResult): RequestTestResult {
        const copy: RequestTestResult = Object.assign({}, requestTestResult);

        return copy;
    }
}
