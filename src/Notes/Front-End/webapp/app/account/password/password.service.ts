import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

@Injectable({ providedIn: 'root' })
export class PasswordService {
    constructor(private http: HttpClient) {}

    save(newPassword: string, password: string): Observable<any> {
        return this.http.post(SERVER_API_URL + 'niopdcuaa/api/account/change-password', { newPassword, password});
    }
}
