import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {LastOilTankStatus, LastOilTankStatusRequest} from './last-oil-tank-status.model';

export type EntityResponseType = HttpResponse<LastOilTankStatus>;

@Injectable({providedIn: 'root'})
export class LastOilTankStatusService {

    private resourceUrl = SERVER_API_URL + 'niopdcreport/api/ao/airport/last-oil-tank-status';

    constructor(private http: HttpClient) {
    }

    query(req?: LastOilTankStatusRequest): Observable<HttpResponse<LastOilTankStatus[]>> {
        return this.http.post<LastOilTankStatus[]>(this.resourceUrl, req, {observe: 'response'})
            .map((res: HttpResponse<LastOilTankStatus[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<LastOilTankStatus[]>): HttpResponse<LastOilTankStatus[]> {
        const jsonResponse: LastOilTankStatus[] = res.body;
        const body: LastOilTankStatus[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Airport.
     */
    private convertItemFromServer(airport: LastOilTankStatus): LastOilTankStatus {
        const copy: LastOilTankStatus = Object.assign({}, airport);
        return copy;
    }
}
