import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { NiopdcConfig } from './niopdc-config.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<NiopdcConfig>;

@Injectable({ providedIn: 'root' })
export class NiopdcConfigService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/niopdc-configs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(niopdcConfig: NiopdcConfig): Observable<EntityResponseType> {
        const copy = this.convert(niopdcConfig);
        return this.http.post<NiopdcConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(niopdcConfig: NiopdcConfig): Observable<EntityResponseType> {
        const copy = this.convert(niopdcConfig);
        return this.http.put<NiopdcConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<NiopdcConfig>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<NiopdcConfig[]>> {
        const options = createRequestOption(req);
        return this.http.get<NiopdcConfig[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<NiopdcConfig[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: NiopdcConfig = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<NiopdcConfig[]>): HttpResponse<NiopdcConfig[]> {
        const jsonResponse: NiopdcConfig[] = res.body;
        const body: NiopdcConfig[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to NiopdcConfig.
     */
    private convertItemFromServer(niopdcConfig: NiopdcConfig): NiopdcConfig {
        const copy: NiopdcConfig = Object.assign({}, niopdcConfig);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(niopdcConfig.startDate);
        copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(niopdcConfig.finishDate);
        return copy;
    }

    /**
     * Convert a NiopdcConfig to a JSON which can be sent to the server.
     */
    private convert(niopdcConfig: NiopdcConfig): NiopdcConfig {
        const copy: NiopdcConfig = Object.assign({}, niopdcConfig);

        return copy;
    }
}
