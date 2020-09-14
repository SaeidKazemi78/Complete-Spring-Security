import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RateGroup } from './rate-group.model';
import { RateGroupPopupService } from './rate-group-popup.service';
import { RateGroupService } from './rate-group.service';

@Component({
    selector: 'jhi-rate-group-delete-dialog',
    templateUrl: './rate-group-delete-dialog.component.html'
})
export class RateGroupDeleteDialogComponent {

    rateGroup: RateGroup;

    constructor(
        private rateGroupService: RateGroupService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rateGroupService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rateGroupListModification',
                content: 'Deleted an rateGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rate-group-delete-popup',
    template: ''
})
export class RateGroupDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rateGroupPopupService: RateGroupPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.rateGroupPopupService
                .open(RateGroupDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
