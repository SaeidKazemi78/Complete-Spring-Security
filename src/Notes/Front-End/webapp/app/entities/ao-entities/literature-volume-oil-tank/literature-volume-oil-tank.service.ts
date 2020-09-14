import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {LiteratureVolumeOilTank} from './literature-volume-oil-tank.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<LiteratureVolumeOilTank>;

@Injectable({providedIn: 'root'})
export class LiteratureVolumeOilTankService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/literature-volume-oil-tanks';

    private resourceOilTankUrl = SERVER_API_URL + 'niopdcao/api/oil-tanks';
    private resourceServiceOilTankUrl = SERVER_API_URL + 'niopdcao/api/service-oil-tanks';

    constructor(private http: HttpClient) {
    }

    create(literatureVolumeOilTank: LiteratureVolumeOilTank): Observable<EntityResponseType> {
        const copy = this.convert(literatureVolumeOilTank);
        return this.http.post<LiteratureVolumeOilTank>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(literatureVolumeOilTank: LiteratureVolumeOilTank): Observable<EntityResponseType> {
        const copy = this.convert(literatureVolumeOilTank);
        return this.http.put<LiteratureVolumeOilTank>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    uploadExcelServiceOilTank(file: any, serviceOilTankId): Observable<HttpResponse<string>> {
        const formData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<any>(`${this.resourceUrl}/upload/service/${serviceOilTankId}`, formData, {
            observe: 'response',
            headers: {'Content-Type': undefined}
        })
            .map((res: HttpResponse<string>) => {
                return res;
            });
    }

    uploadExcelOilTank(file: any, oilTankId: number): Observable<HttpResponse<string>> {
        let formData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<any>(`${this.resourceUrl}/upload/oil-tank/${oilTankId}`, formData, {
            observe: 'response'
        })
            .map((res: HttpResponse<string>) => {
                return res;
            });
    }

    calculateRatio(millimeter, oilTankId, serviceOilTankId): Observable<HttpResponse<number>> {
        let params = new HttpParams().set('millimeter', millimeter);
        if (oilTankId) {
            params = params.set('oilTankId', oilTankId);
        } else if (serviceOilTankId) {
            params = params.set('serviceOilTankId', serviceOilTankId);
        }
        return this.http.get<number>(`${this.resourceUrl}/calculate-ratio`, {params, observe: 'response'})
            .map((res: HttpResponse<number>) => res);
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LiteratureVolumeOilTank>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findForSixty(id: number): Observable<EntityResponseType> {
        return this.http.get<LiteratureVolumeOilTank>(`${this.resourceUrl}/sixty/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    queryByOilTankId(oilTankId: any, req?: any): Observable<HttpResponse<LiteratureVolumeOilTank[]>> {
        const options = createRequestOption(req);
        return this.http.get<LiteratureVolumeOilTank[]>(`${this.resourceOilTankUrl}/${oilTankId}/literature-volume-oil-tanks`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<LiteratureVolumeOilTank[]>) => this.convertArrayResponse(res));
    }

    queryByServiceOilTankId(serviceOilTankId: any, req?: any): Observable<HttpResponse<LiteratureVolumeOilTank[]>> {
        const options = createRequestOption(req);
        return this.http.get<LiteratureVolumeOilTank[]>(this.resourceServiceOilTankUrl + '/' + serviceOilTankId + '/literature-volume-oil-tanks',
            {params: options, observe: 'response'})
            .map((res: HttpResponse<LiteratureVolumeOilTank[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LiteratureVolumeOilTank = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LiteratureVolumeOilTank[]>): HttpResponse<LiteratureVolumeOilTank[]> {
        const jsonResponse: LiteratureVolumeOilTank[] = res.body;
        const body: LiteratureVolumeOilTank[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LiteratureVolumeOilTank.
     */
    private convertItemFromServer(literatureVolumeOilTank: LiteratureVolumeOilTank): LiteratureVolumeOilTank {
        const copy: LiteratureVolumeOilTank = Object.assign({}, literatureVolumeOilTank);
        return copy;
    }

    /**
     * Convert a LiteratureVolumeOilTank to a JSON which can be sent to the server.
     */
    private convert(literatureVolumeOilTank: LiteratureVolumeOilTank): LiteratureVolumeOilTank {
        const copy: LiteratureVolumeOilTank = Object.assign({}, literatureVolumeOilTank);
        return copy;
    }
}
