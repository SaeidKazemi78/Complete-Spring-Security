import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiDataUtils, JhiEventManager} from 'ng-jhipster';

import {Version} from './version.model';
import {VersionPopupService} from './version-popup.service';
import {VersionService} from './version.service';
import {Principal} from 'app/shared';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-version-dialog',
    templateUrl: './version-dialog.component.html'
})
export class VersionDialogComponent implements OnInit {

    version: Version;
    currentUser: any;
    isSaving: boolean;
    isView: boolean;
    text: any;

    constructor(public activeModal: NgbActiveModal,
                private dataUtils: JhiDataUtils,
                private jhiAlertService: JhiAlertService,
                private versionService: VersionService,
                private principal: Principal,
                private eventManager: JhiEventManager,
                private translateService: TranslateService) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;

        this.principal.identity().then(value => {
            this.currentUser = value;
        });

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.version.id !== undefined) {
            this.subscribeToSaveResponse(
                this.versionService.update(this.version));
        } else {
            this.subscribeToSaveResponse(
                this.versionService.create(this.version));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Version>>) {
        result.subscribe((res: HttpResponse<Version>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Version) {
        this.eventManager.broadcast({name: 'versionListModification', content: 'OK'});
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
    selector: 'jhi-version-popup',
    template: ''
})
export class VersionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private versionPopupService: VersionPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.versionPopupService
                    .open(VersionDialogComponent as Component, params['id']);
            } else {
                this.versionPopupService
                    .open(VersionDialogComponent as Component);
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
