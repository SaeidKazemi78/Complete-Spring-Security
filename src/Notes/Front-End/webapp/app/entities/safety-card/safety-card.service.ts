import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SafetyCard } from './safety-card.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SafetyCard>;

@Injectable({ providedIn: 'root' })
export class SafetyCardService {

    private resourceUrl = 'niopdcbase/api/safety-cards';

    private resourceDriverUrl = 'niopdcbase/api/drivers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(safetyCard: SafetyCard): Observable<EntityResponseType> {
            const copy = this.convert(safetyCard);
        return this.http.post<SafetyCard>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(safetyCard: SafetyCard): Observable<EntityResponseType> {
        const copy = this.convert(safetyCard);
        return this.http.put<SafetyCard>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SafetyCard>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( driverId: any, req?: any): Observable<HttpResponse<SafetyCard[]>> {
        const options = createRequestOption(req);
        return this.http.get<SafetyCard[]>(this.resourceDriverUrl + '/' + driverId + '/safety-cards' ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<SafetyCard[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SafetyCard = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SafetyCard[]>): HttpResponse<SafetyCard[]> {
        const jsonResponse: SafetyCard[] = res.body;
        const body: SafetyCard[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SafetyCard.
     */
    private convertItemFromServer(safetyCard: SafetyCard): SafetyCard {
        const copy: SafetyCard = Object.assign(new SafetyCard(), safetyCard);
                copy.fromDate = this.dateUtils
            .convertDateTimeFromServer(copy.fromDate);
                copy.toDate = this.dateUtils
            .convertDateTimeFromServer(copy.toDate);
        return copy;
    }

    /**
     * Convert a SafetyCard to a JSON which can be sent to the server.
     */
    private convert(safetyCard: SafetyCard): SafetyCard {
        const copy: SafetyCard = Object.assign({}, safetyCard);

        return copy;
    }
}
