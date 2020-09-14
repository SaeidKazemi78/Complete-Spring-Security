import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {OilTank, OilTankType} from './oil-tank.model';
import {createRequestOption} from '../../../shared';
import {ProductService} from '../../product';

export type EntityResponseType = HttpResponse<OilTank>;

@Injectable({ providedIn: 'root' })
export class OilTankService {

    private resourceUrl = SERVER_API_URL + '/niopdcao/api/oil-tanks';
    private resourceDayDepotUrl = SERVER_API_URL + 'niopdcao/api/day-depots';
    private resourceRefuelCenterUrl = SERVER_API_URL + 'niopdcao/api/refuel-centers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils, private productService: ProductService) {
    }

    create(oilTank: OilTank): Observable<EntityResponseType> {
        const copy = this.convert(oilTank);
        return this.http.post<OilTank>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(oilTank: OilTank): Observable<EntityResponseType> {
        const copy = this.convert(oilTank);
        return this.http.put<OilTank>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OilTank>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OilTank[]>> {
        const options = createRequestOption(req);
        return this.http.get<OilTank[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<OilTank[]>) => this.convertArrayResponse(res));
    }

    queryByRefuelCenter(refuelCenterId?: number, req?: any): Observable<HttpResponse<OilTank[]>> {
        const options = createRequestOption(req);
        return this.http.get<OilTank[]>(`${this.resourceRefuelCenterUrl}/${refuelCenterId}/oil-tanks/`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<OilTank[]>) => this.convertArrayResponse(res));
    }

    queryByRefuelCenterAndOilTank(refuelCenterId?: number, oilTankType?: any, req?: any): Observable<HttpResponse<OilTank[]>> {
        const options = createRequestOption(req);
        return this.http.get<OilTank[]>(`${this.resourceRefuelCenterUrl}/${refuelCenterId}/oil-tanks/${oilTankType}`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<OilTank[]>) => this.convertArrayResponse(res));
    }

    queryByRefuelCenterByUnitPlatform(refuelCenterId?: number, req?: any): Observable<HttpResponse<OilTank[]>> {
        const options = createRequestOption(req);
        return this.http.get<OilTank[]>(`${this.resourceUrl}/${refuelCenterId}/oil-tanks/unit-platform`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<OilTank[]>) => this.convertArrayResponse(res));
    }

    queryByRefuelCenterByUnit(refuelCenterId?: number, req?: any): Observable<HttpResponse<OilTank[]>> {
        const options = createRequestOption(req);
        return this.http.get<OilTank[]>(`${this.resourceUrl}/${refuelCenterId}/oil-tanks/unit`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<OilTank[]>) => this.convertArrayResponse(res));
    }

    queryByRefuelCenterByPlatformt(refuelCenterId?: number, req?: any): Observable<HttpResponse<OilTank[]>> {
        const options = createRequestOption(req);
        return this.http.get<OilTank[]>(`${this.resourceUrl}/${refuelCenterId}/oil-tanks/platform`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<OilTank[]>) => this.convertArrayResponse(res));
    }

    findByOilTankType(oilTankType: OilTankType): Observable<HttpResponse<OilTank[]>> {
        const params = new HttpParams()
            .set('oilTankType', oilTankType.toString());
        return this.http.get<OilTank[]>(this.resourceUrl + '/oilTankType', {
            params,
            observe: 'response'
        })
            .map((res: HttpResponse<OilTank[]>) => {
                return this.convertArrayResponse(res);
            });
    }

    findDayDepotAllUnit(dayDepotId?: number, req?: any): Observable<HttpResponse<OilTank[]>> {
        const options = createRequestOption(req);
        return this.http.get<OilTank[]>(`${this.resourceDayDepotUrl}/oil-tanks/${dayDepotId}/units`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<OilTank[]>) => this.convertArrayResponse(res));
    }
    findByRefuelCenter(refuelCenterId?: number, req?: any): Observable<HttpResponse<OilTank[]>> {
        const options = createRequestOption(req);
        return this.http.get<OilTank[]>(`${this.resourceUrl}/${refuelCenterId}/refuel-center`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<OilTank[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OilTank = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OilTank[]>): HttpResponse<OilTank[]> {
        const jsonResponse: OilTank[] = res.body;
        const body: OilTank[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OilTank.
     */
    private convertItemFromServer(oilTank: OilTank): OilTank {
        const copy: OilTank = Object.assign({}, oilTank);

        /*this.productService.find(copy.productId)
            .subscribe((product) => {
                copy.productTitle = product.body.title;
            });*/

        return copy;
    }

    /**
     * Convert a OilTank to a JSON which can be sent to the server.
     */
    private convert(oilTank: OilTank): OilTank {
        const copy: OilTank = Object.assign({}, oilTank);

        return copy;
    }

}
