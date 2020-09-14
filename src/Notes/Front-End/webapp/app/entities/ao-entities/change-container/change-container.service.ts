import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {ChangeContainer} from './change-container.model';
import {OilTankContainer, OilTankContainerService} from '../oil-tank-container';
import {ProductService} from '../../product';
import {ContainerService} from '../../container';
import {DayDepotContainerService} from '../day-depot-container';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<ChangeContainer>;

@Injectable({ providedIn: 'root' })
export class ChangeContainerService {

    oilTankContainerTitleMap = new Map<number, OilTankContainer>();
    productTitleMap = new Map<number, string>();
    containerTitleMap = new Map<number, string>();

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/change-containers';
    private resourceDayDepotContainerUrl = SERVER_API_URL + 'niopdcao/api/day-depot-containers';
    private resourceDayDepotUrl = SERVER_API_URL + 'niopdcao/api/day-depots';

    constructor(private http: HttpClient,
                private oilTankContainerService: OilTankContainerService,
                private productService: ProductService,
                private containerService: ContainerService,
                private dayDepotContainerService: DayDepotContainerService) {
    }

    createByDayDepotContainer(changeContainer: ChangeContainer): Observable<EntityResponseType> {
        const copy = this.convert(changeContainer);
        return this.http.post<ChangeContainer>(this.resourceUrl + '/day-depot-container', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    createByDayDepot(changeContainer: ChangeContainer): Observable<EntityResponseType> {
        const copy = this.convert(changeContainer);
        return this.http.post<ChangeContainer>(this.resourceUrl + '/day-depot', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    updateByDayDepotContainer(changeContainer: ChangeContainer): Observable<EntityResponseType> {
        const copy = this.convert(changeContainer);
        return this.http.put<ChangeContainer>(this.resourceUrl + '/day-depot-container', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    updateByDayDepot(changeContainer: ChangeContainer): Observable<EntityResponseType> {
        const copy = this.convert(changeContainer);
        return this.http.put<ChangeContainer>(this.resourceUrl + '/day-depot', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ChangeContainer>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ChangeContainer[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChangeContainer[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<ChangeContainer[]>) => this.convertArrayResponse(res));
    }

    queryDayDepotContainerId(dayDepotContainerId?: number, req?: any): Observable<HttpResponse<ChangeContainer[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChangeContainer[]>(this.resourceDayDepotContainerUrl + '/' + dayDepotContainerId + '/change-containers', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<ChangeContainer[]>) => this.convertArrayResponse(res));
    }

    queryDayDepotId(dayDepotId?: number, req?: any): Observable<HttpResponse<ChangeContainer[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChangeContainer[]>(this.resourceDayDepotUrl + '/' + dayDepotId + '/change-containers', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<ChangeContainer[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ChangeContainer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ChangeContainer[]>): HttpResponse<ChangeContainer[]> {
        const jsonResponse: ChangeContainer[] = res.body;
        const body: ChangeContainer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ChangeContainer.
     */
    private convertItemFromServer(changeContainer: ChangeContainer): ChangeContainer {
        const copy: ChangeContainer = Object.assign({}, changeContainer);
        return copy;
    }

    /**
     * Convert a ChangeContainer to a JSON which can be sent to the server.
     */
    private convert(changeContainer: ChangeContainer): ChangeContainer {
        const copy: ChangeContainer = Object.assign({}, changeContainer);
        return copy;
    }
}
