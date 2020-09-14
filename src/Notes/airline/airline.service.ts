import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {Airline, AirlineRequest} from './airline.model';

export type EntityResponseType = HttpResponse<Airline>;

@Injectable()
export class AirlineService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/ao-reports/airlines';

    constructor(private http: HttpClient) { }

    query(req?: AirlineRequest): Observable<HttpResponse<Airline[]>> {
        return this.http.post<Airline[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<Airline[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<Airline[]>): HttpResponse<Airline[]> {
        const jsonResponse: Airline[] = res.body;
        const body: Airline[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Airline.
     */
    private convertItemFromServer(airline: Airline): Airline {
        const copy: Airline = Object.assign({}, airline);
        return copy;
    }
}
