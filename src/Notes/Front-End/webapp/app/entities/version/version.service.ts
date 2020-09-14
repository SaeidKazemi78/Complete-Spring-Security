import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {Version} from './version.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<Version>;

@Injectable({providedIn: 'root'})
export class VersionService {

    private resourceUrl = SERVER_API_URL + '/api/version';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(version: Version): Observable<EntityResponseType> {
        const copy = this.convert(version);
        return this.http.post<Version>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(version: Version): Observable<EntityResponseType> {
        const copy = this.convert(version);
        return this.http.put<Version>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Version>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Version[]>> {
        const options = createRequestOption(req);
        return this.http.get<Version[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<Version[]>) => this.convertArrayResponse(res));
    }

    getTop3(): Observable<HttpResponse<Version[]>> {
        return this.http.get<Version[]>(`${this.resourceUrl}/last`, {observe: 'response'})
            .map((res: HttpResponse<Version[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Version = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Version[]>): HttpResponse<Version[]> {
        const jsonResponse: Version[] = res.body;
        const body: Version[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to News.
     */
    private convertItemFromServer(version: Version): Version {
        const copy: Version = Object.assign({}, version);
        copy.versionDate = this.dateUtils
            .convertDateTimeFromServer(version.versionDate);

        return copy;
    }

    /**
     * Convert a News to a JSON which can be sent to the server.
     */
    private convert(version: Version): Version {
        const copy: Version = Object.assign({}, version);
        return copy;
    }
}
