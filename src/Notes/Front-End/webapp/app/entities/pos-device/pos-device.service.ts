import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { PosDevice } from './pos-device.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PosDevice>;

@Injectable({ providedIn: 'root' })
export class PosDeviceService {

    private resourceUrl = 'niopdcpayment/api/pos-devices';

    constructor(private http: HttpClient) { }

    create(posDevice: PosDevice): Observable<EntityResponseType> {
            const copy = this.convert(posDevice);
        return this.http.post<PosDevice>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(posDevice: PosDevice): Observable<EntityResponseType> {
        const copy = this.convert(posDevice);
        return this.http.put<PosDevice>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PosDevice>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PosDevice[]>> {
        const options = createRequestOption(req);
        return this.http.get<PosDevice[]>(this. resourceUrl ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<PosDevice[]>) => this.convertArrayResponse(res));
    }

    findAllActive(): Observable<HttpResponse<PosDevice[]>> {
        return this.http.get<PosDevice[]>(this. resourceUrl + '/find-all/active' ,  { observe: 'response' })
            .map((res: HttpResponse<PosDevice[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PosDevice = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PosDevice[]>): HttpResponse<PosDevice[]> {
        const jsonResponse: PosDevice[] = res.body;
        const body: PosDevice[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MelliPosDevice.
     */
    private convertItemFromServer(posDevice: PosDevice): PosDevice {
        const copy: PosDevice = Object.assign(new PosDevice(), posDevice);
        return copy;
    }

    /**
     * Convert a MelliPosDevice to a JSON which can be sent to the server.
     */
    private convert(posDevice: PosDevice): PosDevice {
        const copy: PosDevice = Object.assign({}, posDevice);

        return copy;
    }

}
