import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {DayDepotContainer} from './day-depot-container.model';
import {DayDepotContainerPopupService} from './day-depot-container-popup.service';
import {DayDepotContainerService} from './day-depot-container.service';

@Component({
    selector: 'jhi-day-depot-container-delete-dialog',
    templateUrl: './day-depot-container-delete-dialog.component.html'
})
export class DayDepotContainerDeleteDialogComponent {

    dayDepotContainer: DayDepotContainer;

    constructor(
        private dayDepotContainerService: DayDepotContainerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dayDepotContainerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dayDepotContainerListModification',
                content: 'Deleted an dayDepotContainer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-day-depot-container-delete-popup',
    template: ''
})
export class DayDepotContainerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dayDepotContainerPopupService: DayDepotContainerPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.dayDepotContainerPopupService
                .open(DayDepotContainerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
