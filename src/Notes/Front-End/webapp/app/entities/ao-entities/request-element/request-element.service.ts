import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {RequestElement} from './request-element.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<RequestElement>;

@Injectable({ providedIn: 'root' })
export class RequestElementService {

    private resourceUrl = 'niopdcao/api/request-elements';

    private resourceRequestFilterElementUrl = 'niopdcao/api/request-filter-elements';

    constructor(private http: HttpClient) {
    }

    create(requestElement: RequestElement): Observable<EntityResponseType> {
        const copy = this.convert(requestElement);
        return this.http.post<RequestElement>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(requestElement: RequestElement): Observable<EntityResponseType> {
        const copy = this.convert(requestElement);
        return this.http.put<RequestElement>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RequestElement>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(requestFilterElementId: any, req?: any): Observable<HttpResponse<RequestElement[]>> {
        const options = createRequestOption(req);
        return this.http.get<RequestElement[]>(this.resourceRequestFilterElementUrl + '/' + requestFilterElementId + '/request-elements', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<RequestElement[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RequestElement = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RequestElement[]>): HttpResponse<RequestElement[]> {
        const jsonResponse: RequestElement[] = res.body;
        const body: RequestElement[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RequestElement.
     */
    private convertItemFromServer(requestElement: RequestElement): RequestElement {
        const copy: RequestElement = Object.assign(new RequestElement(), requestElement);
        return copy;
    }

    /**
     * Convert a RequestElement to a JSON which can be sent to the server.
     */
    private convert(requestElement: RequestElement): RequestElement {
        const copy: RequestElement = Object.assign({}, requestElement);

        return copy;
    }
}
