import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {VehicleCapacity} from './vehicle-capacity.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<VehicleCapacity>;

@Injectable({providedIn: 'root'})
export class VehicleCapacityService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/vehicle-capacities';

    private resourceVehicleModelUrl = SERVER_API_URL + 'niopdcbase/api/vehicle-models';

    constructor(private http: HttpClient) {
    }

    create(vehicleCapacity: VehicleCapacity): Observable<EntityResponseType> {
        const copy = this.convert(vehicleCapacity);
        return this.http.post<VehicleCapacity>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(vehicleCapacity: VehicleCapacity): Observable<EntityResponseType> {
        const copy = this.convert(vehicleCapacity);
        return this.http.put<VehicleCapacity>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VehicleCapacity>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(vehicleModelId: any, req?: any): Observable<HttpResponse<VehicleCapacity[]>> {
        const options = createRequestOption(req);
        return this.http.get<VehicleCapacity[]>(this.resourceVehicleModelUrl + '/' + vehicleModelId + '/vehicle-capacities', {params: options, observe: 'response'})
            .map((res: HttpResponse<VehicleCapacity[]>) => this.convertArrayResponse(res));
    }

    queryBoundary(vehicleModelId: any): Observable<HttpResponse<VehicleCapacity>> {
        return this.http.get<VehicleCapacity>(this.resourceVehicleModelUrl + '/' + vehicleModelId + '/vehicle-capacity', {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VehicleCapacity = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VehicleCapacity[]>): HttpResponse<VehicleCapacity[]> {
        const jsonResponse: VehicleCapacity[] = res.body;
        const body: VehicleCapacity[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VehicleCapacity.
     */
    private convertItemFromServer(vehicleCapacity: VehicleCapacity): VehicleCapacity {
        const copy: VehicleCapacity = Object.assign({}, vehicleCapacity);
        return copy;
    }

    /**
     * Convert a VehicleCapacity to a JSON which can be sent to the server.
     */
    private convert(vehicleCapacity: VehicleCapacity): VehicleCapacity {
        const copy: VehicleCapacity = Object.assign({}, vehicleCapacity);
        return copy;
    }
}
