import {Injectable} from '@angular/core';
import {JhiLanguageService} from 'ng-jhipster';

import {Principal} from '../auth/principal.service';
import {AuthServerProvider} from '../auth/auth-jwt.service';
import {Router} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {Address} from "app/shared/remoteService";
import {SERVER_API_URL} from "app/app.constants";

@Injectable()
export class LoginService {

    constructor(
        private languageService: JhiLanguageService,
        private principal: Principal,
        private authServerProvider: AuthServerProvider,
        private router: Router,
        private http: HttpClient
    ) {
    }

    checkForceCaptcha(): Observable<HttpResponse<Boolean>> {
        return this.http.get<Boolean>(SERVER_API_URL +'/api/gateway/check-force-captcha',
            {observe: 'response'});
    }

    login(credentials, callback?) {
        const cb = callback || function() {
        };

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(data => {
                this.principal.identity(true).then(account => {
                    // After the login the language will be changed to
                    // the language selected by the user during his registration
                    if (account !== null) {
                        this.languageService.changeLanguage(account.langKey);
                        if (!account.valid && this.router.url !== 'settings') {
                            this.router.navigate(['settings']).then();
                        }
                        if (!account.validCellPhone && this.router.url !== 'settings') {
                            this.router.navigate(['settings']).then();
                        }
                        if (!account.userRequestId && this.router.url !== 'user/register') {
                            this.router.navigate(['user', account.login, 'register']).then();
                        }
                    }
                    resolve(data);
                });
                return cb();
            }, err => {
                this.logout();
                reject(err);
                return cb(err);
            });
        });
    }

    logout() {
        if (this.principal.isAuthenticated()) {
            this.authServerProvider.logout().subscribe(() => {
                this.principal.authenticate(null);
                location.reload();
            });
        } else {
            this.principal.authenticate(null);
        }
    }

}
