import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {MainAuthority} from './main-authority.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<MainAuthority>;

@Injectable({ providedIn: 'root' })
export class MainAuthorityService {

    private resourceUrl =  SERVER_API_URL + 'niopdcuaa/api/authorities';
    private resourceParentAuthorityUrl = SERVER_API_URL + 'niopdcuaa/api/parent-authorities';

    constructor(private http: HttpClient) { }

    create(mainAuthority: MainAuthority): Observable<EntityResponseType> {
        const copy = this.convert(mainAuthority);
        return this.http.post<MainAuthority>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(mainAuthority: MainAuthority): Observable<EntityResponseType> {
        const copy = this.convert(mainAuthority);
        return this.http.put<MainAuthority>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(name: String): Observable<EntityResponseType> {
        return this.http.get<MainAuthority>(`${this.resourceUrl}/${name}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(parentAuthorityId, req?: any): Observable<HttpResponse<MainAuthority[]>> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceParentAuthorityUrl + '/' + parentAuthorityId + '/authorities', {params: options, observe: 'response'})
            .map((res: HttpResponse<MainAuthority[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MainAuthority = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MainAuthority[]>): HttpResponse<MainAuthority[]> {
        const jsonResponse: MainAuthority[] = res.body;
        const body: MainAuthority[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Location.
     */
    private convertItemFromServer(mainAuthority: MainAuthority): MainAuthority {
        const copy: MainAuthority = Object.assign({}, mainAuthority);
        return copy;
    }

    /**
     * Convert a Location to a JSON which can be sent to the server.
     */
    private convert(mainAuthority: MainAuthority): MainAuthority {
        const copy: MainAuthority = Object.assign({}, mainAuthority);
        return copy;
    }
}
