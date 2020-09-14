import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Stakeholder } from './stakeholder.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Stakeholder>;

@Injectable({ providedIn: 'root' })
export class StakeholderService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/stakeholders';

    constructor(private http: HttpClient) { }

    create(stakeholder: Stakeholder): Observable<EntityResponseType> {
        const copy = this.convert(stakeholder);
        return this.http.post<Stakeholder>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(stakeholder: Stakeholder): Observable<EntityResponseType> {
        const copy = this.convert(stakeholder);
        return this.http.put<Stakeholder>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Stakeholder>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Stakeholder[]>> {
        const options = createRequestOption(req);
        return this.http.get<Stakeholder[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Stakeholder[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Stakeholder = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Stakeholder[]>): HttpResponse<Stakeholder[]> {
        const jsonResponse: Stakeholder[] = res.body;
        const body: Stakeholder[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Stakeholder.
     */
    private convertItemFromServer(stakeholder: Stakeholder): Stakeholder {
        const copy: Stakeholder = Object.assign({}, stakeholder);
        return copy;
    }

    /**
     * Convert a Stakeholder to a JSON which can be sent to the server.
     */
    private convert(stakeholder: Stakeholder): Stakeholder {
        const copy: Stakeholder = Object.assign({}, stakeholder);
        return copy;
    }
}
