import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CarTag } from './car-tag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CarTag>;

@Injectable()
export class CarTagService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/car-tags';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(carTag: CarTag): Observable<EntityResponseType> {
        const copy = this.convert(carTag);
        return this.http.post<CarTag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(carTag: CarTag): Observable<EntityResponseType> {
        const copy = this.convert(carTag);
        return this.http.put<CarTag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CarTag>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CarTag[]>> {
        const options = createRequestOption(req);
        return this.http.get<CarTag[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CarTag[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CarTag = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CarTag[]>): HttpResponse<CarTag[]> {
        const jsonResponse: CarTag[] = res.body;
        const body: CarTag[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CarTag.
     */
    private convertItemFromServer(carTag: CarTag): CarTag {
        const copy: CarTag = Object.assign({}, carTag);
        copy.activeDate = this.dateUtils
            .convertDateTimeFromServer(carTag.activeDate);
        return copy;
    }

    /**
     * Convert a CarTag to a JSON which can be sent to the server.
     */
    private convert(carTag: CarTag): CarTag {
        const copy: CarTag = Object.assign({}, carTag);

        copy.activeDate = this.dateUtils.toDate(carTag.activeDate);
        return copy;
    }
}
