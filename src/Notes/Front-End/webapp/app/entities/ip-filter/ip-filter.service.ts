import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { IpFilter } from './ip-filter.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<IpFilter>;

@Injectable({ providedIn: 'root' })
export class IpFilterService {

    private resourceUrl =  SERVER_API_URL + '/niopdcuaa/api/ip-filters';
    private resourceUserManagementUrl = SERVER_API_URL + 'niopdcuaa/api/users';

    constructor(private http: HttpClient) { }

    create(ipFilter: IpFilter): Observable<EntityResponseType> {
        const copy = this.convert(ipFilter);
        return this.http.post<IpFilter>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ipFilter: IpFilter): Observable<EntityResponseType> {
        const copy = this.convert(ipFilter);
        return this.http.put<IpFilter>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IpFilter>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( userManagementId: any, req?: any): Observable<HttpResponse<IpFilter[]>> {
        const options = createRequestOption(req);
        return this.http.get<IpFilter[]>(this.resourceUserManagementUrl + '/' + userManagementId + '/ip-filters', { params: options, observe: 'response' })
            .map((res: HttpResponse<IpFilter[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IpFilter = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<IpFilter[]>): HttpResponse<IpFilter[]> {
        const jsonResponse: IpFilter[] = res.body;
        const body: IpFilter[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to IpFilter.
     */
    private convertItemFromServer(ipFilter: IpFilter): IpFilter {
        const copy: IpFilter = Object.assign({}, ipFilter);
        return copy;
    }

    /**
     * Convert a IpFilter to a JSON which can be sent to the server.
     */
    private convert(ipFilter: IpFilter): IpFilter {
        const copy: IpFilter = Object.assign({}, ipFilter);
        return copy;
    }
}
