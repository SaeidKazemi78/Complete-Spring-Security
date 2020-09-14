import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {createRequestOption, User} from '../../shared';

export type EntityResponseType = HttpResponse<User>;

@Injectable({providedIn: 'root'})
export class UserManagementService {
    private resourceUrl = SERVER_API_URL + 'niopdcuaa/api/users';

    constructor(private http: HttpClient) {
    }

    create(user: User): Observable<HttpResponse<User>> {
        return this.http.post<User>(this.resourceUrl, user, {observe: 'response'});
    }

    update(user: User): Observable<HttpResponse<User>> {
        return this.http.put<User>(this.resourceUrl, user, {observe: 'response'});
    }

    resetPassword(username: string, password: string): Observable<HttpResponse<User>> {
        return this.http.put<User>(`${this.resourceUrl}/reset-pass`, {username, password}, {observe: 'response'});
    }

    find(login: string): Observable<HttpResponse<User>> {
        return this.http.get<User>(`${this.resourceUrl}/${login}`, {observe: 'response'});
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

    query(req?: any, user?: User): Observable<HttpResponse<User[]>> {
        let options = createRequestOption(req);
        if (user != null) {
            if (user.login != null && user.login != '') {
                options = options.append('username', user.login);
            }
            if (user.fullName != null && user.fullName != '') {
                options = options.append('fullName', user.fullName);
            }
            if (user.locationName != null && user.locationName != '') {
                options = options.append('locationName', user.locationName);
            }
            if (user.userType != null) {
                options = options.append('userType', user.userType);
            }
            if (user.activated != null) {
                options = options.append('activated', user.activated);
            }
        }
        return this.http.get<User[]>(this.resourceUrl, {params: options, observe: 'response'});
    }

    delete(login: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${login}`, {observe: 'response'});
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
