import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';
import {
    BoundaryHistoryEditCarTankRequest,
    BoundaryHistoryEditCarTankResponse
} from "app/reports/boundary-sell-reports/boundary-history-edit-car-tank/boundary-history-edit-car-tank.model";

export type EntityResponseType = HttpResponse<BoundaryHistoryEditCarTankResponse>;

@Injectable()
export class BoundaryHistoryEditCarTankService {

    private resourceUrl = SERVER_API_URL + 'niopdcreport/api/boundary-sell/boundary-history-edit-car-tank';

    constructor(private http: HttpClient) {
    }

    query(req?: BoundaryHistoryEditCarTankRequest): Observable<HttpResponse<BoundaryHistoryEditCarTankResponse>> {
        return this.http.post<BoundaryHistoryEditCarTankResponse>(this.resourceUrl, req, {observe: 'response'})
            .map((res: HttpResponse<BoundaryHistoryEditCarTankResponse>) => res);
    }


}
