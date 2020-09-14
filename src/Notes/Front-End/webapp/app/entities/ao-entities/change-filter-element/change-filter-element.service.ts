import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {ChangeFilterElement} from './change-filter-element.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<ChangeFilterElement>;

@Injectable({ providedIn: 'root' })
export class ChangeFilterElementService {

    private resourceUrl = 'niopdcao/api/change-filter-elements';

    private resourceRequestFilterElementUrl = 'niopdcao/api/request-filter-elements';

    constructor(private http: HttpClient) {
    }

    create(changeFilterElement: ChangeFilterElement): Observable<EntityResponseType> {
        const copy = this.convert(changeFilterElement);
        return this.http.post<ChangeFilterElement>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(changeFilterElement: ChangeFilterElement): Observable<EntityResponseType> {
        const copy = this.convert(changeFilterElement);
        return this.http.put<ChangeFilterElement>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ChangeFilterElement>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    confirm(id: number): Observable<EntityResponseType> {
        return this.http.get<ChangeFilterElement>(`${this.resourceUrl}/confirm/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    send(id: number): Observable<EntityResponseType> {
        return this.http.get<ChangeFilterElement>(`${this.resourceUrl}/send/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(requestFilterElementId: any, req?: any): Observable<HttpResponse<ChangeFilterElement[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChangeFilterElement[]>(this.resourceRequestFilterElementUrl + '/' + requestFilterElementId + '/change-filter-elements', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<ChangeFilterElement[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ChangeFilterElement = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ChangeFilterElement[]>): HttpResponse<ChangeFilterElement[]> {
        const jsonResponse: ChangeFilterElement[] = res.body;
        const body: ChangeFilterElement[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ChangeFilterElement.
     */
    private convertItemFromServer(changeFilterElement: ChangeFilterElement): ChangeFilterElement {
        const copy: ChangeFilterElement = Object.assign(new ChangeFilterElement(), changeFilterElement);
        return copy;
    }

    /**
     * Convert a ChangeFilterElement to a JSON which can be sent to the server.
     */
    private convert(changeFilterElement: ChangeFilterElement): ChangeFilterElement {
        const copy: ChangeFilterElement = Object.assign({}, changeFilterElement);

        return copy;
    }
}
