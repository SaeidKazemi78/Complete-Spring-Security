import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {ServiceOilTank} from './service-oil-tank.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<ServiceOilTank>;

@Injectable({ providedIn: 'root' })
export class ServiceOilTankService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/service-oil-tanks';
    private resourceOilTankUrl = SERVER_API_URL + 'niopdcao/api/oil-tanks';

    constructor(private http: HttpClient) {
    }

    create(serviceOilTank: ServiceOilTank): Observable<EntityResponseType> {
        const copy = this.convert(serviceOilTank);
        return this.http.post<ServiceOilTank>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(serviceOilTank: ServiceOilTank): Observable<EntityResponseType> {
        const copy = this.convert(serviceOilTank);
        return this.http.put<ServiceOilTank>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ServiceOilTank>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    queryByOilTankId(oilTankId: any, req?: any): Observable<HttpResponse<ServiceOilTank[]>> {
        const options = createRequestOption(req);
        return this.http.get<ServiceOilTank[]>(this.resourceOilTankUrl + '/' + oilTankId + '/service-oil-tanks', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<ServiceOilTank[]>) => this.convertArrayResponse(res));
    }

    listOfIdByOilTankId(oilTankId: any): Observable<HttpResponse<number[]>> {
        return this.http.get<number[]>(this.resourceOilTankUrl + '/' + oilTankId + '/service-oil-tanks/ids', {
            observe: 'response'
        })
            .map((res: HttpResponse<number[]>) => res);
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ServiceOilTank = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ServiceOilTank[]>): HttpResponse<ServiceOilTank[]> {
        const jsonResponse: ServiceOilTank[] = res.body;
        const body: ServiceOilTank[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ServiceOilTank.
     */
    private convertItemFromServer(serviceOilTank: ServiceOilTank): ServiceOilTank {
        const copy: ServiceOilTank = Object.assign({}, serviceOilTank);
        return copy;
    }

    /**
     * Convert a ServiceOilTank to a JSON which can be sent to the server.
     */
    private convert(serviceOilTank: ServiceOilTank): ServiceOilTank {
        const copy: ServiceOilTank = Object.assign({}, serviceOilTank);
        return copy;
    }
}
