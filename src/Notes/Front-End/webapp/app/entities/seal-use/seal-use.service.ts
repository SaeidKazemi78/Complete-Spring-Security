import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SealUse } from './seal-use.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SealUse>;

@Injectable({ providedIn: 'root' })
export class SealUseService {

    private resourceUrl =  SERVER_API_URL + 'niopdcao/api/seal-uses';

    constructor(private http: HttpClient) { }

    create(sealUse: SealUse): Observable<EntityResponseType> {
        const copy = this.convert(sealUse);
        return this.http.post<SealUse>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sealUse: SealUse): Observable<EntityResponseType> {
        const copy = this.convert(sealUse);
        return this.http.put<SealUse>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SealUse>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SealUse[]>> {
        const options = createRequestOption(req);
        return this.http.get<SealUse[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SealUse[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SealUse = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SealUse[]>): HttpResponse<SealUse[]> {
        const jsonResponse: SealUse[] = res.body;
        const body: SealUse[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SealUse.
     */
    private convertItemFromServer(sealUse: SealUse): SealUse {
        const copy: SealUse = Object.assign({}, sealUse);
        return copy;
    }

    /**
     * Convert a SealUse to a JSON which can be sent to the server.
     */
    private convert(sealUse: SealUse): SealUse {
        const copy: SealUse = Object.assign({}, sealUse);
        return copy;
    }
}
