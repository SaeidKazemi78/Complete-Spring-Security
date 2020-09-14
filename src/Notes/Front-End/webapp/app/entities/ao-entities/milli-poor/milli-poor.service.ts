import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {MilliPoor} from './milli-poor.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<MilliPoor>;

@Injectable({ providedIn: 'root' })
export class MilliPoorService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/milli-poors';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(milliPoor: MilliPoor): Observable<EntityResponseType> {
        const copy = this.convert(milliPoor);
        return this.http.post<MilliPoor>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(milliPoor: MilliPoor): Observable<EntityResponseType> {
        const copy = this.convert(milliPoor);
        return this.http.put<MilliPoor>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MilliPoor>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MilliPoor[]>> {
        const options = createRequestOption(req);
        return this.http.get<MilliPoor[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<MilliPoor[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MilliPoor = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MilliPoor[]>): HttpResponse<MilliPoor[]> {
        const jsonResponse: MilliPoor[] = res.body;
        const body: MilliPoor[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MilliPoor.
     */
    private convertItemFromServer(milliPoor: MilliPoor): MilliPoor {
        const copy: MilliPoor = Object.assign({}, milliPoor);
        copy.date = this.dateUtils
            .convertDateTimeFromServer(milliPoor.date);
        return copy;
    }

    /**
     * Convert a MilliPoor to a JSON which can be sent to the server.
     */
    private convert(milliPoor: MilliPoor): MilliPoor {
        const copy: MilliPoor = Object.assign({}, milliPoor);
        return copy;
    }
}
