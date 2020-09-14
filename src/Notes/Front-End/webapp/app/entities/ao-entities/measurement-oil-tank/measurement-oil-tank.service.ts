import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {MeasurementOilTank} from './measurement-oil-tank.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<MeasurementOilTank>;

@Injectable({ providedIn: 'root' })
export class MeasurementOilTankService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/measurement-oil-tanks';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(measurementOilTank: MeasurementOilTank): Observable<EntityResponseType> {
        const copy = this.convert(measurementOilTank);
        return this.http.post<MeasurementOilTank>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(measurementOilTank: MeasurementOilTank): Observable<EntityResponseType> {
        const copy = this.convert(measurementOilTank);
        return this.http.put<MeasurementOilTank>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MeasurementOilTank>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MeasurementOilTank[]>> {
        const options = createRequestOption(req);
        return this.http.get<MeasurementOilTank[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<MeasurementOilTank[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MeasurementOilTank = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MeasurementOilTank[]>): HttpResponse<MeasurementOilTank[]> {
        const jsonResponse: MeasurementOilTank[] = res.body;
        const body: MeasurementOilTank[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MeasurementOilTank.
     */
    private convertItemFromServer(measurementOilTank: MeasurementOilTank): MeasurementOilTank {
        const copy: MeasurementOilTank = Object.assign({}, measurementOilTank);
        copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(measurementOilTank.registerDate);
        return copy;
    }

    /**
     * Convert a MeasurementOilTank to a JSON which can be sent to the server.
     */
    private convert(measurementOilTank: MeasurementOilTank): MeasurementOilTank {
        const copy: MeasurementOilTank = Object.assign({}, measurementOilTank);

        return copy;
    }
}
