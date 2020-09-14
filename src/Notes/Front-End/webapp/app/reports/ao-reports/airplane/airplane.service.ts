import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {Airplane, AirplaneRequest} from './airplane.model';

export type EntityResponseType = HttpResponse<Airplane>;

@Injectable()
export class AirplaneService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/ao-reports/airplanes';

    constructor(private http: HttpClient) { }

    query(req?: AirplaneRequest): Observable<HttpResponse<Airplane[]>> {
        return this.http.post<Airplane[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<Airplane[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<Airplane[]>): HttpResponse<Airplane[]> {
        const jsonResponse: Airplane[] = res.body;
        const body: Airplane[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Airplane.
     */
    private convertItemFromServer(airplane: Airplane): Airplane {
        const copy: Airplane = Object.assign({}, airplane);
        return copy;
    }
}
