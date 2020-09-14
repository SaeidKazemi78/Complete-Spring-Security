import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CarInfo } from './car-info.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CarInfo>;

@Injectable({ providedIn: 'root' })
export class CarInfoService {

    private resourceUrl = 'niopdcbase/api/car-infos';

    private resourceCarUrl = 'niopdcbase/api/cars';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(carInfo: CarInfo): Observable<EntityResponseType> {
            const copy = this.convert(carInfo);
        return this.http.post<CarInfo>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(carInfo: CarInfo): Observable<EntityResponseType> {
        const copy = this.convert(carInfo);
        return this.http.put<CarInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CarInfo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( carId: any, req?: any): Observable<HttpResponse<CarInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<CarInfo[]>(this.resourceCarUrl + '/' + carId + '/car-infos' ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<CarInfo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CarInfo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CarInfo[]>): HttpResponse<CarInfo[]> {
        const jsonResponse: CarInfo[] = res.body;
        const body: CarInfo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CarInfo.
     */
    private convertItemFromServer(carInfo: CarInfo): CarInfo {
        const copy: CarInfo = Object.assign(new CarInfo(), carInfo);
                copy.physicalInsuranceExpireDate = this.dateUtils
            .convertDateTimeFromServer(copy.physicalInsuranceExpireDate);
                copy.thirdPartyInsuranceExpireDate = this.dateUtils
            .convertDateTimeFromServer(copy.thirdPartyInsuranceExpireDate);
                copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(copy.registerDate);
                copy.fromDate = this.dateUtils
            .convertDateTimeFromServer(copy.fromDate);
                copy.toDate = this.dateUtils
            .convertDateTimeFromServer(copy.toDate);
        return copy;
    }

    /**
     * Convert a CarInfo to a JSON which can be sent to the server.
     */
    private convert(carInfo: CarInfo): CarInfo {
        const copy: CarInfo = Object.assign({}, carInfo);

        return copy;
    }
}
