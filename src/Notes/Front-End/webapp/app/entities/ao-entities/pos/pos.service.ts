import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {Pos} from './pos.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<Pos>;

@Injectable({ providedIn: 'root' })
export class PosService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/pos';
    private resourceAirportUrl = 'niopdcao/api/airports';

    constructor(private http: HttpClient) {
    }

    create(pos: Pos): Observable<EntityResponseType> {
        const copy = this.convert(pos);
        return this.http.post<Pos>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(pos: Pos): Observable<EntityResponseType> {
        const copy = this.convert(pos);
        return this.http.put<Pos>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Pos>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(airportId: any, req?: any): Observable<HttpResponse<Pos[]>> {
        const options = createRequestOption(req);
        return this.http.get<Pos[]>(this.resourceAirportUrl + '/' + airportId + '/pos', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Pos[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Pos = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Pos[]>): HttpResponse<Pos[]> {
        const jsonResponse: Pos[] = res.body;
        const body: Pos[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Pos.
     */
    private convertItemFromServer(pos: Pos): Pos {
        const copy: Pos = Object.assign({}, pos);
        return copy;
    }

    /**
     * Convert a Pos to a JSON which can be sent to the server.
     */
    private convert(pos: Pos): Pos {
        const copy: Pos = Object.assign({}, pos);
        return copy;
    }
}
