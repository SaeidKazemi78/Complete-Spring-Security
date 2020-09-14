import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { CarBak } from './car-bak.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CarBak>;

@Injectable({ providedIn: 'root' })
export class CarBakService {

    private resourceUrl = 'niopdcbase/api/car-baks';

    private resourceCarUrl = 'niopdcbase/api/cars';

    constructor(private http: HttpClient) { }

    create(carBak: CarBak): Observable<EntityResponseType> {
            const copy = this.convert(carBak);
        return this.http.post<CarBak>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(carBak: CarBak): Observable<EntityResponseType> {
        const copy = this.convert(carBak);
        return this.http.put<CarBak>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CarBak>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( carId: any, req?: any): Observable<HttpResponse<CarBak[]>> {
        const options = createRequestOption(req);
        return this.http.get<CarBak[]>(this.resourceCarUrl + '/' + carId + '/car-baks' ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<CarBak[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CarBak = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CarBak[]>): HttpResponse<CarBak[]> {
        const jsonResponse: CarBak[] = res.body;
        const body: CarBak[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CarBak.
     */
    private convertItemFromServer(carBak: CarBak): CarBak {
        const copy: CarBak = Object.assign(new CarBak(), carBak);
        return copy;
    }

    /**
     * Convert a CarBak to a JSON which can be sent to the server.
     */
    private convert(carBak: CarBak): CarBak {
        const copy: CarBak = Object.assign({}, carBak);

        return copy;
    }
}
