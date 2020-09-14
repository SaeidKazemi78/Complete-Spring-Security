import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {ShiftWork} from './shift-work.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<ShiftWork>;

@Injectable({ providedIn: 'root' })
export class ShiftWorkService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/shift-works';

    private resourceLocationUrl = 'niopdcbase/api/locations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(shiftWork: ShiftWork): Observable<EntityResponseType> {
        const copy = this.convert(shiftWork);
        return this.http.post<ShiftWork>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(shiftWork: ShiftWork): Observable<EntityResponseType> {
        const copy = this.convert(shiftWork);
        return this.http.put<ShiftWork>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ShiftWork>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(locationId: any, req?: any): Observable<HttpResponse<ShiftWork[]>> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceLocationUrl + '/' + locationId + '/shift-works', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<ShiftWork[]>) => this.convertArrayResponse(res));
    }

    queryForRefuelCenter(refuelCenterId: number, shiftType: string, req?: any): Observable<HttpResponse<ShiftWork[]>> {
        const options = createRequestOption(req);
        return this.http.get(`${this.resourceUrl}/refuel-center/${refuelCenterId}/shiftType/${shiftType}`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<ShiftWork[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    openByLocation(locationId: number, tomorrow: boolean): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceLocationUrl}/${locationId}/open-shift-works`, {
            params: new HttpParams().set('tomorrow', tomorrow.toString()),
            observe: 'response'
        });
    }

    closeByLocation(locationId: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceLocationUrl}/${locationId}/close-shift-works`, {observe: 'response'});
    }

    open(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/${id}/open`, {observe: 'response'});
    }

    openByRefuelCenter(refuelCenterId: number, shiftType: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/refuel-center/${refuelCenterId}/shift-type/${shiftType}/open`, {observe: 'response'});
    }

    closeByRefuelCenter(refuelCenterId: number, shiftType: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/refuel-center/${refuelCenterId}/shift-type/${shiftType}/close`, {observe: 'response'});
    }

    close(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/${id}/close`, {observe: 'response'});
    }

    findOpenShiftWork(locationId: number): Observable<EntityResponseType> {
        return this.http.get<ShiftWork>(`${this.resourceLocationUrl}/${locationId}/open-shift-work-with-order-number`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findOpenShiftWorkForRefuelCenter(refuelCenterId: number, shiftType: string): Observable<HttpResponse<boolean>> {
        return this.http.get<boolean>(`${this.resourceUrl}/refuel-center/${refuelCenterId}/shift-type/${shiftType}/is-open`, {observe: 'response'})
            .map((res: HttpResponse<boolean>) => res);
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ShiftWork = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ShiftWork[]>): HttpResponse<ShiftWork[]> {
        const jsonResponse: ShiftWork[] = res.body;
        const body: ShiftWork[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ShiftWork.
     */
    private convertItemFromServer(shiftWork: ShiftWork): ShiftWork {
        const copy: ShiftWork = Object.assign({}, shiftWork);
        copy.fromDate = this.dateUtils
            .convertDateTimeFromServer(shiftWork.fromDate);
        copy.toDate = this.dateUtils
            .convertDateTimeFromServer(shiftWork.toDate);
        return copy;
    }

    /**
     * Convert a ShiftWork to a JSON which can be sent to the server.
     */
    private convert(shiftWork: ShiftWork): ShiftWork {
        const copy: ShiftWork = Object.assign({}, shiftWork);
        return copy;
    }
}
