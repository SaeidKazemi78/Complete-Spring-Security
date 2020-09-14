import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {MainDayDepot} from './main-day-depot.model';
import {MainDayDepotService} from './main-day-depot.service';
import {MainDayDepotPopupService} from './main-day-depot-popup.service';

@Component({
    selector: 'jhi-main-day-depot-contaminate-dialog',
    templateUrl: './main-day-depot-contaminate-dialog.component.html'
})
export class MainDayDepotContaminateDialogComponent {

    mainDayDepot: MainDayDepot;

    constructor(private mainDayDepotService: MainDayDepotService,
                public activeModal: NgbActiveModal,
                private eventManager: JhiEventManager) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmContaminate(id: number) {
        this.mainDayDepotService.contaminate(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mainDayDepotListModification',
                content: 'Contaminated an mainDayDepot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-main-day-depot-contaminate-popup',
    template: ''
})
export class MainDayDepotContaminatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private mainDayDepotPopupService: MainDayDepotPopupService) {
    }

    ngOnInit() {
        console.log('contaminate called test');
        this.routeSub = this.route.params.subscribe(params => {
            this.mainDayDepotPopupService
                .open(MainDayDepotContaminateDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
