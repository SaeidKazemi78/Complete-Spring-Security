import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {Location, LocationDate, OrderNumber} from './location.model';
import {createRequestOption} from '../../shared';
import {HttpCacheService} from '../../shared/http-cache/http-cache.service';

export type EntityResponseType = HttpResponse<Location>;
export type EntityResponseDateLocationType = HttpResponse<LocationDate>;

@Injectable({providedIn: 'root'})
export class LocationService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/locations';
    private resourceUrlForJustBoundaries = SERVER_API_URL + 'niopdcbase/api/locations/has-boundary';

    private resourceOrderNumberUrl = SERVER_API_URL + 'niopdcorder/api/order-numbers';
    private resourceCustomerUrl = SERVER_API_URL + 'niopdcbase/api/customers';
    private resourceUserManagementUrl = SERVER_API_URL + 'niopdcbase/api/users';

    constructor(private http: HttpClient, private httpCache: HttpCacheService) {
    }

    create(location: Location): Observable<EntityResponseType> {
        this.httpCache.reset(this.resourceUrl);
        const copy = this.convert(location);
        return this.http.post<Location>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(location: Location): Observable<EntityResponseType> {
        this.httpCache.reset(this.resourceUrl);
        const copy = this.convert(location);
        return this.http.put<Location>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Location>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(locationId?: number, name?: string, code?: string, req?: any): Observable<HttpResponse<Location[]>> {
        let options = createRequestOption(req);
        if (!locationId) {
            locationId = -1;
        }
        if (name) {
            options = options.set('name', name);
        }
        if (code) {
            options = options.set('code', code);
        }
        return this.http.get<Location[]>(this.resourceUrl + '/' + locationId + '/locations', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    querySelector(locationId?: number, req?: any): Observable<HttpResponse<Location[]>> {
        let options = new HttpParams();
        if (req && req.customerIds) {
            options = options.set('customerIds', req.customerIds);
        }

        if (req && req.dataAccess !== undefined) {
            options = options.set('dataAccess', req.dataAccess);
        }
        if (!locationId) {
            locationId = -1;
        }


        if(req.justBoundaries){
            console.log(" Just Boundaries selected !");
            return this.http.get<Location[]>(this.resourceUrlForJustBoundaries + '/selector/' + locationId, {
                observe: 'response',
                params: options,
            })
                .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
        }else {
            return this.http.get<Location[]>(this.resourceUrl + '/selector/' + locationId, {
                observe: 'response',
                params: options,
            })
                .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
        }




    }

    querySubLocation(level: number): Observable<HttpResponse<Location[]>> {
        return this.http.get<Location[]>(`${this.resourceUrl}/level/${level}`, {observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    queryForRegion(req?: any): Observable<HttpResponse<Location[]>> {
        const options = createRequestOption(req);
        return this.http.get<Location[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    queryBySubLocationsAndLevel(ids, level): Observable<HttpResponse<Location[]>> {
        const options = new HttpParams().set('ids', ids);
        return this.http.post<Location[]>(this.resourceUrl + '/sub-location-by-level/' + level,
            {params: options, observe: 'response'}, {params: options, observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    queryByRecursiveToUp(id?: any): Observable<HttpResponse<Location[]>> {
        return this.http.get<Location[]>(`${this.resourceUrl}/${id}/up-recursive`,
            {observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    queryByCustomer(customerId?: any): Observable<HttpResponse<Location[]>> {
        return this.http.get<Location[]>(`${this.resourceCustomerUrl}/${customerId}/locations`,
            {observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    queryByLevel(level: number): Observable<HttpResponse<Location[]>> {
        return this.http.get<Location[]>(`${this.resourceUrl}/${level}/level`,
            {observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    queryByLevelAndCountryId(level: number, countryId): Observable<HttpResponse<Location[]>> {
        return this.http.get<Location[]>(`${this.resourceUrl}/${level}/level/${countryId}/country`,
            {observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    queryByOrder(): Observable<HttpResponse<Location[]>> {
        const url = `${this.resourceUrl}/order`;
        return this.http.get<Location[]>(url,
            {observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    findAllLocationForUserTree(username: string): Observable<HttpResponse<Location[]>> {
        return this.http.get<Location[]>(`${this.resourceUserManagementUrl}/${username}/user-data-accesses/location`,
            {observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    findAllParent(ids): Observable<HttpResponse<Location[]>> {
        const options = new HttpParams().set('ids', ids);
        return this.http.post<Location[]>(this.resourceUrl + '/selector',
            {params: options, observe: 'response'}, {params: options, observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    findAllRecursiveParent(childs, req?: any): Observable<HttpResponse<any[][]>> {
        console.log( " findAllRecursiveParent called !! ");
        let options = new HttpParams();
        if (req && req.customerIds) {
            options = options.set('customerIds', req.customerIds);
        }
        const params = new HttpParams().set('ids', childs);
        return this.http.post<any>(`${this.resourceUrl}/recursive-to-up-ids`, params,
            {
                observe: 'response',
                params: options,
            });
    }

    createOrderNumber(orderNumber: OrderNumber): Observable<HttpResponse<any>> {
        const copy = this.convertOrderNumber(orderNumber);
        return this.http.post<any>(this.resourceOrderNumberUrl, copy, {observe: 'response'})
            .map((res: HttpResponse<any>) => res);
    }

    findOrderNumber(id: number): Observable<HttpResponse<OrderNumber>> {
        return this.http.get<OrderNumber>(`${this.resourceOrderNumberUrl}/${id}`, {observe: 'response'})
            .map((res: HttpResponse<OrderNumber>) => res);
    }

    delete(id: number): Observable<HttpResponse<any>> {
        this.httpCache.reset(this.resourceUrl);
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Location = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertLocationDateResponse(res: EntityResponseDateLocationType): EntityResponseDateLocationType {
        const body: LocationDate = this.convertItemLocationDateFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Location[]>): HttpResponse<Location[]> {
        const jsonResponse: Location[] = res.body;
        const body: Location[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Location.
     */
    private convertItemFromServer(location: Location): Location {
        const copy: Location = Object.assign({}, location);
        return copy;
    }

    private convertItemLocationDateFromServer(locationDate: LocationDate): LocationDate {
        const copy: LocationDate = Object.assign({}, locationDate);
        return copy;
    }

    /**
     * Convert a Location to a JSON which can be sent to the server.
     */
    private convert(location: Location): Location {
        const copy: Location = Object.assign({}, location);
        return copy;
    }

    /**
     * Convert a Location to a JSON which can be sent to the server.
     */
    private convertOrderNumber(orderNumber: OrderNumber): OrderNumber {
        const copy: OrderNumber = Object.assign({}, orderNumber);
        return copy;
    }
}
