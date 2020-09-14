import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {RequestPlunging} from './request-plunging.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<RequestPlunging>;

@Injectable({ providedIn: 'root' })
export class RequestPlungingService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/request-plungings';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(requestPlunging: RequestPlunging): Observable<EntityResponseType> {
        const copy = this.convert(requestPlunging);
        return this.http.post<RequestPlunging>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(requestPlunging: RequestPlunging): Observable<EntityResponseType> {
        const copy = this.convert(requestPlunging);
        return this.http.put<RequestPlunging>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RequestPlunging>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RequestPlunging[]>> {
        const options = createRequestOption(req);
        return this.http.get<RequestPlunging[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<RequestPlunging[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RequestPlunging = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RequestPlunging[]>): HttpResponse<RequestPlunging[]> {
        const jsonResponse: RequestPlunging[] = res.body;
        const body: RequestPlunging[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RequestPlunging.
     */
    private convertItemFromServer(requestPlunging: RequestPlunging): RequestPlunging {
        const copy: RequestPlunging = Object.assign({}, requestPlunging);
        copy.requestDate = this.dateUtils
            .convertDateTimeFromServer(requestPlunging.requestDate);
        return copy;
    }

    /**
     * Convert a RequestPlunging to a JSON which can be sent to the server.
     */
    private convert(requestPlunging: RequestPlunging): RequestPlunging {
        const copy: RequestPlunging = Object.assign({}, requestPlunging);

        return copy;
    }
}
