import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { RoleLevel } from './role-level.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RoleLevel>;

@Injectable({ providedIn: 'root' })
export class RoleLevelService {

    private resourceUrl = 'niopdcuaa/api/role-levels';

    constructor(private http: HttpClient) { }

    create(roleLevel: RoleLevel): Observable<EntityResponseType> {
            const copy = this.convert(roleLevel);
        return this.http.post<RoleLevel>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(roleLevel: RoleLevel): Observable<EntityResponseType> {
        const copy = this.convert(roleLevel);
        return this.http.put<RoleLevel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RoleLevel>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RoleLevel[]>> {
        const options = createRequestOption(req);
        return this.http.get<RoleLevel[]>(this. resourceUrl ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<RoleLevel[]>) => this.convertArrayResponse(res));
    }

    findAll(): Observable<HttpResponse<RoleLevel[]>> {
        return this.http.get<RoleLevel[]>(this. resourceUrl ,  { observe: 'response' })
            .map((res: HttpResponse<RoleLevel[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RoleLevel = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RoleLevel[]>): HttpResponse<RoleLevel[]> {
        const jsonResponse: RoleLevel[] = res.body;
        const body: RoleLevel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RoleLevel.
     */
    private convertItemFromServer(roleLevel: RoleLevel): RoleLevel {
        const copy: RoleLevel = Object.assign(new RoleLevel(), roleLevel);
        return copy;
    }

    /**
     * Convert a RoleLevel to a JSON which can be sent to the server.
     */
    private convert(roleLevel: RoleLevel): RoleLevel {
        const copy: RoleLevel = Object.assign({}, roleLevel);

        return copy;
    }
}
