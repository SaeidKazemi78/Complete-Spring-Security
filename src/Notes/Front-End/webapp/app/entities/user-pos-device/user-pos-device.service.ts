import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { UserPosDevice } from './user-pos-device.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserPosDevice>;

@Injectable({ providedIn: 'root' })
export class UserPosDeviceService {

    private resourceUrl = 'niopdcpayment/api/user-pos-devices';

    constructor(private http: HttpClient) { }

    create(userPosDevice: UserPosDevice): Observable<EntityResponseType> {
            const copy = this.convert(userPosDevice);
        return this.http.post<UserPosDevice>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userPosDevice: UserPosDevice): Observable<EntityResponseType> {
        const copy = this.convert(userPosDevice);
        return this.http.put<UserPosDevice>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserPosDevice>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserPosDevice[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserPosDevice[]>(this. resourceUrl ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<UserPosDevice[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserPosDevice = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserPosDevice[]>): HttpResponse<UserPosDevice[]> {
        const jsonResponse: UserPosDevice[] = res.body;
        const body: UserPosDevice[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserPosDevice.
     */
    private convertItemFromServer(userPosDevice: UserPosDevice): UserPosDevice {
        const copy: UserPosDevice = Object.assign(new UserPosDevice(), userPosDevice);
        return copy;
    }

    /**
     * Convert a UserPosDevice to a JSON which can be sent to the server.
     */
    private convert(userPosDevice: UserPosDevice): UserPosDevice {
        const copy: UserPosDevice = Object.assign({}, userPosDevice);

        return copy;
    }
}
