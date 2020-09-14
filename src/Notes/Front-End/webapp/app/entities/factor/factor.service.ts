import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {Factor} from './factor.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<Factor>;

@Injectable({ providedIn: 'root' })
export class FactorService {

    private resourceUrl = SERVER_API_URL + 'niopdcaccounting/api/factors';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(factor: Factor): Observable<EntityResponseType> {
        const copy = this.convert(factor);
        return this.http.post<Factor>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(factor: Factor): Observable<EntityResponseType> {
        const copy = this.convert(factor);
        return this.http.put<Factor>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Factor>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Factor[]>> {
        const options = createRequestOption(req);
        return this.http.get<Factor[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<Factor[]>) => this.convertArrayResponse(res));
    }

    queryByPerson(personId, startDate, finishDate, factorType): Observable<HttpResponse<Factor[]>> {
        let options = new HttpParams();
        options = options.set('startDate', startDate.toISOString())
            .set('finishDate', finishDate.toISOString());
        return this.http.get<Factor[]>(`${this.resourceUrl}/${personId}/person/${factorType}`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Factor[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Factor = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Factor[]>): HttpResponse<Factor[]> {
        const jsonResponse: Factor[] = res.body;
        const body: Factor[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Factor.
     */
    private convertItemFromServer(factor: Factor): Factor {
        const copy: Factor = Object.assign({}, factor);
        copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(factor.registerDate);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(factor.startDate);
        copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(factor.finishDate);
        return copy;
    }

    /**
     * Convert a Factor to a JSON which can be sent to the server.
     */
    private convert(factor: Factor): Factor {
        const copy: Factor = Object.assign({}, factor);

        return copy;
    }
}
