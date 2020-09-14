import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {Decomposition, DecompositionRequest} from './decomposition.model';

export type EntityResponseType = HttpResponse<Decomposition>;

@Injectable()
export class DecompositionService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/decomposition';

    constructor(private http: HttpClient) { }

    query(req?: DecompositionRequest): Observable<HttpResponse<Decomposition[]>> {
        return this.http.post<Decomposition[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<Decomposition[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<Decomposition[]>): HttpResponse<Decomposition[]> {
        const jsonResponse: Decomposition[] = res.body;
        const body: Decomposition[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Decomposition.
     */
    private convertItemFromServer(decomposition: Decomposition): Decomposition {
        const copy: Decomposition = Object.assign({}, decomposition);
        return copy;
    }
}
