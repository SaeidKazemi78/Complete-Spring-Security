import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {JhiDateUtils} from 'ng-jhipster';

import {Supply} from './supply.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<Supply>;

@Injectable({providedIn: 'root'})
export class SupplyService {

    private resourceUrl = 'niopdcbase/api/supplies';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(supply: Supply): Observable<EntityResponseType> {
        const copy = this.convert(supply);
        return this.http.post<Supply>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(supply: Supply): Observable<EntityResponseType> {
        const copy = this.convert(supply);
        return this.http.put<Supply>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Supply>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Supply[]>> {
        const options = createRequestOption(req);
        return this.http.get<Supply[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<Supply[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Supply = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Supply[]>): HttpResponse<Supply[]> {
        const jsonResponse: Supply[] = res.body;
        const body: Supply[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Supply.
     */
    private convertItemFromServer(supply: Supply): Supply {
        const copy: Supply = Object.assign(new Supply(), supply);
        copy.supplyDate = this.dateUtils
            .convertDateTimeFromServer(copy.supplyDate);
        return copy;
    }

    /**
     * Convert a Supply to a JSON which can be sent to the server.
     */
    private convert(supply: Supply): Supply {
        const copy: Supply = Object.assign({}, supply);

        return copy;
    }
}
