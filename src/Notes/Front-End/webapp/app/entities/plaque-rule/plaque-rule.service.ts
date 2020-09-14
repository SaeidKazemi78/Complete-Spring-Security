import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PlaqueRule } from './plaque-rule.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PlaqueRule>;

@Injectable({ providedIn: 'root' })
export class PlaqueRuleService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/plaque-rules';
    private resourcePlaqueUrl = SERVER_API_URL + 'niopdcbase/api/plaques';
    constructor(private http: HttpClient) { }

    create(plaqueRule: PlaqueRule): Observable<EntityResponseType> {
        const copy = this.convert(plaqueRule);
        return this.http.post<PlaqueRule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(plaqueRule: PlaqueRule): Observable<EntityResponseType> {
        const copy = this.convert(plaqueRule);
        return this.http.put<PlaqueRule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PlaqueRule>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(  plaqueCode: any , req?: any): Observable<HttpResponse<PlaqueRule[]>> {
        const options = createRequestOption(req);
        return this.http.get<PlaqueRule[]>(this.resourcePlaqueUrl + '/' + plaqueCode + '/plaque-rules' , { params: options, observe: 'response' })
            .map((res: HttpResponse<PlaqueRule[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PlaqueRule = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PlaqueRule[]>): HttpResponse<PlaqueRule[]> {
        const jsonResponse: PlaqueRule[] = res.body;
        const body: PlaqueRule[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PlaqueRule.
     */
    private convertItemFromServer(plaqueRule: PlaqueRule): PlaqueRule {
        const copy: PlaqueRule = Object.assign({}, plaqueRule);
        return copy;
    }

    /**
     * Convert a PlaqueRule to a JSON which can be sent to the server.
     */
    private convert(plaqueRule: PlaqueRule): PlaqueRule {
        const copy: PlaqueRule = Object.assign({}, plaqueRule);
        return copy;
    }
}
