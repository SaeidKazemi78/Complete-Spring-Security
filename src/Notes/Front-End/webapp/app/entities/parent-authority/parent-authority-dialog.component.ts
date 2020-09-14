import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {ParentAuthority} from './parent-authority.model';
import {ParentAuthorityPopupService} from './parent-authority-popup.service';
import {ParentAuthorityService} from './parent-authority.service';
import {HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-parent-authority-dialog',
    templateUrl: './parent-authority-dialog.component.html'
})
export class ParentAuthorityDialogComponent implements OnInit {

    parentAuthority: ParentAuthority;
    isSaving: boolean;
    isView: boolean;

    constructor(public activeModal: NgbActiveModal,
                private alertService: JhiAlertService,
                private parentAuthorityService: ParentAuthorityService,
                private eventManager: JhiEventManager) {
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
        if (this.parentAuthority.name !== undefined) {
            this.parentAuthorityService.update(this.parentAuthority)
                .subscribe((res: HttpResponse<ParentAuthority>) =>
                    this.onSaveSuccess(res.body), (res: Response) => this.onSaveError(res));
        } else {
            this.parentAuthorityService.create(this.parentAuthority)
                .subscribe((res: HttpResponse<ParentAuthority>) =>
                    this.onSaveSuccess(res.body), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: ParentAuthority) {
        this.eventManager.broadcast({name: 'parentAuthorityListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-parent-authority-popup',
    template: ''
})
export class ParentAuthorityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private parentAuthorityPopupService: ParentAuthorityPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.parentAuthorityPopupService
                    .open(ParentAuthorityDialogComponent as Component, params['id']);
            } else {
                this.parentAuthorityPopupService
                    .open(ParentAuthorityDialogComponent as Component);
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
