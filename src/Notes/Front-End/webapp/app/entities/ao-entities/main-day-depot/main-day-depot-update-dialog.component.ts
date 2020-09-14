import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {MainDayDepot} from './main-day-depot.model';
import {MainDayDepotPopupService} from './main-day-depot-popup.service';
import {MainDayDepotService} from './main-day-depot.service';

@Component({
    selector: 'jhi-main-day-depot-update-dialog',
    templateUrl: './main-day-depot-update-dialog.component.html'
})
export class MainDayDepotUpdateDialogComponent {

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

    confirmUpdate(id: number) {
        this.mainDayDepotService.checkForUpdate(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mainDayDepotListModification',
                content: 'updated an mainDayDepot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-main-day-depot-update-popup',
    template: ''
})
export class MainDayDepotUpdatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mainDayDepotPopupService: MainDayDepotPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.mainDayDepotPopupService
                .open(MainDayDepotUpdateDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
