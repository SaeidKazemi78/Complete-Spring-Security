import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Manufacture } from './manufacture.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Manufacture>;

@Injectable({ providedIn: 'root' })
export class ManufactureService {

    private resourceUrl =  SERVER_API_URL + 'niopdcao/api/manufactures';

    constructor(private http: HttpClient) { }

    create(manufacture: Manufacture): Observable<EntityResponseType> {
        const copy = this.convert(manufacture);
        return this.http.post<Manufacture>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(manufacture: Manufacture): Observable<EntityResponseType> {
        const copy = this.convert(manufacture);
        return this.http.put<Manufacture>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Manufacture>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Manufacture[]>> {
        const options = createRequestOption(req);
        return this.http.get<Manufacture[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Manufacture[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Manufacture = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Manufacture[]>): HttpResponse<Manufacture[]> {
        const jsonResponse: Manufacture[] = res.body;
        const body: Manufacture[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Manufacture.
     */
    private convertItemFromServer(manufacture: Manufacture): Manufacture {
        const copy: Manufacture = Object.assign({}, manufacture);
        return copy;
    }

    /**
     * Convert a Manufacture to a JSON which can be sent to the server.
     */
    private convert(manufacture: Manufacture): Manufacture {
        const copy: Manufacture = Object.assign({}, manufacture);
        return copy;
    }
}
