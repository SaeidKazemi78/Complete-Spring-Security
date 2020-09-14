import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BoundaryTag } from './boundary-tag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BoundaryTag>;

@Injectable({ providedIn: 'root' })
export class BoundaryTagService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/boundary-tags';
    private resourceLocationUrl = SERVER_API_URL + 'niopdcbase/api/locations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(boundaryTag: BoundaryTag): Observable<EntityResponseType> {
        const copy = this.convert(boundaryTag);
        return this.http.post<BoundaryTag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(boundaryTag: BoundaryTag): Observable<EntityResponseType> {
        const copy = this.convert(boundaryTag);
        return this.http.put<BoundaryTag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BoundaryTag>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( locationId: any, req?: any): Observable<HttpResponse<BoundaryTag[]>> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceLocationUrl + '/' + locationId + '/boundary-tags' , { params: options, observe: 'response' })
            .map((res: HttpResponse<BoundaryTag[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BoundaryTag = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BoundaryTag[]>): HttpResponse<BoundaryTag[]> {
        const jsonResponse: BoundaryTag[] = res.body;
        const body: BoundaryTag[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BoundaryTag.
     */
    private convertItemFromServer(boundaryTag: BoundaryTag): BoundaryTag {
        const copy: BoundaryTag = Object.assign({}, boundaryTag);
        copy.buyDate = this.dateUtils
            .convertDateTimeFromServer(boundaryTag.buyDate);
        return copy;
    }

    /**
     * Convert a BoundaryTag to a JSON which can be sent to the server.
     */
    private convert(boundaryTag: BoundaryTag): BoundaryTag {
        const copy: BoundaryTag = Object.assign({}, boundaryTag);

        return copy;
    }
}
