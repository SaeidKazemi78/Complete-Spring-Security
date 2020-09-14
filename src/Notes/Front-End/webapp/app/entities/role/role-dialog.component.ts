import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {Role, UserRole} from './role.model';
import {RolePopupService} from './role-popup.service';
import {RoleService} from './role.service';
import {MainAuthority} from '../main-authority';
import {ParentAuthorityService, ParentAuthority} from '../parent-authority';
import {Principal, User} from '../../shared';
import {AccountService} from '../../shared';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {RoleLevel, RoleLevelService} from 'app/entities/role-level';

@Component({
    selector: 'jhi-role-dialog',
    templateUrl: './role-dialog.component.html'
})
export class RoleDialogComponent implements OnInit {
    parentAuthorities: ParentAuthority[];
    role: Role;
    selectedRoles: any[] = [];
    authorities1: any[];
    denyAuthorities1: any[];
    isSaving: boolean;
    isView: boolean;

    canAuth: MainAuthority[];
    currentUserType: any;
    userTypes: any[];
    roleLevels: RoleLevel[];
    roles: Role[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private roleService: RoleService,
        private roleLevelService: RoleLevelService,
        private principal: Principal,
        private parentAuthorityService: ParentAuthorityService,
        private eventManager: JhiEventManager,
        private accountService: AccountService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then(value => {
            this.userTypes = value.userTypes;
        });
        if (this.role.id) {
            this.authorities1 = this.role.authorities;
            this.denyAuthorities1 = this.role.denyAuthorities;
            this.onChangeUserType(this.role.userType);
        }
        this.isView = View.isView;
        this.isSaving = false;
        this.accountService.get().subscribe(
            (res: HttpResponse<User>) => {
                this.canAuth = res.body.authorities.map(s => new MainAuthority(s));
            });
        this.parentAuthorityService.query(
            {
                sort: ['persianName,asc']
            }
        ).subscribe(
            (res: HttpResponse<ParentAuthority[]>) => {
                this.parentAuthorities = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.accountService.get().subscribe(
            (res: HttpResponse<User>) => {
                this.currentUserType = res.body.userType;
                this.canAuth = res.body.authorities.map(s => new MainAuthority(s));
            });
        this.roleLevelService.findAll().subscribe(value => {
            this.roleLevels = value.body;
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.role.id !== undefined) {
            this.roleService.update(this.role)
                .subscribe((res: HttpResponse<Role>) =>
                    this.onSaveSuccess(res.body), (res: Response) => this.onSaveError(res));
        } else {
            this.role.roleType = 'ROLE';
            this.roleService.create(this.role)
                .subscribe((res: HttpResponse<Role>) =>
                    this.onSaveSuccess(res.body), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Role) {
        this.eventManager.broadcast({name: 'roleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    authoritiesSelected(event) {
        this.role.authorities = event;
    }

    denyAuthoritiesSelected(event) {
        this.role.denyAuthorities = event;
    }

    onChangeUserType(userType) {
        this.roleService.readListByUserTypeAndGrantable(userType, {
            sort: ['role.name,asc']
        })
            .subscribe(value => {
                this.roles = value.body.map(value1 => value1.role);
                this.roles.forEach(role => {
                    role['value'] = role.id;
                    role['label'] = role.name;
                });
                if (this.role.childRoles && this.role.childRoles.length > 0) {
                    this.selectedRoles = [];
                    this.role.childRoles.forEach(role => {
                        this.selectedRoles.push(role.id);
                    });
                }
            });
    }

    onChangeRoles(roles) {
        console.log(roles);
        this.role.childRoles = [];
        this.selectedRoles = roles;
        this.roles.forEach(role => {
            this.selectedRoles.forEach(roleId => {
                if (role.id === roleId) {
                    this.role.childRoles.push(role);
                }
            });
        });
    }

}

@Component({
    selector: 'jhi-role-popup',
    template: ''
})
export class RolePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rolePopupService: RolePopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];
            if (params['id']) {
                this.rolePopupService
                    .open(RoleDialogComponent as Component, params['id']);
            } else {
                this.rolePopupService
                    .open(RoleDialogComponent as Component);
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
