import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {MetreSheet, AoRequestModel} from './metre-sheet.model';

export type EntityResponseType = HttpResponse<MetreSheet>;

@Injectable()
export class MetreSheetService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/metre-sheets';
    private resourceDefultUrl =  SERVER_API_URL + 'niopdcreport/api/';
    private resourceAoUrl = SERVER_API_URL + 'niopdcreport/api/ao/airport/metre-sheet';
    private resourceDepotUrl = SERVER_API_URL + 'niopdcreport/api/ao/depot/metre-sheet';

    constructor(private http: HttpClient) { }

    queryAo(req?: AoRequestModel): Observable<HttpResponse<MetreSheet[]>> {
        return this.http.post<MetreSheet[]>(this.resourceAoUrl, req, { observe: 'response' })
            .map((res: HttpResponse<MetreSheet[]>) => this.convertArrayResponse(res));
    }
    queryDepot(req?: AoRequestModel): Observable<HttpResponse<MetreSheet[]>> {
        return this.http.post<MetreSheet[]>(this.resourceDepotUrl, req, { observe: 'response' })
            .map((res: HttpResponse<MetreSheet[]>) => this.convertArrayResponse(res));
    }
    getDate(): Observable<HttpResponse<any>> {
        return this.http.get<MetreSheet[]>(this.resourceDefultUrl + 'date',  { observe: 'response' })
            .map((res: HttpResponse<any>) => res);
    }

    private convertArrayResponse(res: HttpResponse<MetreSheet[]>): HttpResponse<MetreSheet[]> {
        const jsonResponse: MetreSheet[] = res.body;
        const body: MetreSheet[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MetreSheet.
     */
    private convertItemFromServer(metreSheet: MetreSheet): MetreSheet {
        const copy: MetreSheet = Object.assign({}, metreSheet);
        return copy;
    }
}
