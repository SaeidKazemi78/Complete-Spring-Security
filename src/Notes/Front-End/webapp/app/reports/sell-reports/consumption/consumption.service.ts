import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {Consumption, ConsumptionRequest} from './consumption.model';

export type EntityResponseType = HttpResponse<Consumption>;

@Injectable()
export class ConsumptionService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/consumption';

    constructor(private http: HttpClient) { }

    query(req?: ConsumptionRequest): Observable<HttpResponse<Consumption[]>> {
        return this.http.post<Consumption[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<Consumption[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<Consumption[]>): HttpResponse<Consumption[]> {
        const jsonResponse: Consumption[] = res.body;
        const body: Consumption[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Consumption.
     */
    private convertItemFromServer(consumption: Consumption): Consumption {
        const copy: Consumption = Object.assign({}, consumption);
        return copy;
    }
}
