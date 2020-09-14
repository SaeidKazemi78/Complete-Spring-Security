import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PassCard } from './pass-card.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PassCard>;

@Injectable({ providedIn: 'root' })
export class PassCardService {

    private resourceUrl = 'niopdcbase/api/pass-cards';

    private resourceDriverUrl = 'niopdcbase/api/drivers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(passCard: PassCard): Observable<EntityResponseType> {
            const copy = this.convert(passCard);
        return this.http.post<PassCard>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(passCard: PassCard): Observable<EntityResponseType> {
        const copy = this.convert(passCard);
        return this.http.put<PassCard>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PassCard>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( driverId: any, req?: any): Observable<HttpResponse<PassCard[]>> {
        const options = createRequestOption(req);
        return this.http.get<PassCard[]>(this.resourceDriverUrl + '/' + driverId + '/pass-cards' ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<PassCard[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PassCard = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PassCard[]>): HttpResponse<PassCard[]> {
        const jsonResponse: PassCard[] = res.body;
        const body: PassCard[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PassCard.
     */
    private convertItemFromServer(passCard: PassCard): PassCard {
        const copy: PassCard = Object.assign(new PassCard(), passCard);
                copy.fromDate = this.dateUtils
            .convertDateTimeFromServer(copy.fromDate);
                copy.toDate = this.dateUtils
            .convertDateTimeFromServer(copy.toDate);
        return copy;
    }

    /**
     * Convert a PassCard to a JSON which can be sent to the server.
     */
    private convert(passCard: PassCard): PassCard {
        const copy: PassCard = Object.assign({}, passCard);

        return copy;
    }
}
