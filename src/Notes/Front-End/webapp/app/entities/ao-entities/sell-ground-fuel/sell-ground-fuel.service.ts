import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {SellGroundFuel} from './sell-ground-fuel.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<SellGroundFuel>;

@Injectable({ providedIn: 'root' })
export class SellGroundFuelService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/sell-ground-fuels';
    private resourceDayDepotUrl = SERVER_API_URL + 'niopdcao/api/day-depots';

    constructor(private http: HttpClient) {
    }

    create(sellGroundFuel: SellGroundFuel): Observable<EntityResponseType> {
        const copy = this.convert(sellGroundFuel);
        return this.http.post<SellGroundFuel>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sellGroundFuel: SellGroundFuel): Observable<EntityResponseType> {
        const copy = this.convert(sellGroundFuel);
        return this.http.put<SellGroundFuel>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SellGroundFuel>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(dayDepotId: any, req?: any): Observable<HttpResponse<SellGroundFuel[]>> {
        const options = createRequestOption(req);
        return this.http.get<SellGroundFuel[]>(this.resourceDayDepotUrl + '/' + dayDepotId + '/sell-ground-fuels', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<SellGroundFuel[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SellGroundFuel = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SellGroundFuel[]>): HttpResponse<SellGroundFuel[]> {
        const jsonResponse: SellGroundFuel[] = res.body;
        const body: SellGroundFuel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SellGroundFuel.
     */
    private convertItemFromServer(sellGroundFuel: SellGroundFuel): SellGroundFuel {
        const copy: SellGroundFuel = Object.assign({}, sellGroundFuel);

        return copy;
    }

    /**
     * Convert a SellGroundFuel to a JSON which can be sent to the server.
     */
    private convert(sellGroundFuel: SellGroundFuel): SellGroundFuel {
        const copy: SellGroundFuel = Object.assign({}, sellGroundFuel);
        return copy;
    }

}
