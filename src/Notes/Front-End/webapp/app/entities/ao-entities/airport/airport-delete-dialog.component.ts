import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Airport} from './airport.model';
import {AirportPopupService} from './airport-popup.service';
import {AirportService} from './airport.service';

@Component({
    selector: 'jhi-airport-delete-dialog',
    templateUrl: './airport-delete-dialog.component.html'
})
export class AirportDeleteDialogComponent {

    airport: Airport;

    constructor(
        private airportService: AirportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.airportService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'airportListModification',
                content: 'Deleted an airport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-airport-delete-popup',
    template: ''
})
export class AirportDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private airportPopupService: AirportPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.airportPopupService
                .open(AirportDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
