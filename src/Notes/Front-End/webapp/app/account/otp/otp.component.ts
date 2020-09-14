import { Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {OtpService} from './otp.service';
import {HttpErrorResponse} from '@angular/common/http';
import {STRONG_PASSWORD} from 'app/shared/constants/regex.constants';

@Component({
    styleUrls: ['otp.css'],
    selector: 'jhi-otp',
    templateUrl: './otp.component.html'
})
export class OtpComponent implements  OnInit {
    patternPassword  = STRONG_PASSWORD;
    authenticationError: boolean;
    password: string;
    rememberMe = true;
    username: string;
    cellPhone: string;
    credentials: any;
    otpCode: string;
    step = 'START';
    retrieveMode = true;
    waiting: boolean;
    credential = {};
    timer: any;
    timerLabel = ' 00:00 ';
    sending: boolean;
    sendingPass = false;
    confirmPass = null;

    nextState: boolean;

    constructor(
        private eventManager: JhiEventManager,
        private otpService: OtpService,
        private elementRef: ElementRef,
        private router: Router,
        private jhiAlertService: JhiAlertService,
    ) {
        this.credentials = {};
    }

    ngOnInit(): void {
        this. step = 'START';
    }

    sendRecoveryCode(event) {
        this.sending = true;
        this.otpService.sendOtpCode(this.username, this.cellPhone, this.retrieveMode ? 'SMS' : 'EMAIL')
            .subscribe(response => {
                this.step = 'WAITING';
                this.sending = false;
                this.startTimer();
            }, (res: HttpErrorResponse) => {
                this.sending = false;
                this.step = 'START';
                this.onError(res.error);
            });
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
    }

    startTimer() {
        let time = 120;
        const parent = this;
        this.waiting = true;
        this.timer = setInterval(function() {
            time--;
            if (time >= 0) {
                const second = time % 60;
                parent.timerLabel = second + ' : ' + Math.floor(time / 60);
                console.log(parent.timerLabel);
            }
            if (time < 0) {
                parent.waiting = false;
                clearInterval(parent.timer);
            }
        }, 1000);

    }

    onOtpChange(otp: string) {
        if (otp.length === 4) {
            this.step = 'PASS';
        } else {
            this.step = 'WAITING';
        }
    }

    resetPassword() {
        this.sendingPass = true;
        this.otpService.resetPass(this.username, this.password, this.otpCode)
            .subscribe(response => {
                this.jhiAlertService.success('error.pass.change.success', null, null);
                const parent = this;
                setTimeout(function() {
                    parent.router.navigate(['/']);
                }, 2000);

            }, (res: HttpErrorResponse) => {
                this.step = 'START';
                this.sendingPass = false;
                this.onError(res.error);
            });
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
