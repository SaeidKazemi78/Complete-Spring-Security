import {Component,  OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiDataUtils} from 'ng-jhipster';

import {Version} from './version.model';
import {VersionPopupService} from './version-popup.service';
import {VersionService} from './version.service';
import {Principal} from 'app/shared';

@Component({
    selector: 'jhi-version-show-dialog',
    templateUrl: './version-show-dialog.component.html'
})
export class VersionShowDialogComponent implements OnInit {

    versions: Version[];
    currentUser: any;
    isSaving: boolean;
    text: any;

    constructor(public activeModal: NgbActiveModal,
                private dataUtils: JhiDataUtils,
                private jhiAlertService: JhiAlertService,
                private versionService: VersionService,
                private principal: Principal) {
    }

    ngOnInit() {
        this.principal.identity().then(value => {
            this.currentUser = value;
        });
        this.load3last();
    }

    load3last() {
        this.versionService.getTop3().subscribe(
            (res: HttpResponse<Version[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    close() {
        this.activeModal.dismiss('cancel');

    }

    private onSuccess(data, headers) {

        // this.page = pagingParams.page;
        this.versions = data;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

}

@Component({
    selector: 'jhi-version-show-popup',
    template: ''
})
export class VersionShowPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private versionPopupService: VersionPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.versionPopupService
                .open(VersionShowDialogComponent as Component);

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

}

