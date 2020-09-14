import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {JhiDateUtils} from 'ng-jhipster';

import {Element} from './element.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<Element>;

@Injectable({ providedIn: 'root' })
export class ElementService {

    private resourceUrl = 'niopdcao/api/elements';

    private resourceFilterUrl = 'niopdcao/api/filters';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(element: Element): Observable<EntityResponseType> {
        const copy = this.convert(element);
        return this.http.post<Element>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(element: Element): Observable<EntityResponseType> {
        const copy = this.convert(element);
        return this.http.put<Element>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Element>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(filterId: any, req?: any): Observable<HttpResponse<Element[]>> {
        const options = createRequestOption(req);
        return this.http.get<Element[]>(this.resourceFilterUrl + '/' + filterId + '/elements', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Element[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Element = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Element[]>): HttpResponse<Element[]> {
        const jsonResponse: Element[] = res.body;
        const body: Element[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Element.
     */
    private convertItemFromServer(element: Element): Element {
        const copy: Element = Object.assign(new Element(), element);
        copy.lastChangeDate = this.dateUtils
            .convertDateTimeFromServer(copy.lastChangeDate);
        return copy;
    }

    /**
     * Convert a Element to a JSON which can be sent to the server.
     */
    private convert(element: Element): Element {
        const copy: Element = Object.assign({}, element);

        return copy;
    }
}
