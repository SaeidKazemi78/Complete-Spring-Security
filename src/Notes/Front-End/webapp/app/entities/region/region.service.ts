import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';
import {Region} from './region.model';
import {createRequestOption} from '../../shared';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Location} from '../location/location.model';
import {Subject} from 'rxjs';

export type EntityResponseType = HttpResponse<Region>;

@Injectable({providedIn: 'root'})
export class RegionService {

    regionText = new Subject<any>();
    private resourceUrl = SERVER_API_URL + '/niopdcbase/api/regions';
    private resourceCountryUrl = SERVER_API_URL + '/niopdcbase/api/countries';
    private resourceLocationUrl = SERVER_API_URL + '/niopdcbase/api/locations';

    constructor(private http: HttpClient) {
    }

    create(region: Region): Observable<EntityResponseType> {
        const copy = this.convert(region);
        return this.http.post<Region>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(region: Region): Observable<EntityResponseType> {
        const copy = this.convert(region);
        return this.http.put<Region>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Region>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(regionId: any, countryId: any, req?: any): Observable<HttpResponse<Region[]>> {
        const options = createRequestOption(req);
        if (regionId || (!regionId && !countryId)) {
            if (!regionId) {
                regionId = -1;
            }
            return this.http.get<Region[]>(this.resourceUrl + '/' + regionId + '/regions', {
                params: options,
                observe: 'response'
            }).map((res: HttpResponse<Region[]>) => this.convertArrayResponse(res));
        } else {
            return this.http.get<Region[]>(this.resourceCountryUrl + '/' + countryId
                + '/regions', {
                params: options,
                observe: 'response'
            }).map((res: HttpResponse<Region[]>) => this.convertArrayResponse(res));
        }
    }

    querySelector(regionId?: number, req?: any): Observable<HttpResponse<Location[]>> {
        let options = new HttpParams();
        if (req && req.locationIds) {
            options = options.set('locationIds', req.locationIds);
        }
        if (req && req.countryId) {
            options = options.set('countryId', req.countryId);
        }
        if (req && req.dataAccess) {
            options = options.set('dataAccess', req.dataAccess);
        }
        if (!regionId) {
            regionId = -1;
        }
        return this.http.get<Location[]>(this.resourceUrl + '/selector/' + regionId, {
            observe: 'response',
            params: options,
        })
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    queryByLocation(locationId: any): Observable<HttpResponse<Region[]>> {
        if (!locationId) {
            locationId = -1;
        }
        return this.http.get<Region[]>(this.resourceLocationUrl + '/' + locationId + '/regions', {
            observe: 'response'
        }).map((res: HttpResponse<Region[]>) => this.convertArrayResponse(res));
    }

    queryByLocations(locationIds): Observable<HttpResponse<Region[]>> {
        // return this.http.get(`${this.resourceUrl}/${parentId}`);
        const params = new HttpParams().set('ids', locationIds.toString());

        return this.http.post<Region[]>(`${this.resourceLocationUrl + '/regions'}`, params,
            {
                observe: 'response'
            }).map((res: HttpResponse<Region[]>) => this.convertArrayResponse(res));
    }

    queryCity(country: number, level: number): Observable<HttpResponse<Region[]>> {
        return this.http.get<Region[]>(this.resourceCountryUrl + '/' + country + '/regions/level/' + level, {observe: 'response'})
            .map((res: HttpResponse<Region[]>) => this.convertArrayResponse(res));
    }

    findAllRecursiveParent(childs: number[]): Observable<HttpResponse<number[][]>> {
        const params = new HttpParams().set('ids', childs.toString());
        return this.http.post<number[][]>(`${this.resourceUrl}/recursive-to-up`, params,
            {
                observe: 'response'
            });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Region = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Region[]>): HttpResponse<Region[]> {
        const jsonResponse: Region[] = res.body;
        const body: Region[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Region.
     */
    private convertItemFromServer(region: Region): Region {
        const copy: Region = Object.assign({}, region);
        return copy;
    }

    /**
     * Convert a Region to a JSON which can be sent to the server.
     */
    private convert(region: Region): Region {
        const copy: Region = Object.assign({}, region);
        return copy;
    }
}
