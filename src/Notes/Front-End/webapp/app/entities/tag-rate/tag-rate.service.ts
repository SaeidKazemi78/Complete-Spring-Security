import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TagRate } from './tag-rate.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TagRate>;

@Injectable({ providedIn: 'root' })
export class TagRateService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/tag-rates';
    private resourceLocationUrl = SERVER_API_URL + 'niopdcbase/api/locations';
    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(tagRate: TagRate): Observable<EntityResponseType> {
        const copy = this.convert(tagRate);
        return this.http.post<TagRate>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tagRate: TagRate): Observable<EntityResponseType> {
        const copy = this.convert(tagRate);
        return this.http.put<TagRate>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TagRate>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( locationId: any, req?: any): Observable<HttpResponse<TagRate[]>> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceLocationUrl + '/' + locationId + '/tag-rates' , { params: options, observe: 'response' })
            .map((res: HttpResponse<TagRate[]>) => this.convertArrayResponse(res));
    }
    queryByLocationAccess( req?: any): Observable<HttpResponse<TagRate[]>> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl + '/location-access' , { params: options, observe: 'response' })
            .map((res: HttpResponse<TagRate[]>) => this.convertArrayResponse(res));
    }
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TagRate = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TagRate[]>): HttpResponse<TagRate[]> {
        const jsonResponse: TagRate[] = res.body;
        const body: TagRate[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TagRate.
     */
    private convertItemFromServer(tagRate: TagRate): TagRate {
        const copy: TagRate = Object.assign({}, tagRate);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(tagRate.startDate);
        copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(tagRate.finishDate);
        return copy;
    }

    /**
     * Convert a TagRate to a JSON which can be sent to the server.
     */
    private convert(tagRate: TagRate): TagRate {
        const copy: TagRate = Object.assign({}, tagRate);

        return copy;
    }
}
