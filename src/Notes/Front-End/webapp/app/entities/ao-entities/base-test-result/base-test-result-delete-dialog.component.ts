import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {BaseTestResult} from './base-test-result.model';
import {BaseTestResultPopupService} from './base-test-result-popup.service';
import {BaseTestResultService} from './base-test-result.service';

@Component({
    selector: 'jhi-base-test-result-delete-dialog',
    templateUrl: './base-test-result-delete-dialog.component.html'
})
export class BaseTestResultDeleteDialogComponent {

    baseTestResult: BaseTestResult;

    constructor(
        private baseTestResultService: BaseTestResultService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.baseTestResultService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'baseTestResultListModification',
                content: 'Deleted an baseTestResult'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-base-test-result-delete-popup',
    template: ''
})
export class BaseTestResultDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private baseTestResultPopupService: BaseTestResultPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.baseTestResultPopupService
                .open(BaseTestResultDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
