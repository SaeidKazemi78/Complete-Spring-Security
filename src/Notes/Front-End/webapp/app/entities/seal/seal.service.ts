import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


import {Seal} from './seal.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<Seal>;

@Injectable({providedIn: "root"})
export class SealService {

    private resourceUrl = 'niopdcao/api/seals';

    private resourceRefuelCenterUrl = 'niopdcao/api/refuel-centers';

    constructor(private http: HttpClient) {
    }


    create(seal: Seal): Observable<EntityResponseType> {
        const copy = this.convert(seal);
        return this.http.post<Seal>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(seal: Seal): Observable<EntityResponseType> {
        const copy = this.convert(seal);
        return this.http.put<Seal>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Seal>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }


    findByDayDepotId(id: number): Observable<EntityResponseType> {
        return this.http.get<Seal>(`${this.resourceUrl}/day-depot/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByRefuelCenterId(id: number): Observable<EntityResponseType> {
        return this.http.get<Seal>(`${this.resourceUrl}/refuel-center/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(refuelCenterId: any, req?: any): Observable<HttpResponse<Seal[]>> {
        const options = createRequestOption(req);
        return this.http.get<Seal[]>(this.resourceRefuelCenterUrl + '/' + refuelCenterId + '/seals', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Seal[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Seal = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Seal[]>): HttpResponse<Seal[]> {
        const jsonResponse: Seal[] = res.body;
        const body: Seal[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Seal.
     */
    private convertItemFromServer(seal: Seal): Seal {
        const copy: Seal = Object.assign(new Seal(), seal);
        return copy;
    }

    /**
     * Convert a Seal to a JSON which can be sent to the server.
     */
    private convert(seal: Seal): Seal {
        const copy: Seal = Object.assign({}, seal);

        return copy;
    }
}
