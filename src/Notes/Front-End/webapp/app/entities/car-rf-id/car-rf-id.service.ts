import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {CarRfId} from './car-rf-id.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<CarRfId>;
export type NumberResponseType = HttpResponse<number>;

@Injectable({providedIn: 'root'})
export class CarRfIdService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/car-rf-ids';
    private resourceCustomerUrl = 'niopdcbase/api/customers';

    constructor(private http: HttpClient) {
    }

    create(carRfId: CarRfId): Observable<EntityResponseType> {
        const copy = this.convert(carRfId);
        return this.http.post<CarRfId>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(carRfId: CarRfId): Observable<EntityResponseType> {
        const copy = this.convert(carRfId);
        return this.http.put<CarRfId>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    allocate(carRfId: CarRfId): Observable<EntityResponseType> {
        const copy = this.convert(carRfId);
        return this.http.put<CarRfId>(this.resourceUrl + '/allocate', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    active(id): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.resourceUrl + '/active/' + id, null, {observe: 'response'});
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CarRfId>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CarRfId[]>> {
        const options = createRequestOption(req);
        return this.http.get<CarRfId[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<CarRfId[]>) => this.convertArrayResponse(res));
    }

    getAllNoneActive(): Observable<HttpResponse<CarRfId[]>> {
        return this.http.get<CarRfId[]>(this.resourceUrl + '/not-active', {observe: 'response'})
            .map((res: HttpResponse<CarRfId[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    hold(id: number): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${this.resourceUrl}/${id}/unAllocate`, null, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CarRfId = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CarRfId[]>): HttpResponse<CarRfId[]> {
        const jsonResponse: CarRfId[] = res.body;
        const body: CarRfId[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CarRfId.
     */
    private convertItemFromServer(carRfId: CarRfId): CarRfId {
        const copy: CarRfId = Object.assign({}, carRfId);
        return copy;
    }

    /**
     * Convert a CarRfId to a JSON which can be sent to the server.
     */
    private convert(carRfId: CarRfId): CarRfId {
        const copy: CarRfId = Object.assign({}, carRfId);
        return copy;
    }
}
