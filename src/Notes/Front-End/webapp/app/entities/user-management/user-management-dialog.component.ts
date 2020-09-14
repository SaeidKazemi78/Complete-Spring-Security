import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Principal, User} from '../../shared';
import {UserManagementPopupService} from './user-management-popup.service';
import {MainAuthority} from '../main-authority';
import {Role, RoleService, UserRole} from '../role';
import {ParentAuthority, ParentAuthorityService} from '../parent-authority';
import {LocationService} from '../location';
import {Location} from '../location/location.model';
import {TranslateService} from '@ngx-translate/core';
import {PersonService} from '../person';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {UserManagementService} from 'app/entities/user-management/user-management.service';
import {STRONG_PASSWORD} from 'app/shared/constants/regex.constants';
import {UserRequestService} from 'app/entities/user-request';

@Component({
    selector: 'jhi-user-management-dialog',
    templateUrl: './user-management-dialog.component.html'
})
export class UserManagementDialogComponent implements OnInit {

    patternPassword = STRONG_PASSWORD;
    user: User;
    languages: any[];
    authorities: any[];
    isSaving: Boolean;
    isView: boolean;
    inquiryDisable: boolean;
    parentAuthorities: ParentAuthority[];
    roleLevel: number = null;
    roles: any[];
    userRoles: UserRole[];
    grantableRoles: any[];
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

    isInquiryValid = false;
    isInquiry = false;
    isViewMultiRole = false;
    hasRoleAdmin = false;
    isViewGrantableRole = false;
    isRequestUser = false;

    constructor(public activeModal: NgbActiveModal,
                private languageHelper: JhiLanguageHelper,
                private userService: UserManagementService,
                private translateService: TranslateService,
                private parentAuthorityService: ParentAuthorityService,
                private roleService: RoleService,
                private principal: Principal,
                private userRequestService: UserRequestService,
                private locationService: LocationService,
                private eventManager: JhiEventManager,
                private personService: PersonService) {
    }

