import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {OilTankContainer} from './oil-tank-container.model';
import {ProductService} from '../../product';
import {createRequestOption} from '../../../shared';
import {ContainerService} from '../../container';

export type EntityResponseType = HttpResponse<OilTankContainer>;

@Injectable({ providedIn: 'root' })
export class OilTankContainerService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/oil-tank-containers';
    private resourceDayDepotContainerUrl = SERVER_API_URL + 'niopdcao/api/day-depot-containers';
    private resourceDayDepotUrl = SERVER_API_URL + 'niopdcao/api/day-depots';
    private productTitleMap = new Map<number, string>();
    private containerTitleMap = new Map<number, string>();

    constructor(private http: HttpClient, private productService: ProductService, private containerService: ContainerService) {
    }

    create(oilTankContainer: OilTankContainer): Observable<EntityResponseType> {
        const copy = this.convert(oilTankContainer);
        return this.http.post<OilTankContainer>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(oilTankContainer: OilTankContainer): Observable<EntityResponseType> {
        const copy = this.convert(oilTankContainer);
        return this.http.put<OilTankContainer>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OilTankContainer>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    /*querySourceOilTankContainersChangeContainer(dayDepotContainerId?: number, dayDepotId?: number): Observable<ResponseWrapper> {
        let requestUrl;
        if (dayDepotContainerId) {
            requestUrl = this.resourceDayDepotContainerUrl + '/' + dayDepotContainerId + '/oil-tank-container/product';
            return this.http.get(requestUrl)
                .map((res: Response) => this.convertResponse(res));
        } else if (dayDepotId) {
            requestUrl = this.resourceDayDepotUrl + '/' + dayDepotId + '/oil-tank-container/product-unit';
            return this.http.get(requestUrl)
                .map((res: Response) => this.convertResponse(res));
        }

    }*/

    /* queryTargetOilTankContainersChangeContainer(dayDepotContainerId: number, dayDepotId: number, sourceId: number): Observable<ResponseWrapper> {
         let requestUrl;
         if (dayDepotContainerId) {
             requestUrl = this.resourceDayDepotContainerUrl + '/' + dayDepotContainerId + '/oil-tank-container/product-unit/source/' + sourceId;
             return this.http.get(requestUrl)
                 .map((res: Response) => this.convertResponse(res));
         } else if (dayDepotId) {
             requestUrl = this.resourceDayDepotUrl + '/' + dayDepotId + '/oil-tank-container/product/source/' + sourceId;
             return this.http.get(requestUrl)
                 .map((res: Response) => this.convertResponse(res));
         }
     }*/

    query(req?: any): Observable<HttpResponse<OilTankContainer[]>> {
        const options = createRequestOption(req);
        return this.http.get<OilTankContainer[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<OilTankContainer[]>) => this.convertArrayResponse(res));
    }

    queryGetFullContainer(req?: any): Observable<HttpResponse<OilTankContainer[]>> {
        const options = createRequestOption(req);
        return this.http.get<OilTankContainer[]>(this.resourceUrl + '/product', {params: options, observe: 'response'})
            .map((res: HttpResponse<OilTankContainer[]>) => this.convertArrayResponse(res));
    }

    queryGetEmptyContainer(req?: any): Observable<HttpResponse<OilTankContainer[]>> {
        const options = createRequestOption(req);
        return this.http.get<OilTankContainer[]>(this.resourceUrl + '/product-unit', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<OilTankContainer[]>) => this.convertArrayResponse(res));
    }

    /*queryByDayDepotContainer(dayDepotContainerId: number, req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceDayDepotContainerUrl + '/' + dayDepotContainerId + '/oil-tank-container', options)
            .map((res: Response) => this.convertResponse(res));
    }

    findByDayDepotContainerId(dayDepotContainerId: number): Observable<OilTankContainer> {
        return this.http.get(this.resourceDayDepotContainerUrl + '/' + dayDepotContainerId + '/oil-tank-container')
            .map((res: Response) => this.convertItemFromServer(res.json()));
    }

    findByDayDepotId(dayDepotId: number): Observable<OilTankContainer> {
        return this.http.get(this.resourceUrl + '/day-depot/' + dayDepotId)
            .map((res: Response) => this.convertItemFromServer(res.json()));
    }
*/
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OilTankContainer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OilTankContainer[]>): HttpResponse<OilTankContainer[]> {
        const jsonResponse: OilTankContainer[] = res.body;
        const body: OilTankContainer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OilTankContainer.
     */
    private convertItemFromServer(oilTankContainer: OilTankContainer): OilTankContainer {
        const copy: OilTankContainer = Object.assign({}, oilTankContainer);
        return copy;
    }

    /**
     * Convert a OilTankContainer to a JSON which can be sent to the server.
     */
    private convert(oilTankContainer: OilTankContainer): OilTankContainer {
        const copy: OilTankContainer = Object.assign({}, oilTankContainer);

        return copy;
    }
}
