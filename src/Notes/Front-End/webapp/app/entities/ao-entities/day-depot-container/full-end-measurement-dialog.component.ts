import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {DayDepotContainer} from './day-depot-container.model';
import {DayDepotContainerPopupService} from './day-depot-container-popup.service';
import {DayDepotContainerService} from './day-depot-container.service';

@Component({
    selector: 'jhi-full-end-measurements',
    templateUrl: './full-end-measurement-dialog.component.html'
})
export class FullEndMeasurementDialogComponent {

    dayDepotContainer: DayDepotContainer;

    constructor(private dayDepotContainerService: DayDepotContainerService,
                public activeModal: NgbActiveModal,
                private eventManager: JhiEventManager) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmFullEndMeasurement(id: number) {
        this.dayDepotContainerService.fullEndMeasurement(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dayDepotContainerListModification',
                content: 'Closed an dayDepot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-full-end-measurement-popups',
    template: ''
})
export class FullEndMeasurementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private dayDepotContainerPopupService: DayDepotContainerPopupService) {
    }

    ngOnInit() {
        console.log('close called test');
        this.routeSub = this.route.params.subscribe(params => {
            this.dayDepotContainerPopupService
                .open(FullEndMeasurementDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
