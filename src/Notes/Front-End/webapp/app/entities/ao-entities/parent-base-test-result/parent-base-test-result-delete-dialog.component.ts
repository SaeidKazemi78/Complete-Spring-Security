import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {ParentBaseTestResult} from './parent-base-test-result.model';
import {ParentBaseTestResultPopupService} from './parent-base-test-result-popup.service';
import {ParentBaseTestResultService} from './parent-base-test-result.service';

@Component({
    selector: 'jhi-parent-base-test-result-delete-dialog',
    templateUrl: './parent-base-test-result-delete-dialog.component.html'
})
export class ParentBaseTestResultDeleteDialogComponent {

    parentBaseTestResult: ParentBaseTestResult;

    constructor(
        private parentBaseTestResultService: ParentBaseTestResultService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.parentBaseTestResultService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'parentBaseTestResultListModification',
                content: 'Deleted an parentBaseTestResult'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-parent-base-test-result-delete-popup',
    template: ''
})
export class ParentBaseTestResultDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private parentBaseTestResultPopupService: ParentBaseTestResultPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.parentBaseTestResultPopupService
                .open(ParentBaseTestResultDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