    ngOnInit() {
        this.isViewGrantableRole = this.principal.hasAnyAuthorityDirect(['ROLE_ADMIN', 'VIEW_GRANTABLE_ROLE']);
        this.isViewMultiRole = this.principal.hasAnyAuthorityDirect(['ROLE_ADMIN', 'VIEW_MULTI_ROLE']);
        this.hasRoleAdmin = this.principal.hasAnyAuthorityDirect(['ROLE_ADMIN']);

        this.minDateTimeAccount.setFullYear(this.minDateTime.getFullYear() - 120, 2, 22);
        this.maxDateTimeAccount.setFullYear(this.maxDateTime.getFullYear() - 18);

        this.principal.identity().then(value => {
            this.userTypes = value.userTypes;
            this.currentUserType = value.userType;
            this.canAuth = value.authorities.map(s => new MainAuthority(s));
        });
        if (this.user.id) {
            if (this.user.authorities && this.user.authorities.length > 0) {
                this.adminRole = this.user.authorities.find(value => value === 'ROLE_ADMIN') === 'ROLE_ADMIN';
                this.authorities1 = this.user.authorities.map(s => new MainAuthority(s));
            }
            if (this.user.denyAuthorities) {
                this.denyAuthorities1 = this.user.denyAuthorities.map(s => new MainAuthority(s));
            }
            this.userTypeChange();
        }

        if (this.user.login != null) {
            this.locationService.findAllLocationForUserTree(this.user.login).subscribe(
                (res: HttpResponse<Location[]>) => {
                    this.user.locationIds = res.body.map(value => value.id);
                });
        }

        this.parentAuthorityService.queryAllWithEagerRelationships().subscribe(
            (res: HttpResponse<ParentAuthority[]>) => {
                this.parentAuthorities = res.body;
            });

        this.isView = View.isView;
        this.isSaving = false;
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });

        if (View.requestId && View.username) {
            this.isRequestUser = true;

            this.userService.existUserByLogin(View.username).subscribe(value => {
                if (value.body) {
                    this.userService.find(View.username)
                        .subscribe(value => {
                            const serverUser = value.body;
                            if (serverUser && serverUser.id) {
                                this.user = serverUser;
                            }
                            this.userRequestService.find(View.requestId).subscribe(res => {
                                this.user.userRequestId = res.body.id;
                                this.user.userType = res.body.userType;
                                this.user.birthday = res.body.birthday;
                                this.user.cellPhone = res.body.cellPhone;
                                this.user.login = res.body.login;
                                this.user.nationalCode = res.body.nationalCode;
                                this.user.firstName = res.body.firstName;
                                this.user.lastName = res.body.lastName;
                                this.user.fatherName = res.body.fatherName;
                                this.user.personnelCode = res.body.personnelCode;
                                this.user.idCode = res.body.idCode;
                                this.user.email = res.body.email;
                                this.userTypeChange();
                                this.user.roleIds = [];
                                this.user.roleIds.push(res.body.role.id);
                                this.user.roles = [res.body.role];
                                this.user.roleId = res.body.role.id;

                                setTimeout(() => {
                                    if (this.isViewMultiRole) {
                                        this.onChangeRoles();
                                    } else {
                                        this.onChangeRole(res.body.role.id);
                                    }
                                }, 3000);

                                this.user.locationIds = [];
                                if (res.body.locationId) {
                                    this.user.locationIds.push(res.body.locationId);
                                }

                                this.user.endDate = new Date();
                                this.user.endDate.setFullYear(this.user.endDate.getFullYear() + 1);
                                this.user.valid = true;
                            });
                        }, error => {
                        });
                } else {
                    this.userRequestService.find(View.requestId).subscribe(res => {
                        this.user.userRequestId = res.body.id;
                        this.user.userType = res.body.userType;
                        this.user.birthday = res.body.birthday;
                        this.user.cellPhone = res.body.cellPhone;
                        this.user.login = res.body.login;
                        this.user.nationalCode = res.body.nationalCode;
                        this.user.firstName = res.body.firstName;
                        this.user.lastName = res.body.lastName;
                        this.user.fatherName = res.body.fatherName;
                        this.user.personnelCode = res.body.personnelCode;
                        this.user.idCode = res.body.idCode;
                        this.user.email = res.body.email;
                        this.userTypeChange();
                        this.user.roleIds = [];
                        this.user.roleIds.push(res.body.role.id);
                        this.user.roles = [res.body.role];
                        this.user.roleId = res.body.role.id;

                        setTimeout(() => {
                            if (this.isViewMultiRole) {
                                this.onChangeRoles();
                            } else {
                                this.onChangeRole(res.body.role.id);
                            }
                        }, 3000);

                        this.user.locationIds = [];
                        if (res.body.locationId) {
                            this.user.locationIds.push(res.body.locationId);
                        }

                        this.user.endDate = new Date();
                        this.user.endDate.setFullYear(this.user.endDate.getFullYear() + 1);
                        this.user.valid = true;
                    });
                }
            }, () => {

            });

        }
    }

    onChangeGrantableRoles(data) {
        console.log(data);
        let selectedRoleId = null;
        if (data) {
            selectedRoleId = data.itemValue;
        }
        this.user.grantableRoles = [];
        this.user.grantableRoleIds.forEach(roleId => {
            this.user.grantableRoles.push(this.userRoles.map(userRole => userRole.role).find(role => role.id === roleId));
        });
        if (data) {
            this.user.grantableRoles.forEach(grantableRole => {
                if (grantableRole.id === selectedRoleId && grantableRole.childRoles && grantableRole.childRoles.length > 0) {
                    this.fillChildRole(grantableRole);
                }
            });
        }
        /*this.grantableRoles.forEach(grantableRoleId => {
            const userRole: UserRole = this.userRoles.filter(value => value.role.id = grantableRoleId)[0];
            if (userRole.role.childRoles && userRole.role.childRoles.length > 0) {
                userRole.role.childRoles.forEach(childRole => {
                    this.fillChildRole(childRole);
                });
            }
        });*/
    }

    fillChildRole(role: Role) {
        if (this.user.grantableRoleIds.filter(roleId => roleId === role.id).length < 1) {
            this.user.grantableRoleIds.push(role.id);
            this.user.grantableRoles.push(role);
        }
        if (role.childRoles && role.childRoles.length > 0) {
            role.childRoles.forEach(childRole => {
                this.fillChildRole(childRole);
            });
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {

        if (this.adminRole) {
            this.user.authorities = [];
            this.user.authorities.push('ROLE_ADMIN');
        }
        this.isSaving = true;

        if (this.user.id !== null) {
            if (!this.changePassword) {
                this.user.password = null;
            }

            this.userService.update(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.userService.create(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    authoritiesSelected(event: MainAuthority[]) {
        this.user.authorities = event.map(s => s.name).filter(value => this.roleAuthorities == null || this.roleAuthorities.find(value1 => value1.name === value) == null);
    }

    denyAuthoritiesSelected(event: MainAuthority[]) {
        this.user.denyAuthorities = event.map(s => s.name);
        this.user.denyAuthorities = event.map(s => s.name).filter(value => this.roleDenyAuthorities == null || this.roleDenyAuthorities.find(value1 => value1.name === value) == null);
    }

    resetPassword(username: string, password: string) {
        if (username && password && password.length > 3) {
            this.userService.resetPassword(username, password).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    inquiry() {
        this.inquiryDisable = true;
        if (this.user.nationalCode && this.user.birthday) {
            this.personService.findByBaseInfo({
                code: this.user.nationalCode,
                idCode: this.user.idCode,
                birthday: this.user.birthday,
                personality: 'NATURAL'
            }).subscribe(value => {
                this.inquiryDisable = false;
                this.user.firstName = value.body.firstName;
                this.user.lastName = value.body.lastName;
                this.user.fatherName = value.body.fatherName;
                this.user.nationalCode = value.body.code;
                this.user.idCode = value.body.idCode;

                this.isInquiryValid = true;

                if (!value.body.fatherName) {
                    this.canEditFatherName = true;
                    this.isInquiryValid = false;
                }
                if (!value.body.firstName) {
                    this.canEditFirstName = true;
                    this.isInquiryValid = false;
                }
                if (!value.body.idCode) {
                    this.canEditIdCode = true;
                    this.isInquiryValid = false;
                }
                if (!value.body.lastName) {
                    this.canEditLastName = true;
                    this.isInquiryValid = false;
                }

                this.isInquiry = true;
            }, error => {
                this.isInquiry = true;
                this.isInquiryValid = false;
                this.canEditFatherName = true;
                this.canEditFirstName = true;
                this.canEditIdCode = true;
                this.canEditLastName = true;
                this.inquiryDisable = false;
            });
        }
    }

    userTypeChange() {
        this.roleService.readListByUserTypeAndGrantable(this.user.userType, {
            sort: ['role.name,asc']
        })
            .subscribe(
                (res: HttpResponse<UserRole[]>) => {
                    this.userRoles = res.body;

                    if (this.user.id !== null) {
                        if (this.isViewMultiRole) {
                            this.user.roleIds = [];
                            for (let i = 0; i < this.user.roles.length; i++) {
                                this.user.roleIds.push(this.user.roles[i].id);
                            }
                            this.updateRoleSelectorDate();
                            this.onChangeRoles();
                        } else {
                            this.user.roleId = this.user.roles[0].id;
                            this.updateRoleSelectorDate();
                            this.onChangeRole(this.user.roles[0].id);
                        }

                        if (this.isViewGrantableRole) {
                            this.user.grantableRoleIds = [];
                            this.user.grantableRoles.forEach(grantableRole => {
                                this.user.grantableRoleIds.push(grantableRole.id);
                            });

                            this.onChangeGrantableRoles(null);
                        }
                    }
                    this.updateRoleSelectorDate();
                }
            );
    }

    onChangeRoles() {

        this.user.roles = [];
        this.user.roleIds.forEach(roleId => {
            this.user.roles.push(this.roles.find(role => role.id === roleId));
        });
        const roleAuthorities = [];
        this.user.roles.forEach(value => value.authorities.forEach(value1 => roleAuthorities.push(value1)));
        const roleDenyAuthorities = [];
        this.user.roles.forEach(value => value.denyAuthorities.forEach(value1 => roleDenyAuthorities.push(value1)));

        this.roleAuthorities = roleAuthorities;
        this.roleDenyAuthorities = roleDenyAuthorities;

        if (this.user.roles && this.user.roles.length) {
            const role1 = this.user.roles.find(value => !!value.roleLevelId);
            this.roleLevel = role1 ? role1.roleLevelId : undefined;
        } else {
            this.roleLevel = undefined;
        }
        this.updateRoleSelectorDate();
    }

    onChangeRole(roleId) {
        const role: Role = this.userRoles.map(value => value.role).find(value => value.id === roleId);
        this.user.roles = [];
        this.user.roles.push(role);
        this.roleAuthorities = role.authorities;
        this.roleDenyAuthorities = role.denyAuthorities;

    }

    updateRoleSelectorDate() {
        // todo
        this.roles = [];
        this.grantableRoles = [];
        if (this.isViewMultiRole) {
            if (this.userRoles) {
                this.userRoles.forEach(userRole => {
                    const label = userRole.role.name + '[' + this.translateService.instant('niopdcgatewayApp.userType.' + userRole.role.userType) + (userRole.role.roleLevelName ? ', سطح ' + userRole.role.roleLevelName : ', عمومی') + ']';
                    if (!userRole.grantable && (!this.roleLevel || !userRole.role.roleLevelId || this.roleLevel === userRole.role.roleLevelId)) {
                        userRole.role['label'] = label;
                        userRole.role['value'] = userRole.role.id;
                        this.roles.push(userRole.role);
                    }

                    if ((this.hasRoleAdmin || (userRole.grantable && this.isViewGrantableRole))) {
                        this.grantableRoles.push({
                            label,
                            value: userRole.role.id
                        });
                    }
                });
            }
        } else {
            this.roles = [];
            this.roles.push({
                label: '',
                value: null
            });

            this.userRoles.forEach(userRole => {
                if (userRole.grantable) {
                    userRole.role['label'] = userRole.role.name + '[' + this.translateService.instant('niopdcgatewayApp.userType.' + userRole.role.userType) + ']';
                    userRole.role['value'] = userRole.role.id;
                    this.roles.push(userRole.role);
                }
            });
        }

    }

    adminRoleChange() {
        if (this.adminRole) {
            this.onChangeRoles();
        } else {
            this.userTypeChange();
        }
    }

    onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'userListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result.body);
    }

    onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-user-management-popup',
    template: ''
})
export class UserManagementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userManagementPopupService: UserManagementPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];
            View.requestId = params['id'];
            View.username = params['username'];
            if (params['login']) {
                this.userManagementPopupService
                    .open(UserManagementDialogComponent as Component, params['login']);
            } else {
                this.userManagementPopupService
                    .open(UserManagementDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static isView: boolean;
    static requestId: number;
    static username: string;
}
