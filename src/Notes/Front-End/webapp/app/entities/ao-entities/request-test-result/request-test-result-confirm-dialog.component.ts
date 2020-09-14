import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {RequestTestResult} from './request-test-result.model';
import {RequestTestResultPopupService} from './request-test-result-popup.service';
import {RequestTestResultService} from './request-test-result.service';

@Component({
    selector: 'jhi-request-test-result-confirm-dialog',
    templateUrl: './request-test-result-confirm-dialog.component.html'
})
export class RequestTestResultConfirmDialogComponent {

    requestTestResult: RequestTestResult;

    constructor(
        private requestTestResultService: RequestTestResultService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmConfirm(id: number) {
        this.requestTestResultService.confirm(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'requestTestResultListModification',
                content: 'Confirmd an requestTestResult'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-request-test-result-confirm-popup',
    template: ''
})
export class RequestTestResultConfirmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private requestTestResultPopupService: RequestTestResultPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.requestTestResultPopupService
                .open(RequestTestResultConfirmDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
