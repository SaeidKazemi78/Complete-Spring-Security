import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs';

import {SERVER_API_URL} from '../../app.constants';

import {createRequestOption} from '../../shared';
import {UserRequest} from 'app/entities/user-request/user-request.model';


export type EntityResponseType = HttpResponse<UserRequest>;

@Injectable({providedIn: 'root'})
export class UserRequestService {


     boundaries = new Subject<any>();

    private resourceUrl = SERVER_API_URL + 'niopdcuaa/api/user-request';
    private getLocationResource= SERVER_API_URL+ 'niopdcbase/api/boundaries/get-boundaries';

    constructor(private http: HttpClient) {

    }

    getLocationsByParentId(locationId:number):Observable<HttpResponse<any[]>> {
        return this.http.get<any[]>(`${this.getLocationResource}/${locationId}`, {observe: 'response'});
    }


    create(user: UserRequest): Observable<HttpResponse<UserRequest>> {
        return this.http.post<UserRequest>(this.resourceUrl, user, {observe: 'response'});
    }

    createNew(user: UserRequest): Observable<HttpResponse<UserRequest>> {
        return this.http.post<UserRequest>(`${this.resourceUrl}/new-user`, user, {observe: 'response'});
    }

    update(userRequest: UserRequest): Observable<HttpResponse<UserRequest>> {
        return this.http.put<UserRequest>(this.resourceUrl, userRequest, {observe: 'response'});
    }

    resetPassword(username: string, password: string): Observable<HttpResponse<UserRequest>> {
        return this.http.put<UserRequest>(`${this.resourceUrl}/reset-pass`, {
            username,
            password
        }, {observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<UserRequest>> {
        return this.http.get<UserRequest>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    findByTrackingCode(trackingCode: string): Observable<HttpResponse<UserRequest>> {
        return this.http.get<UserRequest>(`${this.resourceUrl}/print/${trackingCode}`, {observe: 'response'});
    }

    existUserByLogin(login: string): Observable<HttpResponse<boolean>> {
        return this.http.get<boolean>(`${this.resourceUrl}/exist-login/${login}`, {observe: 'response'});
    }

    existUserByEmail(email: string, username: string): Observable<HttpResponse<boolean>> {
        let params = null;
        if (username == null) {
            params = new HttpParams().set('email', email);
        } else {
            params = new HttpParams().set('email', email).set('username', username);
        }
        return this.http.get<boolean>(`${this.resourceUrl}/exist-email`, {params, observe: 'response'});
    }

    query(req?: any, trackingCode?: string): Observable<HttpResponse<UserRequest[]>> {
        let options = createRequestOption(req);
        if (trackingCode) {
            options = options.append('trackingCode', trackingCode);
        }
        return this.http.get<UserRequest[]>(this.resourceUrl, {params: options, observe: 'response'});
    }

    confirm(id: number): Observable<HttpResponse<any>> {
        return this.http.put(`${this.resourceUrl}/${id}/confirm`, null, {observe: 'response'});
    }

    revertConfirm(id: number): Observable<HttpResponse<any>> {
        return this.http.put(`${this.resourceUrl}/${id}/revert-confirm`, null, {observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    authorities(): Observable<string[]> {
        return this.http.get<string[]>(SERVER_API_URL + 'niopdcuaa/api/users/authorities');
    }

    getUserType(userType: any): any[] {
        if (userType === 'HEAD') {
            return ['HEAD', 'AREA', 'ZONE', 'PERSON', 'REFUEL_CENTER'];
        } else if (userType === 'AREA') {
            return ['AREA', 'ZONE', 'PERSON'];
        } else if (userType === 'ZONE') {
            return ['ZONE', 'PERSON'];
        } else if (userType === 'PERSON') {
            return ['PERSON'];
        } else if (userType === 'REFUEL_CENTER') {
            return ['REFUEL_CENTER'];
        }

    }
}
