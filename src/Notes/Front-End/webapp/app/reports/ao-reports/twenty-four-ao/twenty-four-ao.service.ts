import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {TwentyFourAo, TwentyFourAoRequest} from './twenty-four-ao.model';

export type EntityResponseType = HttpResponse<TwentyFourAo>;

@Injectable()
export class TwentyFourAoService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/ao-reports/twenty-four-aos';

    constructor(private http: HttpClient) { }

    query(req?: TwentyFourAoRequest): Observable<HttpResponse<TwentyFourAo[]>> {
        return this.http.post<TwentyFourAo[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<TwentyFourAo[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<TwentyFourAo[]>): HttpResponse<TwentyFourAo[]> {
        const jsonResponse: TwentyFourAo[] = res.body;
        const body: TwentyFourAo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TwentyFourAo.
     */
    private convertItemFromServer(twentyFourAo: TwentyFourAo): TwentyFourAo {
        const copy: TwentyFourAo = Object.assign({}, twentyFourAo);
        return copy;
    }
}
