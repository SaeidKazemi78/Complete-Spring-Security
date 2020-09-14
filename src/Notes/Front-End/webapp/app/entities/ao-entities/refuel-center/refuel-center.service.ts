import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {RefuelCenter} from './refuel-center.model';
import {createRequestOption} from '../../../shared';
import {ShiftWork} from '../../shift-work';

export type EntityResponseType = HttpResponse<RefuelCenter>;

@Injectable({ providedIn: 'root' })
export class RefuelCenterService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/refuel-centers';
    private resourceUserRefuelCenterUrl = SERVER_API_URL + 'niopdcao/api/user-refuel-centers';

    constructor(private http: HttpClient) {
    }

    create(refuelCenter: RefuelCenter): Observable<EntityResponseType> {
        const copy = this.convert(refuelCenter);
        return this.http.post<RefuelCenter>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(refuelCenter: RefuelCenter): Observable<EntityResponseType> {
        const copy = this.convert(refuelCenter);
        return this.http.put<RefuelCenter>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RefuelCenter>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getMaxDifferenceAmountByDayDepotId(dayDepotId): Observable<HttpResponse<number>> {
        return this.http.get<number>(`${this.resourceUrl}/day-depot/${dayDepotId}/max-difference-amount`, {observe: 'response'})
            .map((res: HttpResponse<number>) => res);
    }

    query(req?: any): Observable<HttpResponse<RefuelCenter[]>> {
        const options = createRequestOption(req);
        return this.http.get<RefuelCenter[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<RefuelCenter[]>) => this.convertArrayResponse(res));
    }

    getOpenDate(id: number, data: any): Observable<HttpResponse<ShiftWork>> {
        return this.http.get<ShiftWork>(`${this.resourceUrl}/${id}/${data}/open-day-with-order-number`, {observe: 'response'})
            .map((res: any) => res);
    }

    queryByNational(isNational: boolean): Observable<HttpResponse<RefuelCenter[]>> {
        return this.http.get<RefuelCenter[]>(`${this.resourceUrl}/national/${isNational}`, {observe: 'response'})
            .map((res: HttpResponse<RefuelCenter[]>) => this.convertArrayResponse(res));
    }

    queryByLocation(location: number): Observable<HttpResponse<RefuelCenter[]>> {
        return this.http.get<RefuelCenter[]>(`${this.resourceUrl}/location/${location}`, {observe: 'response'})
            .map((res: HttpResponse<RefuelCenter[]>) => this.convertArrayResponse(res));
    }

    queryTargetRefuelCenters(refuelCenterId: number): Observable<HttpResponse<RefuelCenter[]>> {
        return this.http.get<RefuelCenter[]>(`${this.resourceUrl}/targets/${refuelCenterId}`, {observe: 'response'})
            .map((res: HttpResponse<RefuelCenter[]>) => this.convertArrayResponse(res));
    }

    queryByReadAccess(req?: any): Observable<HttpResponse<RefuelCenter[]>> {
        const options = createRequestOption(req);
        return this.http.get<RefuelCenter[]>(`${this.resourceUserRefuelCenterUrl}/read/refuel-centers`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<RefuelCenter[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RefuelCenter = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RefuelCenter[]>): HttpResponse<RefuelCenter[]> {
        const jsonResponse: RefuelCenter[] = res.body;
        const body: RefuelCenter[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RefuelCenter.
     */
    private convertItemFromServer(refuelCenter: RefuelCenter): RefuelCenter {
        const copy: RefuelCenter = Object.assign({}, refuelCenter);
        /*   if (copy.locationId) {
               this.locationService.find(copy.locationId).subscribe((location) => {
                   copy.locationTitle = location.body.name;
                   this.regionService.find(copy.regionId).subscribe((region) => {
                       copy.regionTitle = region.body.name;
                   });
               });
           }*/
        return copy;
    }

    /**
     * Convert a RefuelCenter to a JSON which can be sent to the server.
     */
    private convert(refuelCenter: RefuelCenter): RefuelCenter {
        const copy: RefuelCenter = Object.assign({}, refuelCenter);
        return copy;
    }
}
