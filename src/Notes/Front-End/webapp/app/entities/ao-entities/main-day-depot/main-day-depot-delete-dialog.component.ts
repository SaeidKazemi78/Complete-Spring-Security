import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {MainDayDepot} from './main-day-depot.model';
import {MainDayDepotPopupService} from './main-day-depot-popup.service';
import {MainDayDepotService} from './main-day-depot.service';

@Component({
    selector: 'jhi-main-day-depot-delete-dialog',
    templateUrl: './main-day-depot-delete-dialog.component.html'
})
export class MainDayDepotDeleteDialogComponent {

    mainDayDepot: MainDayDepot;

    constructor(
        private mainDayDepotService: MainDayDepotService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mainDayDepotService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mainDayDepotListModification',
                content: 'Deleted an mainDayDepot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-main-day-depot-delete-popup',
    template: ''
})
export class MainDayDepotDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mainDayDepotPopupService: MainDayDepotPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.mainDayDepotPopupService
                .open(MainDayDepotDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
