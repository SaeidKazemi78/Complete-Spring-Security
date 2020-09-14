import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {AircraftRefuelingRecord, AircraftRefuelingRecordRequest} from './aircraft-refueling-record.model';

export type EntityResponseType = HttpResponse<AircraftRefuelingRecord>;

@Injectable()
export class AircraftRefuelingRecordService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/ao-reports/aircraft-refueling-records';

    constructor(private http: HttpClient) { }

    query(req?: AircraftRefuelingRecordRequest): Observable<HttpResponse<AircraftRefuelingRecord[]>> {
        return this.http.post<AircraftRefuelingRecord[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<AircraftRefuelingRecord[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<AircraftRefuelingRecord[]>): HttpResponse<AircraftRefuelingRecord[]> {
        const jsonResponse: AircraftRefuelingRecord[] = res.body;
        const body: AircraftRefuelingRecord[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AircraftRefuelingRecord.
     */
    private convertItemFromServer(aircraftRefuelingRecord: AircraftRefuelingRecord): AircraftRefuelingRecord {
        const copy: AircraftRefuelingRecord = Object.assign({}, aircraftRefuelingRecord);
        return copy;
    }
}
