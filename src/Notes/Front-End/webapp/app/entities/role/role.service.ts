import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {Role, UserRole} from './role.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<Role>;

@Injectable({providedIn: 'root'})
export class RoleService {

    private resourceUrl = SERVER_API_URL + '/niopdcuaa/api/roles';

    constructor(private http: HttpClient) {
    }

    create(role: Role): Observable<EntityResponseType> {
        const copy = this.convert(role);
        return this.http.post<Role>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(role: Role): Observable<EntityResponseType> {
        const copy = this.convert(role);
        return this.http.put<Role>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get(`${this.resourceUrl}/all/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Role[]>> {
        const options = createRequestOption(req);
        return this.http.get<Role[]>(this.resourceUrl + '/all', {params: options, observe: 'response'})
            .map((res: HttpResponse<Role[]>) => this.convertArrayResponse(res));
    }

    getAllRole(userType: string, req?: any): Observable<HttpResponse<Role[]>> {
        const options = createRequestOption(req);
        return this.http.get<Role[]>(this.resourceUrl + '/summarize/' + userType, {params: options, observe: 'response'})
            .map((res: HttpResponse<Role[]>) => this.convertArrayResponse(res));
    }

    getMySample(val:number):Observable<String>{
        return this.http.get<String>(this.resourceUrl+'/get-my-val'+'/'+val);
    }

    readListByUserTypeAndGrantable(userType?: any, req?: any): Observable<HttpResponse<UserRole[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserRole[]>(this.resourceUrl + `/read/${userType}`, {
            params: options,
            observe: 'response'
        });
    }

    getAuthority(ids?: number[]): Observable<HttpResponse<any>> {
        const params = new HttpParams().set('ids', ids.toString());
        return this.http.get<any>(this.resourceUrl + `/authority`, {params, observe: 'response'})
            .map((res: HttpResponse<any>) => res);
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Role = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Role[]>): HttpResponse<Role[]> {
        const jsonResponse: Role[] = res.body;
        const body: Role[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Location.
     */
    private convertItemFromServer(role: Role): Role {
        const copy: Role = Object.assign({}, role);
        return copy;
    }

    /**
     * Convert a Location to a JSON which can be sent to the server.
     */
    private convert(role: Role): Role {
        const copy: Role = Object.assign({}, role);
        return copy;
    }

}
