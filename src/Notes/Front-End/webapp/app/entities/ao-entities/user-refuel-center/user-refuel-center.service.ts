import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {UserRefuelCenter} from './user-refuel-center.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<UserRefuelCenter>;

@Injectable({ providedIn: 'root' })
export class UserRefuelCenterService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/user-refuel-centers';

    constructor(private http: HttpClient) {
    }

    create(userRefuelCenter: UserRefuelCenter): Observable<EntityResponseType> {
        const copy = this.convert(userRefuelCenter);
        return this.http.post<UserRefuelCenter>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userRefuelCenter: UserRefuelCenter): Observable<EntityResponseType> {
        const copy = this.convert(userRefuelCenter);
        return this.http.put<UserRefuelCenter>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserRefuelCenter>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByUsername(username: any): Observable<EntityResponseType> {
        return this.http.get<UserRefuelCenter>(`${this.resourceUrl}/username/${username}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserRefuelCenter[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserRefuelCenter[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<UserRefuelCenter[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserRefuelCenter = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserRefuelCenter[]>): HttpResponse<UserRefuelCenter[]> {
        const jsonResponse: UserRefuelCenter[] = res.body;
        const body: UserRefuelCenter[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserRefuelCenter.
     */
    private convertItemFromServer(userRefuelCenter: UserRefuelCenter): UserRefuelCenter {
        const copy: UserRefuelCenter = Object.assign({}, userRefuelCenter);
        return copy;
    }

    /**
     * Convert a UserRefuelCenter to a JSON which can be sent to the server.
     */
    private convert(userRefuelCenter: UserRefuelCenter): UserRefuelCenter {
        const copy: UserRefuelCenter = Object.assign({}, userRefuelCenter);
        return copy;
    }
}
