import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {Unit, UnitRequest} from './unit.model';

export type EntityResponseType = HttpResponse<Unit>;

@Injectable()
export class UnitService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/ao-reports/units';

    constructor(private http: HttpClient) { }

    query(req?: UnitRequest): Observable<HttpResponse<Unit[]>> {
        return this.http.post<Unit[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<Unit[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<Unit[]>): HttpResponse<Unit[]> {
        const jsonResponse: Unit[] = res.body;
        const body: Unit[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Unit.
     */
    private convertItemFromServer(unit: Unit): Unit {
        const copy: Unit = Object.assign({}, unit);
        return copy;
    }
}
