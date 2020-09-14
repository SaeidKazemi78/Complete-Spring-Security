import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ReservoirCapacity } from './reservoir-capacity.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ReservoirCapacity>;

@Injectable({ providedIn: 'root' })
export class ReservoirCapacityService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/reservoir-capacities';

    constructor(private http: HttpClient) { }

    create(reservoirCapacity: ReservoirCapacity): Observable<EntityResponseType> {
        const copy = this.convert(reservoirCapacity);
        return this.http.post<ReservoirCapacity>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(reservoirCapacity: ReservoirCapacity): Observable<EntityResponseType> {
        const copy = this.convert(reservoirCapacity);
        return this.http.put<ReservoirCapacity>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReservoirCapacity>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ReservoirCapacity[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReservoirCapacity[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReservoirCapacity[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReservoirCapacity = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ReservoirCapacity[]>): HttpResponse<ReservoirCapacity[]> {
        const jsonResponse: ReservoirCapacity[] = res.body;
        const body: ReservoirCapacity[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ReservoirCapacity.
     */
    private convertItemFromServer(reservoirCapacity: ReservoirCapacity): ReservoirCapacity {
        const copy: ReservoirCapacity = Object.assign({}, reservoirCapacity);
        return copy;
    }

    /**
     * Convert a ReservoirCapacity to a JSON which can be sent to the server.
     */
    private convert(reservoirCapacity: ReservoirCapacity): ReservoirCapacity {
        const copy: ReservoirCapacity = Object.assign({}, reservoirCapacity);
        return copy;
    }
}
