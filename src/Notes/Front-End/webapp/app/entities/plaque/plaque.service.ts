import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {Plaque} from './plaque.model';
import {createRequestOption} from '../../shared';
import {HttpCacheService} from '../../shared/http-cache/http-cache.service';

export type EntityResponseType = HttpResponse<Plaque>;

@Injectable({providedIn: 'root'})
export class PlaqueService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/plaques';

    constructor(private http: HttpClient, private httpCache: HttpCacheService) {
    }

    create(plaque: Plaque): Observable<EntityResponseType> {
        this.httpCache.reset(this.resourceUrl);
        const copy = this.convert(plaque);
        return this.http.post<Plaque>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(plaque: Plaque): Observable<EntityResponseType> {
        this.httpCache.reset(this.resourceUrl);
        const copy = this.convert(plaque);
        return this.http.put<Plaque>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Plaque>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Plaque[]>> {
        const options = createRequestOption(req);
        return this.http.get<Plaque[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<Plaque[]>) => this.convertArrayResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<Plaque[]>> {
        return this.httpCache.get<Plaque[]>(this.resourceUrl, {observe: 'response'})
            .map((res: HttpResponse<Plaque[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        this.httpCache.reset(this.resourceUrl);
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Plaque = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Plaque[]>): HttpResponse<Plaque[]> {
        const jsonResponse: Plaque[] = res.body;
        const body: Plaque[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Plaque.
     */
    private convertItemFromServer(plaque: Plaque): Plaque {
        const copy: Plaque = Object.assign({}, plaque);
        return copy;
    }

    /**
     * Convert a Plaque to a JSON which can be sent to the server.
     */
    private convert(plaque: Plaque): Plaque {
        const copy: Plaque = Object.assign({}, plaque);
        return copy;
    }
}
