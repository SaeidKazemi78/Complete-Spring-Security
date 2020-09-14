import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReservoirCapacity } from './reservoir-capacity.model';
import { ReservoirCapacityPopupService } from './reservoir-capacity-popup.service';
import { ReservoirCapacityService } from './reservoir-capacity.service';

@Component({
    selector: 'jhi-reservoir-capacity-delete-dialog',
    templateUrl: './reservoir-capacity-delete-dialog.component.html'
})
export class ReservoirCapacityDeleteDialogComponent {

    reservoirCapacity: ReservoirCapacity;

    constructor(
        private reservoirCapacityService: ReservoirCapacityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reservoirCapacityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'reservoirCapacityListModification',
                content: 'Deleted an reservoirCapacity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-reservoir-capacity-delete-popup',
    template: ''
})
export class ReservoirCapacityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reservoirCapacityPopupService: ReservoirCapacityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.reservoirCapacityPopupService
                .open(ReservoirCapacityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
