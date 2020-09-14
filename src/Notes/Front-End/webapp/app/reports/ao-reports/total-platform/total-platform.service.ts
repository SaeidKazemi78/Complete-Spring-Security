import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import {TotalPlatform, TotalPlatformRequest} from './total-platform.model';

export type EntityResponseType = HttpResponse<TotalPlatform>;

@Injectable()
export class TotalPlatformService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/ao-reports/total-platform';

    constructor(private http: HttpClient) { }

    query(req?: TotalPlatformRequest): Observable<HttpResponse<TotalPlatform[]>> {
        return this.http.post<TotalPlatform[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<TotalPlatform[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<TotalPlatform[]>): HttpResponse<TotalPlatform[]> {
        const jsonResponse: TotalPlatform[] = res.body;
        const body: TotalPlatform[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TotalSell.
     */
    private convertItemFromServer(totalSell: TotalPlatform): TotalPlatform {
        const copy: TotalPlatform = Object.assign({}, totalSell);
        return copy;
    }
}
