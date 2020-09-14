import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {RequestTestResult} from './request-test-result.model';
import {RequestTestResultPopupService} from './request-test-result-popup.service';
import {RequestTestResultService} from './request-test-result.service';

@Component({
    selector: 'jhi-request-test-result-send-dialog',
    templateUrl: './request-test-result-send-dialog.component.html'
})
export class RequestTestResultSendDialogComponent {

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

    confirmSend(id: number) {
        this.requestTestResultService.send(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'requestTestResultListModification',
                content: 'Sendd an requestTestResult'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-request-test-result-send-popup',
    template: ''
})
export class RequestTestResultSendPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private requestTestResultPopupService: RequestTestResultPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.requestTestResultPopupService
                .open(RequestTestResultSendDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
