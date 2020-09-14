import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {MainDayDepot} from './main-day-depot.model';
import {MainDayDepotService} from './main-day-depot.service';
import {MainDayDepotPopupService} from './main-day-depot-popup.service';

@Component({
    selector: 'jhi-main-day-depot-close-dialog',
    templateUrl: './main-day-depot-close-dialog.component.html'
})
export class MainDayDepotCloseDialogComponent {

    mainDayDepot: MainDayDepot;

    constructor(private mainDayDepotService: MainDayDepotService,
                public activeModal: NgbActiveModal,
                private eventManager: JhiEventManager) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmClose(id: number) {
        this.mainDayDepotService.close(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mainDayDepotListModification',
                content: 'Closed an mainDayDepot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-main-day-depot-close-popup',
    template: ''
})
export class MainDayDepotClosePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private mainDayDepotPopupService: MainDayDepotPopupService) {
    }

    ngOnInit() {
        console.log('close called test');
        this.routeSub = this.route.params.subscribe(params => {
            this.mainDayDepotPopupService
                .open(MainDayDepotCloseDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
