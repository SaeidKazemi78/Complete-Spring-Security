import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {Airport, AirportRequest} from './airport.model';

export type EntityResponseType = HttpResponse<Airport>;

@Injectable({ providedIn: 'root' })
export class AirportService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/ao-reports/airports';

    constructor(private http: HttpClient) { }

    query(req?: AirportRequest): Observable<HttpResponse<Airport[]>> {
        return this.http.post<Airport[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<Airport[]>) => this.convertArrayResponse(res));
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
}
