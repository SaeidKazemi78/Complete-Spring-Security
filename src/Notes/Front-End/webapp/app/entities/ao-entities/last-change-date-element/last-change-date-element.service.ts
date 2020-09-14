import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {LastChangeDateElement} from './last-change-date-element.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<LastChangeDateElement>;

@Injectable({ providedIn: 'root' })
export class LastChangeDateElementService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/last-change-date-elements';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(lastChangeDateElement: LastChangeDateElement): Observable<EntityResponseType> {
        const copy = this.convert(lastChangeDateElement);
        return this.http.post<LastChangeDateElement>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(lastChangeDateElement: LastChangeDateElement): Observable<EntityResponseType> {
        const copy = this.convert(lastChangeDateElement);
        return this.http.put<LastChangeDateElement>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LastChangeDateElement>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LastChangeDateElement[]>> {
        const options = createRequestOption(req);
        return this.http.get<LastChangeDateElement[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<LastChangeDateElement[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LastChangeDateElement = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LastChangeDateElement[]>): HttpResponse<LastChangeDateElement[]> {
        const jsonResponse: LastChangeDateElement[] = res.body;
        const body: LastChangeDateElement[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LastChangeDateElement.
     */
    private convertItemFromServer(lastChangeDateElement: LastChangeDateElement): LastChangeDateElement {
        const copy: LastChangeDateElement = Object.assign({}, lastChangeDateElement);
        copy.lastChangeDate = this.dateUtils
            .convertDateTimeFromServer(lastChangeDateElement.lastChangeDate);
        return copy;
    }

    /**
     * Convert a LastChangeDateElement to a JSON which can be sent to the server.
     */
    private convert(lastChangeDateElement: LastChangeDateElement): LastChangeDateElement {
        const copy: LastChangeDateElement = Object.assign({}, lastChangeDateElement);

        copy.lastChangeDate = this.dateUtils.toDate(lastChangeDateElement.lastChangeDate);
        return copy;
    }
}
