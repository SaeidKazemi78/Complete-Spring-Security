import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {DayDepot} from './day-depot.model';
import {DayDepotPopupService} from './day-depot-popup.service';
import {DayDepotService} from './day-depot.service';

@Component({
    selector: 'jhi-day-depot-delete-dialog',
    templateUrl: './day-depot-delete-dialog.component.html'
})
export class DayDepotDeleteDialogComponent {

    dayDepot: DayDepot;

    constructor(
        private dayDepotService: DayDepotService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dayDepotService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dayDepotListModification',
                content: 'Deleted an dayDepot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-day-depot-delete-popup',
    template: ''
})
export class DayDepotDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dayDepotPopupService: DayDepotPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.dayDepotPopupService
                .open(DayDepotDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
