import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {TestResult} from './test-result.model';
import {TestResultPopupService} from './test-result-popup.service';
import {TestResultService} from './test-result.service';

@Component({
    selector: 'jhi-test-result-delete-dialog',
    templateUrl: './test-result-delete-dialog.component.html'
})
export class TestResultDeleteDialogComponent {

    testResult: TestResult;

    constructor(
        private testResultService: TestResultService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testResultService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'testResultListModification',
                content: 'Deleted an testResult'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-result-delete-popup',
    template: ''
})
export class TestResultDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testResultPopupService: TestResultPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.testResultPopupService
                .open(TestResultDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
