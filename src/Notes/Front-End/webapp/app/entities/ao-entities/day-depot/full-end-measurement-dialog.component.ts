import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {DayDepot, DayDepotPopupService, DayDepotService} from './index';

@Component({
    selector: 'jhi-full-end-measurement',
    templateUrl: './full-end-measurement-dialog.component.html'
})
export class FullEndMeasurementDialogComponent {

    dayDepot: DayDepot;

    constructor(private dayDepotService: DayDepotService,
                public activeModal: NgbActiveModal,
                private eventManager: JhiEventManager) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmFullEndMeasurement(id: number) {
        console.log(id);
        console.log(this.dayDepot);
        this.dayDepotService.fullEndMeasurement(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dayDepotListModification',
                content: 'Closed an dayDepot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-full-end-measurement-popup',
    template: ''
})
export class FullEndMeasurementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private dayDepotPopupService: DayDepotPopupService) {
    }

    ngOnInit() {
        console.log('close called test');
        this.routeSub = this.route.params.subscribe(params => {
            this.dayDepotPopupService
                .open(FullEndMeasurementDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
