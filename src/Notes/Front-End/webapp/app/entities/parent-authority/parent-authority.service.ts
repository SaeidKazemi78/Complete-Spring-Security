import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {ParentAuthority} from './parent-authority.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<ParentAuthority>;

@Injectable({ providedIn: 'root' })
export class ParentAuthorityService {

    private resourceUrl =  SERVER_API_URL + '/niopdcuaa/api/parent-authorities';
    private resourceSearchUrl = SERVER_API_URL + 'niopdcuaa/api/_search/parent-authorities';

    constructor(private http: HttpClient) { }

    create(parentAuthority: ParentAuthority): Observable<EntityResponseType> {
        const copy = this.convert(parentAuthority);
        return this.http.post<ParentAuthority>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(parentAuthority: ParentAuthority): Observable<EntityResponseType> {
        const copy = this.convert(parentAuthority);
        return this.http.put<ParentAuthority>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ParentAuthority>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ParentAuthority[]>> {
        const options = createRequestOption(req);
        return this.http.get<ParentAuthority[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<ParentAuthority[]>) => this.convertArrayResponse(res));
    }

    queryAllWithEagerRelationships(): Observable<HttpResponse<ParentAuthority[]>> {
        return this.http.get<ParentAuthority[]>(this.resourceUrl + '/fetch/all', {observe: 'response'})
            .map((res: HttpResponse<ParentAuthority[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ParentAuthority = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ParentAuthority[]>): HttpResponse<ParentAuthority[]> {
        const jsonResponse: ParentAuthority[] = res.body;
        const body: ParentAuthority[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Location.
     */
    private convertItemFromServer(parentAuthority: ParentAuthority): ParentAuthority {
        const copy: ParentAuthority = Object.assign({}, parentAuthority);
        return copy;
    }

    /**
     * Convert a Location to a JSON which can be sent to the server.
     */
    private convert(parentAuthority: ParentAuthority): ParentAuthority {
        const copy: ParentAuthority = Object.assign({}, parentAuthority);
        return copy;
    }
}
