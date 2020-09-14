import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Depot } from './depot.model';
import { DepotPopupService } from './depot-popup.service';
import { DepotService } from './depot.service';

@Component({
    selector: 'jhi-depot-delete-dialog',
    templateUrl: './depot-delete-dialog.component.html'
})
export class DepotDeleteDialogComponent {

    depot: Depot;

    constructor(
        private depotService: DepotService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.depotService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'depotListModification',
                content: 'Deleted an depot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-depot-delete-popup',
    template: ''
})
export class DepotDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private depotPopupService: DepotPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.depotPopupService
                .open(DepotDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
