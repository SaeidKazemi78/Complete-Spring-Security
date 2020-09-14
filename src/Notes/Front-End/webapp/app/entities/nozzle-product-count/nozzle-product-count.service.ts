import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { NozzleProductCount } from './nozzle-product-count.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<NozzleProductCount>;

@Injectable({ providedIn: 'root' })
export class NozzleProductCountService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/nozzle-product-counts';

    constructor(private http: HttpClient) { }

    create(nozzleProductCount: NozzleProductCount): Observable<EntityResponseType> {
        const copy = this.convert(nozzleProductCount);
        return this.http.post<NozzleProductCount>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(nozzleProductCount: NozzleProductCount): Observable<EntityResponseType> {
        const copy = this.convert(nozzleProductCount);
        return this.http.put<NozzleProductCount>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<NozzleProductCount>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<NozzleProductCount[]>> {
        const options = createRequestOption(req);
        return this.http.get<NozzleProductCount[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<NozzleProductCount[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: NozzleProductCount = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<NozzleProductCount[]>): HttpResponse<NozzleProductCount[]> {
        const jsonResponse: NozzleProductCount[] = res.body;
        const body: NozzleProductCount[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to NozzleProductCount.
     */
    private convertItemFromServer(nozzleProductCount: NozzleProductCount): NozzleProductCount {
        const copy: NozzleProductCount = Object.assign({}, nozzleProductCount);
        return copy;
    }

    /**
     * Convert a NozzleProductCount to a JSON which can be sent to the server.
     */
    private convert(nozzleProductCount: NozzleProductCount): NozzleProductCount {
        const copy: NozzleProductCount = Object.assign({}, nozzleProductCount);
        return copy;
    }
}
