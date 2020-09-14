import {AfterViewInit, Component, ElementRef, OnInit, Renderer, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {JhiEventManager} from 'ng-jhipster';

import {LoginService} from './login.service';
import {StateStorageService} from '../auth/state-storage.service';
import {CaptchaComponent} from 'angular-captcha';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {timer} from 'rxjs';

@Component({
    styleUrls: ['login.css'],
    selector: 'jhi-login-modal',
    templateUrl: './login.component.html'
})
export class JhiLoginModalComponent implements AfterViewInit, OnInit {
    authenticationError: boolean;
    password: string;
    rememberMe = true;
    username: string;
    credentials: any;
    newPassword: string;
    confirmPass: string;
    @ViewChild(CaptchaComponent) captchaComponent: CaptchaComponent;

    constructor(
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        public activeModal: NgbActiveModal
    ) {
        this.credentials = {};
    }

    ngOnInit() {
        this.captchaComponent.captchaEndpoint = 'captcha-endpoint';
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []);
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
        this.activeModal.dismiss('cancel');
    }

    login() {
        this.loginService.login({
            userEnteredCaptchaCode: this.captchaComponent.userEnteredCaptchaCode,
            captchaId: this.captchaComponent.captchaId,
            username: this.username,
            password: this.password,
            rememberMe: this.rememberMe
        }).then(() => {
            this.authenticationError = false;
            this.activeModal.dismiss('login success');
            if (this.router.url === '/register' || (/^\/activate\//.test(this.router.url)) ||
                (/^\/reset\//.test(this.router.url))) {
                this.router.navigate(['']);
            }

            this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
            });

            // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
            // // since login is succesful, go to stored previousState and clear previousState
            const redirect = this.stateStorageService.getUrl();
            if (redirect) {
                this.stateStorageService.storeUrl(null);
                this.router.navigate([redirect]);
            }
        }).catch(() => {
            this.captchaComponent.reloadImage();
            this.authenticationError = true;
        });
    }

    register() {
        this.activeModal.dismiss('to state register');
        this.router.navigate(['/register']);
    }

    requestResetPassword(event) {
        this.activeModal.dismiss('to state requestReset');
        this.router.navigate(['/reset', 'otp']);
    }
}
