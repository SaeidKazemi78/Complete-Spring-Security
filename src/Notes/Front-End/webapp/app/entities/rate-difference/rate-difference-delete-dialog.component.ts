import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JhiAlertService} from 'ng-jhipster';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {RateDifference} from './rate-difference.model';
import {RateDifferencePopupService} from './rate-difference-popup.service';
import {RateDifferenceService} from './rate-difference.service';

@Component({
    selector: 'jhi-rate-difference-delete-dialog',
    templateUrl: './rate-difference-delete-dialog.component.html'
})
export class RateDifferenceDeleteDialogComponent {

    rateDifference: RateDifference;

    constructor(
        private rateDifferenceService: RateDifferenceService,
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rateDifferenceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rateDifferenceListModification',
                content: 'Deleted an rateDifference'
            });
            this.activeModal.dismiss(true);
        },error => this.onError(error.error));
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-rate-difference-delete-popup',
    template: ''
})
export class RateDifferenceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rateDifferencePopupService: RateDifferencePopupService
    ) {
    }

    ngOnInit() {

        this.routeSub = this.route.params.subscribe(params => {
            this.rateDifferencePopupService
                .open(RateDifferenceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
