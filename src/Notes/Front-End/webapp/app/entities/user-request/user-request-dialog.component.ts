import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Principal} from '../../shared';
import {UserRequestPopupService} from './user-request-popup.service';
import {MainAuthority} from '../main-authority';
import {Role, RoleService} from '../role';
import {ParentAuthority, ParentAuthorityService} from '../parent-authority';
import {LocationService} from '../location';
import {TranslateService} from '@ngx-translate/core';
import {PersonService} from '../person';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {UserManagementService} from 'app/entities/user-management/user-management.service';
import {STRONG_PASSWORD} from 'app/shared/constants/regex.constants';
import {UserRequest} from 'app/entities/user-request/user-request.model';

@Component({
    selector: 'jhi-user-request-dialog',
    templateUrl: './user-request-dialog.component.html'
})
export class UserRequestDialogComponent implements OnInit {
    roleSelected: any[] = [];
    patternPassword = STRONG_PASSWORD;
    userRequest: UserRequest;
    languages: any[];
    authorities: any[];
    isSaving: Boolean;
    isView: boolean;
    inquiryDisable: boolean;
    parentAuthorities: ParentAuthority[];
    roles: any[];
    groups: any[];
    authorities1: any[];
    denyAuthorities1: any[];
    canAuth: MainAuthority[];
    disabledAuthorities = false;
    adminRole = false;
    currentUserType: any | undefined;
    roleAuthorities: any[];
    roleDenyAuthorities: any[];
    confirmPass = null;
    userTypes: any[];
    canEditFatherName = false;
    canEditIdCode = false;
    canEditFirstName = false;
    canEditLastName = false;
    changePassword = false;
    minDateTime = new Date();
    maxDateTime = new Date();
    minDateTimeAccount = new Date();
    maxDateTimeAccount = new Date();
    tempRole: Role[] = [];

    isInquiryValid = false;
    isInquiry = false;

    constructor(public activeModal: NgbActiveModal,
                private languageHelper: JhiLanguageHelper,
                private userService: UserManagementService,
                private translateService: TranslateService,
                private parentAuthorityService: ParentAuthorityService,
                private roleService: RoleService,
                private principal: Principal,
                private locationService: LocationService,
                private eventManager: JhiEventManager,
                private personService: PersonService) {
    }

    ngOnInit() {



        this.principal.identity().then(value => {
            this.userTypes = value.userTypes;
            this.currentUserType = value.userType;
            this.canAuth = value.authorities.map(s => new MainAuthority(s));
        });

        if (this.userRequest.id) {
            this.roleService.getAllRole(this.userRequest.userType).subscribe(req => {
                this.tempRole = req.body;
            });
            // if (this.userRequest.authorities && this.userRequest.authorities.length > 0) {
            //     this.adminRole = this.userRequest.authorities.find(value => value === 'ROLE_ADMIN') === 'ROLE_ADMIN';
            //     this.authorities1 = this.userRequest.authorities.map(s => new MainAuthority(s));
            // }
            // if (this.userRequest.denyAuthorities) {
            //     this.denyAuthorities1 = this.userRequest.denyAuthorities.map(s => new MainAuthority(s));
            // }
        }

        this.isView = true;
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;

        if (this.userRequest.id !== null) {
            if (!this.changePassword) {
                this.userRequest.password = null;
            }

            this.userService.update(this.userRequest).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.userService.create(this.userRequest).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'userListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result.body);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-user-request-popup',
    template: ''
})
export class UserRequestPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userRequestPopupService: UserRequestPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.userRequestPopupService
                    .open(UserRequestDialogComponent as Component, params['id']);
            } else {
                this.userRequestPopupService
                    .open(UserRequestDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static isView: boolean;
}
