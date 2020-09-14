import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import {BoundarySellCarTagsRequest, BoundarySellCarTagsReport} from './boundary-sell-car-tags-report.model';

export type EntityResponseType = HttpResponse<BoundarySellCarTagsReport>;

@Injectable()
export class BoundarySellCarTagsReportService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/boundary-sell/car-tags';

    constructor(private http: HttpClient) { }

    query(req?: BoundarySellCarTagsRequest): Observable<HttpResponse<BoundarySellCarTagsReport[]>> {
        return this.http.post<BoundarySellCarTagsReport[]>(this.resourceUrl, req, { observe: 'response' });
    }

}
