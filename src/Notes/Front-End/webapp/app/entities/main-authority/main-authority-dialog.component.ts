import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {MainAuthority} from './main-authority.model';
import {MainAuthorityPopupService} from './main-authority-popup.service';
import {MainAuthorityService} from './main-authority.service';
import {HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-main-authority-dialog',
    templateUrl: './main-authority-dialog.component.html'
})
export class MainAuthorityDialogComponent implements OnInit {

    mainAuthority: MainAuthority;
    isSaving: boolean;
    isView: boolean;

    constructor(public activeModal: NgbActiveModal,
                private alertService: JhiAlertService,
                private mainAuthorityService: MainAuthorityService,
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
        if (this.mainAuthority.name !== undefined) {
            this.mainAuthorityService.update(this.mainAuthority)
                .subscribe((res: HttpResponse<MainAuthority>) =>
                    this.onSaveSuccess(res.body), (res: Response) => this.onSaveError(res));
        } else {
            this.mainAuthorityService.create(this.mainAuthority)
                .subscribe((res: HttpResponse<MainAuthority>) =>
                    this.onSaveSuccess(res.body), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: MainAuthority) {
        this.eventManager.broadcast({name: 'mainAuthorityListModification', content: 'OK'});
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
    selector: 'jhi-main-authority-popup',
    template: ''
})
export class MainAuthorityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private mainAuthorityPopupService: MainAuthorityPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.mainAuthorityPopupService
                    .open(MainAuthorityDialogComponent as Component, params['id']);
            } else {
                this.mainAuthorityPopupService
                    .open(MainAuthorityDialogComponent as Component, null, params['parentAuthorityId']);
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
