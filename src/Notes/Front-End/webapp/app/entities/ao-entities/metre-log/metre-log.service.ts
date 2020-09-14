import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {MetreLog} from './metre-log.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<MetreLog>;

@Injectable({ providedIn: 'root' })
export class MetreLogService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/metre-logs';
    private resourceMetreUrl = SERVER_API_URL + 'niopdcao/api/metres/';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(metreLog: MetreLog): Observable<EntityResponseType> {
        const copy = this.convert(metreLog);
        return this.http.post<MetreLog>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(metreLog: MetreLog): Observable<EntityResponseType> {
        const copy = this.convert(metreLog);
        return this.http.put<MetreLog>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MetreLog>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MetreLog[]>> {
        const options = createRequestOption(req);
        return this.http.get<MetreLog[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<MetreLog[]>) => this.convertArrayResponse(res));
    }

    queryByMetre(metreId: number, req?: any): Observable<HttpResponse<MetreLog[]>> {
        const options = createRequestOption(req);
        return this.http.get<MetreLog[]>(this.resourceMetreUrl + metreId + '/metre-logs', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<MetreLog[]>) => this.convertArrayResponse(res));
    }

    queryByFilter(metreId?: any, startTime?: Date, endTime?: any, req?: any): Observable<HttpResponse<MetreLog[]>> {
        let params = createRequestOption(req);
        params = params
            .set('metreId', metreId.toString())
            .set('startTime', startTime.toISOString())
            .set('endTime', endTime.toISOString());
        return this.http.post<MetreLog[]>(`${this.resourceMetreUrl}/filter/metre-log`, params, {
            params,
            observe: 'response'
        })
            .map((res: HttpResponse<MetreLog[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MetreLog = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MetreLog[]>): HttpResponse<MetreLog[]> {
        const jsonResponse: MetreLog[] = res.body;
        const body: MetreLog[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MetreLog.
     */
    private convertItemFromServer(metreLog: MetreLog): MetreLog {
        const copy: MetreLog = Object.assign({}, metreLog);
        if (copy.logBookId) {
            copy.useType = 'لاگ بوک';
        } else if (copy.transferId) {
            copy.useType = 'انتقال';
        } else if (copy.transferPlatformToUnitId) {
            copy.useType = 'انتقال سکو به واحد';
        }
        copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(metreLog.registerDate);
        return copy;
    }

    /**
     * Convert a MetreLog to a JSON which can be sent to the server.
     */
    private convert(metreLog: MetreLog): MetreLog {
        const copy: MetreLog = Object.assign({}, metreLog);

        return copy;
    }
}
