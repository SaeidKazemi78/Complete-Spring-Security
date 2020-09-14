import {Injectable} from '@angular/core';

import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SERVER_API_URL} from '../../app.constants';
@Injectable()
export class OtpService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
    }

    sendOtpCode(login: string, cellPhone: string, recoveryType: string) {
        let options: HttpParams = new HttpParams();
        options = options.set('login', login);
        options = options.set('cellPhone', cellPhone);
        options = options.set('recoveryType', recoveryType);
        return this.http.get(SERVER_API_URL + 'niopdcuaa/otp/send-code', {params: options, observe: 'response'});
    }

    resetPass(username: string, password: string, otp: string) {
        return this.http.post(SERVER_API_URL + 'niopdcuaa/otp/reset-pass', {'username': username, 'password': password, 'otp': otp}, {});
    }
}
