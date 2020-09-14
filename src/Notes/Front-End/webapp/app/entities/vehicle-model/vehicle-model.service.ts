import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { VehicleModel } from './vehicle-model.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<VehicleModel>;

@Injectable({ providedIn: 'root' })
export class VehicleModelService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/vehicle-models';

    constructor(private http: HttpClient) { }

    create(vehicleModel: VehicleModel): Observable<EntityResponseType> {
        const copy = this.convert(vehicleModel);
        return this.http.post<VehicleModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(vehicleModel: VehicleModel): Observable<EntityResponseType> {
        const copy = this.convert(vehicleModel);
        return this.http.put<VehicleModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VehicleModel>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VehicleModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<VehicleModel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<VehicleModel[]>) => this.convertArrayResponse(res));
    }

    queryByCustomerGroup(group): Observable<HttpResponse<VehicleModel[]>> {
        return this.http.get<VehicleModel[]>(this.resourceUrl + '/customer-group/' + group, { observe: 'response' })
            .map((res: HttpResponse<VehicleModel[]>) => this.convertArrayResponse(res));
    }

    queryByHaveMeasure(haveMeasure: any, req?: any): Observable<HttpResponse<VehicleModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<VehicleModel[]>(`${this.resourceUrl}/have-measure/${haveMeasure}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<VehicleModel[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    confirm(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/confirm/${id}`, { observe: 'response'});
    }

    revertConfirm(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/revert-confirm/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VehicleModel = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VehicleModel[]>): HttpResponse<VehicleModel[]> {
        const jsonResponse: VehicleModel[] = res.body;
        const body: VehicleModel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VehicleModel.
     */
    private convertItemFromServer(vehicleModel: VehicleModel): VehicleModel {
        const copy: VehicleModel = Object.assign({}, vehicleModel);
        return copy;
    }

    /**
     * Convert a VehicleModel to a JSON which can be sent to the server.
     */
    private convert(vehicleModel: VehicleModel): VehicleModel {
        const copy: VehicleModel = Object.assign({}, vehicleModel);
        return copy;
    }
}
