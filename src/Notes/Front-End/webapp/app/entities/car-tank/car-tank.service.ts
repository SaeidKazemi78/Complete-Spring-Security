import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CarTank } from './car-tank.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CarTank>;

@Injectable({ providedIn: 'root' })
export class CarTankService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/car-tanks';
    private resourceCustomerUrl = SERVER_API_URL + 'niopdcbase/api/customers';
    constructor(private http: HttpClient) { }

    create(carTank: CarTank): Observable<EntityResponseType> {
        const copy = this.convert(carTank);
        return this.http.post<CarTank>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(carTank: CarTank): Observable<EntityResponseType> {
        const copy = this.convert(carTank);
        return this.http.put<CarTank>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CarTank>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( customerId: any, req?: any): Observable<HttpResponse<CarTank[]>> {
        const options = createRequestOption(req);
        return this.http.get<CarTank[]>(this.resourceCustomerUrl + '/' + customerId + '/car-tanks' , { params: options, observe: 'response' })
            .map((res: HttpResponse<CarTank[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CarTank = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CarTank[]>): HttpResponse<CarTank[]> {
        const jsonResponse: CarTank[] = res.body;
        const body: CarTank[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CarTank.
     */
    private convertItemFromServer(carTank: CarTank): CarTank {
        const copy: CarTank = Object.assign({}, carTank);
        return copy;
    }

    /**
     * Convert a CarTank to a JSON which can be sent to the server.
     */
    private convert(carTank: CarTank): CarTank {
        const copy: CarTank = Object.assign({}, carTank);
        return copy;
    }
}
