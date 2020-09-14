import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UserConfig } from './user-config.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserConfig>;

@Injectable({ providedIn: 'root' })
export class UserConfigService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/user-configs';

    constructor(private http: HttpClient) { }

    create(userConfig: UserConfig): Observable<EntityResponseType> {
        const copy = this.convert(userConfig);
        return this.http.post<UserConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userConfig: UserConfig): Observable<EntityResponseType> {
        const copy = this.convert(userConfig);
        return this.http.put<UserConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserConfig>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserConfig[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserConfig[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserConfig[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserConfig = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserConfig[]>): HttpResponse<UserConfig[]> {
        const jsonResponse: UserConfig[] = res.body;
        const body: UserConfig[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserConfig.
     */
    private convertItemFromServer(userConfig: UserConfig): UserConfig {
        const copy: UserConfig = Object.assign({}, userConfig);
        return copy;
    }

    /**
     * Convert a UserConfig to a JSON which can be sent to the server.
     */
    private convert(userConfig: UserConfig): UserConfig {
        const copy: UserConfig = Object.assign({}, userConfig);
        return copy;
    }
}
