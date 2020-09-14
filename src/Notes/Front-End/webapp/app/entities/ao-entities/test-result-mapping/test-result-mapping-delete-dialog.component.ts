import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {TestResultMapping} from './test-result-mapping.model';
import {TestResultMappingPopupService} from './test-result-mapping-popup.service';
import {TestResultMappingService} from './test-result-mapping.service';

@Component({
    selector: 'jhi-test-result-mapping-delete-dialog',
    templateUrl: './test-result-mapping-delete-dialog.component.html'
})
export class TestResultMappingDeleteDialogComponent {

    testResultMapping: TestResultMapping;

    constructor(
        private testResultMappingService: TestResultMappingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testResultMappingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'testResultMappingListModification',
                content: 'Deleted an testResultMapping'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-result-mapping-delete-popup',
    template: ''
})
export class TestResultMappingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testResultMappingPopupService: TestResultMappingPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.testResultMappingPopupService
                .open(TestResultMappingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
