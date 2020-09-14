import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {TransferPlatformToUnit} from './transfer-platform-to-unit.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<TransferPlatformToUnit>;

@Injectable({ providedIn: 'root' })
export class TransferPlatformToUnitService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/transfer-platform-to-units';
    private resourceDayDepotUrl = SERVER_API_URL + 'niopdcao/api/day-depots';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(transferPlatformToUnit: TransferPlatformToUnit): Observable<EntityResponseType> {
        const copy = this.convert(transferPlatformToUnit);
        return this.http.post<TransferPlatformToUnit>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(transferPlatformToUnit: TransferPlatformToUnit): Observable<EntityResponseType> {
        const copy = this.convert(transferPlatformToUnit);
        return this.http.put<TransferPlatformToUnit>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TransferPlatformToUnit>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(dayDepotId: any, req?: any): Observable<HttpResponse<TransferPlatformToUnit[]>> {
        const options = createRequestOption(req);
        return this.http.get<TransferPlatformToUnit[]>(this.resourceDayDepotUrl + '/' + dayDepotId + '/transfer-platform-to-units', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<TransferPlatformToUnit[]>) => this.convertArrayResponse(res));
    }

    queryFromPlatform(dayDepotId: any, req?: any): Observable<HttpResponse<TransferPlatformToUnit[]>> {
        const options = createRequestOption(req);
        return this.http.get<TransferPlatformToUnit[]>(this.resourceDayDepotUrl + '/' + dayDepotId + '/transfer-platform-to-units/from-platform', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<TransferPlatformToUnit[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TransferPlatformToUnit = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TransferPlatformToUnit[]>): HttpResponse<TransferPlatformToUnit[]> {
        const jsonResponse: TransferPlatformToUnit[] = res.body;
        const body: TransferPlatformToUnit[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TransferPlatformToUnit.
     */
    private convertItemFromServer(transferPlatformToUnit: TransferPlatformToUnit): TransferPlatformToUnit {
        const copy: TransferPlatformToUnit = Object.assign({}, transferPlatformToUnit);
        copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(transferPlatformToUnit.registerDate);
        return copy;
    }

    /**
     * Convert a TransferPlatformToUnit to a JSON which can be sent to the server.
     */
    private convert(transferPlatformToUnit: TransferPlatformToUnit): TransferPlatformToUnit {
        const copy: TransferPlatformToUnit = Object.assign({}, transferPlatformToUnit);

        return copy;
    }
}
