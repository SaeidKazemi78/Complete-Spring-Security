import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {DayDepotContainer} from './day-depot-container.model';
import {OilTankContainerService} from '../oil-tank-container';
import {ContainerService} from '../../container';
import {ProductService} from '../../product';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<DayDepotContainer>;

@Injectable({ providedIn: 'root' })
export class DayDepotContainerService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/day-depot-containers';
    private resourceMainDayDepotUrl = SERVER_API_URL + 'niopdcao/api/main-day-depots';
    private resourceMainDayOperationUrl = SERVER_API_URL + 'niopdcao/api/main-day-operations';

    constructor(private http: HttpClient,
                private oilTankContainerService: OilTankContainerService,
                private containerService: ContainerService,
                private productService: ProductService) {
    }

    create(dayDepotContainer: DayDepotContainer): Observable<EntityResponseType> {
        const copy = this.convert(dayDepotContainer);
        return this.http.post<DayDepotContainer>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(dayDepotContainer: DayDepotContainer): Observable<EntityResponseType> {
        const copy = this.convert(dayDepotContainer);
        return this.http.put<DayDepotContainer>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DayDepotContainer>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getWaybillNumber(dayDepotContainerId: number): Observable<HttpResponse<string>> {
        return this.http.get<string>(`${this.resourceUrl}/way-bill/${dayDepotContainerId}`, {observe: 'response'})
            .map((res: HttpResponse<string>) => {
                return res;
            });
    }

    query(mainDayDepotId: any, req?: any): Observable<HttpResponse<DayDepotContainer[]>> {
        const options = createRequestOption(req);
        return this.http.get<DayDepotContainer[]>(this.resourceMainDayDepotUrl + '/' + mainDayDepotId + '/day-depot-containers', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<DayDepotContainer[]>) => this.convertArrayResponse(res));
    }

    queryByMainDayOperationId(mainDayOperationId: any, req?: any): Observable<HttpResponse<DayDepotContainer[]>> {
        const options = createRequestOption(req);
        return this.http.get<DayDepotContainer[]>(this.resourceMainDayOperationUrl + '/' + mainDayOperationId + '/day-depot-containers', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<DayDepotContainer[]>) => this.convertArrayResponse(res));
    }

    queryEmpty(dayDepotId): Observable<HttpResponse<DayDepotContainer[]>> {
        return this.http.get<DayDepotContainer[]>(this.resourceUrl + '/day-depot/' + dayDepotId + '/empty', {observe: 'response'})
            .map((res: HttpResponse<DayDepotContainer[]>) => this.convertArrayResponse(res));
    }

    queryForTarget(dayDepotContainerId): Observable<HttpResponse<DayDepotContainer[]>> {
        return this.http.get<DayDepotContainer[]>(this.resourceUrl + '/' + dayDepotContainerId + '/targets', {observe: 'response'})
            .map((res: HttpResponse<DayDepotContainer[]>) => this.convertArrayResponse(res));
    }

    queryNotEmpty(dayDepotId: any, dayDepotContainerId: any): Observable<HttpResponse<DayDepotContainer[]>> {
        return this.http.get<DayDepotContainer[]>(this.resourceUrl + '/day-depot/' + dayDepotId + '/not-empty/' + dayDepotContainerId, {observe: 'response'})
            .map((res: HttpResponse<DayDepotContainer[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    fullEndMeasurement(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/full-end-measurement/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DayDepotContainer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DayDepotContainer[]>): HttpResponse<DayDepotContainer[]> {
        const jsonResponse: DayDepotContainer[] = res.body;
        const body: DayDepotContainer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DayDepotContainer.
     */
    private convertItemFromServer(dayDepotContainer: DayDepotContainer): DayDepotContainer {
        const copy: DayDepotContainer = Object.assign({}, dayDepotContainer);
        return copy;
    }

    /**
     * Convert a DayDepotContainer to a JSON which can be sent to the server.
     */
    private convert(dayDepotContainer: DayDepotContainer): DayDepotContainer {
        const copy: DayDepotContainer = Object.assign({}, dayDepotContainer);
        return copy;
    }
}
