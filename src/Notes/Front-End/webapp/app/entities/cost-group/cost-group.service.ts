import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {CostGroup} from './cost-group.model';
import {createRequestOption} from '../../shared';
import {CostRateFilter, RateResponse} from '../order/order.model';
import {HttpCacheService} from '../../shared/http-cache/http-cache.service';
// import {CostRateFilter, RateResponse} from '../order';

export type EntityResponseType = HttpResponse<CostGroup>;
export type EntityRateResponse = HttpResponse<RateResponse>;

@Injectable({ providedIn: 'root' })
export class CostGroupService {

    private resourceUrl = SERVER_API_URL + 'niopdcrate/api/cost-groups';
    private resourceCostUrl = SERVER_API_URL + 'niopdcrate/api/costs';

    constructor(private http: HttpClient, private httpCache: HttpCacheService) {
    }

    create(costGroup: CostGroup): Observable<EntityResponseType> {
        const copy = this.convert(costGroup);
        return this.http.post<CostGroup>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(costGroup: CostGroup): Observable<EntityResponseType> {
        const copy = this.convert(costGroup);
        return this.http.put<CostGroup>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CostGroup>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findCostGroupByCostId(costId: number): Observable<EntityResponseType> {
        return this.httpCache.get<CostGroup>(`${this.resourceCostUrl}/${costId}/cost-group`, {observe: 'response'},
            'D', 'findCostGroupByCostId')
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CostGroup[]>> {
        const options = createRequestOption(req);
        return this.http.get<CostGroup[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<CostGroup[]>) => this.convertArrayResponse(res));

    }

    queryByProductId(productId: number, req?: any): Observable<HttpResponse<CostGroup[]>> {
        const options = createRequestOption(req);
        return this.http.get<CostGroup[]>(`${this.resourceUrl}/${productId}/product`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<CostGroup[]>) => this.convertArrayResponse(res));

    }

    queryLoadDefaultByProductAndLocationAndCustomerAndContractType(productId, locationId, typeId, contractType, customerGroup): Observable<HttpResponse<CostGroup[]>> {
        return this.http.get(this.resourceUrl + '/product/' + productId + '/location/' + locationId +
            '/customer/' + typeId + '/contract-type/' + contractType + '/customer-group/' + customerGroup, {
            observe: 'response'
        })
            .map((res: HttpResponse<CostGroup[]>) => this.convertArrayResponse(res));
    }

    queryLoadDefaultByProductAndContractTypeAndLocations(productId, contractType, locationIds): Observable<HttpResponse<CostGroup[]>> {
        return this.http.get(this.resourceUrl + '/product/' + productId +
            '/contract-type/' + contractType, {
            params: new HttpParams().set('locationIds', locationIds),
            observe: 'response'
        })
            .map((res: HttpResponse<CostGroup[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CostGroup = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CostGroup[]>): HttpResponse<CostGroup[]> {
        const jsonResponse: CostGroup[] = res.body;
        const body: CostGroup[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /*private convertArrayResponseRateResponse(res: HttpResponse<RateResponse[]>): HttpResponse<RateResponse[]> {
        const jsonResponse: RateResponse[] = res.body;
        const body: RateResponse[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServerRateResponse(jsonResponse[i]));
        }
        return res.clone({body});
    }*/

    /**
     * Convert a returned JSON object to CostGroup.
     */
    private convertItemFromServer(costGroup: CostGroup): CostGroup {
        const copy: CostGroup = Object.assign({}, costGroup);
        return copy;
    }

    /**
     * Convert a returned JSON object to CostGroup.
     */

    /*    private convertItemFromServerRateResponse(rateResponse: RateResponse): RateResponse {
            const copy: RateResponse = Object.assign({}, rateResponse);
            return copy;
        }*/
    private convertItemFromServerRateResponse(res: EntityRateResponse): EntityRateResponse {
        const body: RateResponse = Object.assign({}, res.body);
        return res.clone({body});
    }

    /**
     * Convert a CostGroup to a JSON which can be sent to the server.
     */
    private convert(costGroup: CostGroup): CostGroup {
        const copy: CostGroup = Object.assign({}, costGroup);
        return copy;
    }

    private convertCostRateFilter(costRateFilter: CostRateFilter): CostRateFilter {
        const copy: CostRateFilter = Object.assign({}, costRateFilter);

        return copy;
    }

    private convertItemRateResponseFromServer(json: any): RateResponse {
        const entity: RateResponse = Object.assign(new RateResponse(), json);
        return entity;
    }

}
