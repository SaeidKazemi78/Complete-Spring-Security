import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {TransferType} from './transfer-type.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<TransferType>;

@Injectable({ providedIn: 'root' })
export class TransferTypeService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/transfer-types';

    constructor(private http: HttpClient) {
    }

    create(transferType: TransferType): Observable<EntityResponseType> {
        const copy = this.convert(transferType);
        return this.http.post<TransferType>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(transferType: TransferType): Observable<EntityResponseType> {
        const copy = this.convert(transferType);
        return this.http.put<TransferType>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TransferType>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TransferType[]>> {
        const options = createRequestOption(req);
        return this.http.get<TransferType[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<TransferType[]>) => this.convertArrayResponse(res));
    }

    queryByRefuelCenterAndOilTankType(refuelCenterId: any, oilTankType: any, isFrom: boolean, req?: any): Observable<HttpResponse<TransferType[]>> {
        const options = createRequestOption(req);
        return this.http.get<TransferType[]>(`${this.resourceUrl}/refuel-center/${refuelCenterId}/oil-tank-type/${oilTankType}/is-from/${isFrom}`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<TransferType[]>) => this.convertArrayResponse(res));
    }

    queryByAndOilTankType(oilTankType: any, req?: any): Observable<HttpResponse<TransferType[]>> {
        const options = createRequestOption(req);
        return this.http.get<TransferType[]>(`${this.resourceUrl}/oil-tank-type/${oilTankType}/`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<TransferType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    findByTransferFrom(oilTankId: number): Observable<HttpResponse<TransferType[]>> {
        return this.http.get<TransferType[]>(`${this.resourceUrl}/${oilTankId}/transferFrom`, {
            observe: 'response'
        })
            .map((res: HttpResponse<TransferType[]>) => this.convertArrayResponse(res));
    }

    queryByFromAndToOilTankType(fromOilTankType, toOilTankType): Observable<HttpResponse<TransferType[]>> {
        return this.http.get<TransferType[]>(`${this.resourceUrl}/source/${fromOilTankType}/target/${toOilTankType}`, {
            observe: 'response'
        })
            .map((res: HttpResponse<TransferType[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TransferType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TransferType[]>): HttpResponse<TransferType[]> {
        const jsonResponse: TransferType[] = res.body;
        const body: TransferType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TransferType.
     */
    private convertItemFromServer(transferType: TransferType): TransferType {
        const copy: TransferType = Object.assign({}, transferType);
        return copy;
    }

    /**
     * Convert a TransferType to a JSON which can be sent to the server.
     */
    private convert(transferType: TransferType): TransferType {
        const copy: TransferType = Object.assign({}, transferType);
        return copy;
    }
}
