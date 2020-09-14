import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import {BoundarySellCarTagReport, BoundarySellCarTagRequest} from './boundary-sell-car-tag-report.model';

export type EntityResponseType = HttpResponse<BoundarySellCarTagReport>;

@Injectable()
export class BoundarySellCarTagReportService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/boundary-sell/car-tag';

    constructor(private http: HttpClient) { }

    query(req?: BoundarySellCarTagRequest): Observable<HttpResponse<BoundarySellCarTagReport>> {
        return this.http.post<BoundarySellCarTagReport>(this.resourceUrl, req, { observe: 'response' });
    }

}
