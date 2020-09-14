import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Principal } from '../../shared';
import { PasswordService } from './password.service';
import {JhiAlertService} from 'ng-jhipster';
import {STRONG_PASSWORD} from 'app/shared/constants/regex.constants';


@Component({
    selector: 'jhi-password',
    templateUrl: './password.component.html'
})
export class PasswordComponent implements OnInit {
    patternPassword  = STRONG_PASSWORD;
    doNotMatch: string;
    error: string;
    success: string;
    account: any;
    password: string;
    confirmPassword: string;
    oldPassword: string;

    constructor(
        private passwordService: PasswordService,
        private jhiAlertService: JhiAlertService,
        private router: Router,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
    }
    private onError(error: any) {
        // this.jhiAlertService.error(error.message, null, null);
    }
    changePassword() {
        if (this.password !== this.confirmPassword) {
            this.error = null;
            this.success = null;
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.passwordService.save(this.password, this.oldPassword).subscribe(() => {
                this.error = null;
                this.success = 'OK';
                setTimeout(i => {
                    this.router.navigate(['/']);
                }, 2000);
            }, (error) => {
                this.onError(error);
                this.success = null;
                this.error = 'ERROR';
            });
        }
    }
}
