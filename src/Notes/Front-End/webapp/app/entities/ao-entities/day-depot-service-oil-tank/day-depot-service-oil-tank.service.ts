import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {DayDepotServiceOilTank} from './day-depot-service-oil-tank.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<DayDepotServiceOilTank>;

@Injectable({ providedIn: 'root' })
export class DayDepotServiceOilTankService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/day-depot-service-oil-tanks';
    private resourceDayDepotUrl = SERVER_API_URL + 'niopdcao/api/day-depots';

    constructor(private http: HttpClient) {
    }

    create(dayDepotServiceOilTank: DayDepotServiceOilTank): Observable<EntityResponseType> {
        const copy = this.convert(dayDepotServiceOilTank);
        return this.http.post<DayDepotServiceOilTank>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(dayDepotServiceOilTank: DayDepotServiceOilTank): Observable<EntityResponseType> {
        const copy = this.convert(dayDepotServiceOilTank);
        return this.http.put<DayDepotServiceOilTank>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DayDepotServiceOilTank>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(dayDepotId: any, req?: any): Observable<HttpResponse<DayDepotServiceOilTank[]>> {
        const options = createRequestOption(req);
        return this.http.get<DayDepotServiceOilTank[]>(this.resourceDayDepotUrl + '/' + dayDepotId + '/day-depot-service-oil-tanks', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<DayDepotServiceOilTank[]>) => this.convertArrayResponse(res));
    }

    listOfIds(dayDepotId: any): Observable<HttpResponse<number[]>> {
        return this.http.get<number[]>(this.resourceDayDepotUrl + '/' + dayDepotId + '/day-depot-service-oil-tanks/ids', {observe: 'response'})
            .map((res: HttpResponse<number[]>) => res);
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    fullEndMeasurement(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/full-end-measurement/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DayDepotServiceOilTank = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DayDepotServiceOilTank[]>): HttpResponse<DayDepotServiceOilTank[]> {
        const jsonResponse: DayDepotServiceOilTank[] = res.body;
        const body: DayDepotServiceOilTank[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DayDepotServiceOilTank.
     */
    private convertItemFromServer(dayDepotServiceOilTank: DayDepotServiceOilTank): DayDepotServiceOilTank {
        const copy: DayDepotServiceOilTank = Object.assign({}, dayDepotServiceOilTank);
        return copy;
    }

    /**
     * Convert a DayDepotServiceOilTank to a JSON which can be sent to the server.
     */
    private convert(dayDepotServiceOilTank: DayDepotServiceOilTank): DayDepotServiceOilTank {
        const copy: DayDepotServiceOilTank = Object.assign({}, dayDepotServiceOilTank);
        return copy;
    }
}
