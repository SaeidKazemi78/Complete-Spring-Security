import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {ChangeRequestElement} from './change-request-element.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<ChangeRequestElement>;

@Injectable({ providedIn: 'root' })
export class ChangeRequestElementService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/change-request-elements';

    constructor(private http: HttpClient) {
    }

    create(changeRequestElement: ChangeRequestElement): Observable<EntityResponseType> {
        const copy = this.convert(changeRequestElement);
        return this.http.post<ChangeRequestElement>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(changeRequestElement: ChangeRequestElement): Observable<EntityResponseType> {
        const copy = this.convert(changeRequestElement);
        return this.http.put<ChangeRequestElement>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ChangeRequestElement>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ChangeRequestElement[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChangeRequestElement[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<ChangeRequestElement[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ChangeRequestElement = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ChangeRequestElement[]>): HttpResponse<ChangeRequestElement[]> {
        const jsonResponse: ChangeRequestElement[] = res.body;
        const body: ChangeRequestElement[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ChangeRequestElement.
     */
    private convertItemFromServer(changeRequestElement: ChangeRequestElement): ChangeRequestElement {
        const copy: ChangeRequestElement = Object.assign({}, changeRequestElement);
        return copy;
    }

    /**
     * Convert a ChangeRequestElement to a JSON which can be sent to the server.
     */
    private convert(changeRequestElement: ChangeRequestElement): ChangeRequestElement {
        const copy: ChangeRequestElement = Object.assign({}, changeRequestElement);
        return copy;
    }
}
