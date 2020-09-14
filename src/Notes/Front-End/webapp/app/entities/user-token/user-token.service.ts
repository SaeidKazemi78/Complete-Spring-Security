import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UserToken } from './user-token.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserToken>;

@Injectable({ providedIn: 'root' })
export class UserTokenService {

    private resourceUrl =  SERVER_API_URL + '/niopdcuaa/api/user-tokens';
    private resourceUserManagementUrl = SERVER_API_URL + 'niopdcuaa/api/users';

    constructor(private http: HttpClient) { }

    create(userToken: UserToken): Observable<EntityResponseType> {
        const copy = this.convert(userToken);
        return this.http.post<UserToken>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userToken: UserToken): Observable<EntityResponseType> {
        const copy = this.convert(userToken);
        return this.http.put<UserToken>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserToken>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( userManagementId: any, req?: any): Observable<HttpResponse<UserToken[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserToken[]>(this.resourceUserManagementUrl + '/' + userManagementId + '/user-tokens', { params: options, observe: 'response' })
            .map((res: HttpResponse<UserToken[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserToken = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserToken[]>): HttpResponse<UserToken[]> {
        const jsonResponse: UserToken[] = res.body;
        const body: UserToken[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserToken.
     */
    private convertItemFromServer(userToken: UserToken): UserToken {
        const copy: UserToken = Object.assign({}, userToken);
        return copy;
    }

    /**
     * Convert a UserToken to a JSON which can be sent to the server.
     */
    private convert(userToken: UserToken): UserToken {
        const copy: UserToken = Object.assign({}, userToken);
        return copy;
    }
}
