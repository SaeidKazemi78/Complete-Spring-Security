import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {ResponsePlunging} from './response-plunging.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<ResponsePlunging>;

@Injectable({ providedIn: 'root' })
export class ResponsePlungingService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/response-plungings';
    private resourceRequestPlungingUrl = SERVER_API_URL + 'niopdcao/api/request-plungings';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(responsePlunging: ResponsePlunging): Observable<EntityResponseType> {
        const copy = this.convert(responsePlunging);
        return this.http.post<ResponsePlunging>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(responsePlunging: ResponsePlunging): Observable<EntityResponseType> {
        const copy = this.convert(responsePlunging);
        return this.http.put<ResponsePlunging>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ResponsePlunging>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(requestPlungingId: any, req?: any): Observable<HttpResponse<ResponsePlunging[]>> {
        const options = createRequestOption(req);
        return this.http.get<ResponsePlunging[]>(this.resourceRequestPlungingUrl + '/' + requestPlungingId + '/response-plungings', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<ResponsePlunging[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ResponsePlunging = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ResponsePlunging[]>): HttpResponse<ResponsePlunging[]> {
        const jsonResponse: ResponsePlunging[] = res.body;
        const body: ResponsePlunging[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ResponsePlunging.
     */
    private convertItemFromServer(responsePlunging: ResponsePlunging): ResponsePlunging {
        const copy: ResponsePlunging = Object.assign({}, responsePlunging);
        copy.responseDate = this.dateUtils
            .convertDateTimeFromServer(responsePlunging.responseDate);
        return copy;
    }

    /**
     * Convert a ResponsePlunging to a JSON which can be sent to the server.
     */
    private convert(responsePlunging: ResponsePlunging): ResponsePlunging {
        const copy: ResponsePlunging = Object.assign({}, responsePlunging);

        return copy;
    }
}
