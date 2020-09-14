import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

export type EntityResponseType = HttpResponse<any>;

@Injectable()
export class CustomerStationInfoReportService {

    private resourceReportUrl = SERVER_API_URL + 'niopdcreport/api/customer-station-infos-report';
    constructor(private http: HttpClient) { }

    report(id: number): Observable<EntityResponseType> {
        return this.http.get<any>(`${this.resourceReportUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => res);
    }

 /*   private convertArrayResponse(res: HttpResponse<Consumption[]>): HttpResponse<Consumption[]> {
        const jsonResponse: Consumption[] = res.body;
        const body: Consumption[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /!**
     * Convert a returned JSON object to Consumption.
     *!/
    private convertItemFromServer(consumption: Consumption): Consumption {
        const copy: Consumption = Object.assign({}, consumption);
        return copy;
    }*/
}
