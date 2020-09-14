import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {Airport} from './airport.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<Airport>;

@Injectable({providedIn: 'root'})
export class AirportService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/airports';

    constructor(private http: HttpClient) {
    }

    create(airport: Airport): Observable<EntityResponseType> {
        const copy = this.convert(airport);
        return this.http.post<Airport>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(airport: Airport): Observable<EntityResponseType> {
        const copy = this.convert(airport);
        return this.http.put<Airport>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Airport>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Airport[]>> {
        const options = createRequestOption(req);
        return this.http.get<Airport[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<Airport[]>) => this.convertArrayResponse(res));
    }

    findTargetAirports(id: number): Observable<HttpResponse<Airport[]>> {
        return this.http.get<Airport[]>(`${this.resourceUrl}/target/${id}`, {observe: 'response'})
            .map((res: HttpResponse<Airport[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Airport = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Airport[]>): HttpResponse<Airport[]> {
        const jsonResponse: Airport[] = res.body;
        const body: Airport[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Airport.
     */
    private convertItemFromServer(airport: Airport): Airport {
        const copy: Airport = Object.assign({}, airport);
        return copy;
    }

    /**
     * Convert a Airport to a JSON which can be sent to the server.
     */
    private convert(airport: Airport): Airport {
        const copy: Airport = Object.assign({}, airport);
        return copy;
    }
}
