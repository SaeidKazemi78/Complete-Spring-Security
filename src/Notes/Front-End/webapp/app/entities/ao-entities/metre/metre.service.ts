import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {Metre} from './metre.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<Metre>;

@Injectable({ providedIn: 'root' })
export class MetreService {

    private resourceUrl = SERVER_API_URL + '/niopdcao/api/metres';

    private resourceOilTankUrl = 'niopdcao/api/oil-tanks';
    private resourceDayDepotUrl = 'niopdcao/api/day-depots';

    constructor(private http: HttpClient) {
    }

    create(metre: Metre): Observable<EntityResponseType> {
        const copy = this.convert(metre);
        return this.http.post<Metre>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(metre: Metre): Observable<EntityResponseType> {
        const copy = this.convert(metre);
        return this.http.put<Metre>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Metre>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getStartMetre(id: number, metreId: number, registerDate: Date): Observable<any> {

        return this.http.get<Metre>(`${this.resourceUrl}/order-product/${id}/metre/${metreId}/date/${registerDate.toISOString()}/end-mitre`, {observe: 'response'})
            .map((res: any) => res);
    }

    query(oilTankId?: any, req?: any): Observable<HttpResponse<Metre[]>> {
        const options = createRequestOption(req);
        return this.http.get<Metre[]>(this.resourceOilTankUrl + '/' + oilTankId + '/metres', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Metre[]>) => this.convertArrayResponse(res));
    }

    queryByDayDepotId(dayDepotId?: any, req?: any): Observable<HttpResponse<Metre[]>> {
        const options = createRequestOption(req);
        return this.http.get<Metre[]>(`${this.resourceDayDepotUrl}/${dayDepotId}/metres`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Metre[]>) => this.convertArrayResponse(res));
    }

    getMetreActiveStatus(oilTankId: number): Observable<HttpResponse<Metre[]>> {
        return this.http.get<Metre[]>(this.resourceOilTankUrl + '/' + oilTankId + '/metres/active', {observe: 'response'})
            .map((res: HttpResponse<Metre[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Metre = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Metre[]>): HttpResponse<Metre[]> {
        const jsonResponse: Metre[] = res.body;
        const body: Metre[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Metre.
     */
    private convertItemFromServer(metre: Metre): Metre {
        const copy: Metre = Object.assign({}, metre);
        return copy;
    }

    /**
     * Convert a Metre to a JSON which can be sent to the server.
     */
    private convert(metre: Metre): Metre {
        const copy: Metre = Object.assign({}, metre);
        return copy;
    }
}
