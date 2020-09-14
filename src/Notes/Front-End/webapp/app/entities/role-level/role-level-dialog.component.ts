import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RoleLevel } from './role-level.model';
import { RoleLevelPopupService } from './role-level-popup.service';
import { RoleLevelService } from './role-level.service';

@Component({
    selector: 'jhi-role-level-dialog',
    templateUrl: './role-level-dialog.component.html'
})
export class RoleLevelDialogComponent implements OnInit {

    roleLevel: RoleLevel;
    isSaving: boolean;
    isView: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private roleLevelService: RoleLevelService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.roleLevel.id !== undefined) {
            this.subscribeToSaveResponse(
                this.roleLevelService.update(this.roleLevel));
        } else {
            this.subscribeToSaveResponse(
                this.roleLevelService.create(this.roleLevel));
        }
    }

private subscribeToSaveResponse(result: Observable<HttpResponse<RoleLevel>>) {
        result.subscribe((res: HttpResponse<RoleLevel>) =>
        this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

private onSaveSuccess(result: RoleLevel) {
        this.eventManager.broadcast({ name: 'roleLevelListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

private onSaveError() {
        this.isSaving = false;
    }

private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-role-level-popup',
    template: ''
})
export class RoleLevelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roleLevelPopupService: RoleLevelPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.roleLevelPopupService
                    .open(RoleLevelDialogComponent as Component, params['id']);
            } else {
                this.roleLevelPopupService
                    .open(RoleLevelDialogComponent as Component);
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
