import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {RequestFilterElement} from './request-filter-element.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<RequestFilterElement>;

@Injectable({ providedIn: 'root' })
export class RequestFilterElementService {

    private resourceUrl = 'niopdcao/api/request-filter-elements';

    constructor(private http: HttpClient) {
    }

    create(requestFilterElement: RequestFilterElement): Observable<EntityResponseType> {
        const copy = this.convert(requestFilterElement);
        return this.http.post<RequestFilterElement>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(requestFilterElement: RequestFilterElement): Observable<EntityResponseType> {
        const copy = this.convert(requestFilterElement);
        return this.http.put<RequestFilterElement>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RequestFilterElement>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(mode?: string, req?: any): Observable<HttpResponse<RequestFilterElement[]>> {
        console.log(mode);
        const options = createRequestOption(req);
        return this.http.get<RequestFilterElement[]>(`${this.resourceUrl}/${mode}`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<RequestFilterElement[]>) => this.convertArrayResponse(res));
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
        const body: RequestFilterElement = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RequestFilterElement[]>): HttpResponse<RequestFilterElement[]> {
        const jsonResponse: RequestFilterElement[] = res.body;
        const body: RequestFilterElement[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RequestFilterElement.
     */
    private convertItemFromServer(requestFilterElement: RequestFilterElement): RequestFilterElement {
        const copy: RequestFilterElement = Object.assign(new RequestFilterElement(), requestFilterElement);
        return copy;
    }

    /**
     * Convert a RequestFilterElement to a JSON which can be sent to the server.
     */
    private convert(requestFilterElement: RequestFilterElement): RequestFilterElement {
        const copy: RequestFilterElement = Object.assign({}, requestFilterElement);

        return copy;
    }
}
