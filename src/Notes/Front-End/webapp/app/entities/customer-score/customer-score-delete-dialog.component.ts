import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerScore } from './customer-score.model';
import { CustomerScorePopupService } from './customer-score-popup.service';
import { CustomerScoreService } from './customer-score.service';

@Component({
    selector: 'jhi-customer-score-delete-dialog',
    templateUrl: './customer-score-delete-dialog.component.html'
})
export class CustomerScoreDeleteDialogComponent {

    customerScore: CustomerScore;

    constructor(
        private customerScoreService: CustomerScoreService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerScoreService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'customerScoreListModification',
                content: 'Deleted an customerScore'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-score-delete-popup',
    template: ''
})
export class CustomerScoreDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerScorePopupService: CustomerScorePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.customerScorePopupService
                .open(CustomerScoreDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
